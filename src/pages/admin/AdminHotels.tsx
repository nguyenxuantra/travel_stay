import { useMemo, useState } from "react";
import { hotels as initialHotels } from "../../data/hotels";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from "@mui/material";

interface EditableHotel {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
}

const AdminHotels = () => {
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minRating, setMinRating] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [hotels, setHotels] = useState<EditableHotel[]>(() =>
    initialHotels.map(h => ({ id: h.id, name: h.name, location: h.location, price: h.price, rating: h.rating }))
  );
  const [editing, setEditing] = useState<EditableHotel | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const minP = minPrice ? Number(minPrice) : -Infinity;
    const maxP = maxPrice ? Number(maxPrice) : Infinity;
    return hotels.filter(h => {
      const matchesQuery = `${h.name} ${h.location}`.toLowerCase().includes(q);
      const matchesPrice = h.price >= minP && h.price <= maxP;
      const matchesRating = h.rating >= minRating;
      return matchesQuery && matchesPrice && matchesRating;
    });
  }, [query, minPrice, maxPrice, minRating, hotels]);

  const displayed = useMemo(() => {
    const start = page * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  const handleSave = () => {
    if (!editing) return;
    setHotels(prev => prev.map(h => h.id === editing.id ? editing : h));
    setEditing(null);
  };

  const resetFilters = () => {
    setQuery("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating(0);
    setPage(0);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>Quản lý khách sạn</Typography>
        <Button variant="contained" onClick={() => {
          const newHotel: EditableHotel = {
            id: Math.max(0, ...hotels.map(h => h.id)) + 1,
            name: "Khách sạn mới",
            location: "",
            price: 0,
            rating: 0
          };
          setHotels(prev => [newHotel, ...prev]);
          setEditing(newHotel);
        }}>Thêm khách sạn</Button>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }}>
          <TextField
            label="Tìm kiếm"
            placeholder="Tên hoặc địa điểm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
          />
          <TextField
            label="Giá từ"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            sx={{ minWidth: 140 }}
          />
          <TextField
            label="Giá đến"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            sx={{ minWidth: 140 }}
          />
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>Tối thiểu sao</InputLabel>
            <Select
              label="Tối thiểu sao"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
            >
              {[0,1,2,3,4,4.5].map(r => (
                <MenuItem key={r} value={r}>{r}+</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="text" onClick={resetFilters}>Xóa lọc</Button>
        </Stack>
      </Paper>

      <Paper elevation={2}>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Tên</TableCell>
                <TableCell>Địa điểm</TableCell>
                <TableCell align="right">Giá/đêm</TableCell>
                <TableCell align="center">Đánh giá</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayed.map(h => (
                <TableRow key={h.id} sx={{ "&:nth-of-type(odd)": { backgroundColor: (theme) => theme.palette.action.hover } }}>
                  <TableCell>{h.name}</TableCell>
                  <TableCell>{h.location}</TableCell>
                  <TableCell align="right">{h.price.toLocaleString('vi-VN')} VNĐ</TableCell>
                  <TableCell align="center"><Chip label={h.rating} size="small" color={h.rating >= 4.5 ? 'success' : h.rating >= 4 ? 'info' : 'default'} /></TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button size="small" variant="outlined" onClick={() => setEditing(h)}>Sửa</Button>
                      <Button size="small" color="error" onClick={() => setHotels(prev => prev.filter(x => x.id !== h.id))}>Xóa</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {displayed.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Paper>

      <Dialog open={!!editing} onClose={() => setEditing(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Chỉnh sửa khách sạn</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên"
            fullWidth
            sx={{ mt: 2 }}
            value={editing?.name ?? ""}
            onChange={(e) => setEditing(prev => prev ? { ...prev, name: e.target.value } : prev)}
          />
          <TextField
            label="Địa điểm"
            fullWidth
            sx={{ mt: 2 }}
            value={editing?.location ?? ""}
            onChange={(e) => setEditing(prev => prev ? { ...prev, location: e.target.value } : prev)}
          />
          <TextField
            label="Giá (VNĐ)"
            fullWidth
            sx={{ mt: 2 }}
            type="number"
            value={editing?.price ?? 0}
            onChange={(e) => setEditing(prev => prev ? { ...prev, price: Number(e.target.value) } : prev)}
          />
          <TextField
            label="Đánh giá"
            fullWidth
            sx={{ mt: 2, mb: 1 }}
            type="number"
            inputProps={{ step: 0.1, min: 0, max: 5 }}
            value={editing?.rating ?? 0}
            onChange={(e) => setEditing(prev => prev ? { ...prev, rating: Number(e.target.value) } : prev)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditing(null)}>Hủy</Button>
          <Button variant="contained" onClick={handleSave}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminHotels;

