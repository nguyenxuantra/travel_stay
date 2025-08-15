import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  Stack,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

interface BookingRow {
  id: number;
  user: string;
  hotel: string;
  checkIn: string;
  checkOut: string;
  total: number;
  status: "pending" | "confirmed" | "cancelled";
}

const AdminBookings = () => {
  const [rows, setRows] = useState<BookingRow[]>([
    { id: 1, user: "Nguyễn Văn A", hotel: "Grand Hotel Saigon", checkIn: "2024-09-01", checkOut: "2024-09-03", total: 5000000, status: "confirmed" },
    { id: 2, user: "Trần Thị B", hotel: "InterContinental Danang", checkIn: "2024-09-10", checkOut: "2024-09-12", total: 9000000, status: "pending" },
    { id: 3, user: "Phạm C", hotel: "Sheraton Hanoi", checkIn: "2024-09-15", checkOut: "2024-09-17", total: 5600000, status: "pending" },
    { id: 4, user: "Lê D", hotel: "Park Hyatt Saigon", checkIn: "2024-09-20", checkOut: "2024-09-23", total: 12000000, status: "confirmed" },
  ]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return rows.filter(r => {
      const matchesQuery = `${r.user} ${r.hotel}`.toLowerCase().includes(q);
      const matchesStatus = status === "all" ? true : r.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [rows, query, status]);

  const displayed = useMemo(() => {
    const start = page * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  const color = (s: BookingRow["status"]) => s === "confirmed" ? "success" : s === "pending" ? "warning" : "error";

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>Quản lý đặt phòng</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Tìm theo tên hoặc khách sạn"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
          />
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select label="Trạng thái" value={status} onChange={(e) => { setStatus(e.target.value); setPage(0); }}>
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="pending">Chờ xác nhận</MenuItem>
              <MenuItem value="confirmed">Đã xác nhận</MenuItem>
              <MenuItem value="cancelled">Đã hủy</MenuItem>
            </Select>
          </FormControl>
          <Button variant="text" onClick={() => { setQuery(""); setStatus("all"); setPage(0); }}>Xóa lọc</Button>
        </Stack>
      </Paper>

      <Paper elevation={2}>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Tên khách</TableCell>
                <TableCell>Khách sạn</TableCell>
                <TableCell>Nhận phòng</TableCell>
                <TableCell>Trả phòng</TableCell>
                <TableCell align="right">Tổng tiền</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayed.map(r => (
                <TableRow key={r.id} sx={{ "&:nth-of-type(odd)": { backgroundColor: (theme) => theme.palette.action.hover } }}>
                  <TableCell>#{r.id}</TableCell>
                  <TableCell>{r.user}</TableCell>
                  <TableCell>{r.hotel}</TableCell>
                  <TableCell>{new Date(r.checkIn).toLocaleDateString('vi-VN')}</TableCell>
                  <TableCell>{new Date(r.checkOut).toLocaleDateString('vi-VN')}</TableCell>
                  <TableCell align="right">{r.total.toLocaleString('vi-VN')} VNĐ</TableCell>
                  <TableCell align="center"><Chip label={r.status} color={color(r.status)} size="small" /></TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button size="small" variant="outlined" onClick={() => setRows(prev => prev.map(x => x.id === r.id ? { ...x, status: x.status === 'pending' ? 'confirmed' : x.status } : x))}>Xác nhận</Button>
                      <Button size="small" color="error" onClick={() => setRows(prev => prev.map(x => x.id === r.id ? { ...x, status: 'cancelled' } : x))}>Hủy</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {displayed.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">Không có dữ liệu</TableCell>
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
    </Box>
  );
};

export default AdminBookings;

