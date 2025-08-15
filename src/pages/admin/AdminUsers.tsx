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
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

const AdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>([
    { id: 1, name: "Quản trị viên", email: "admin@example.com", role: "admin" },
    { id: 2, name: "Nguyễn Văn A", email: "a@example.com", role: "user" },
    { id: 3, name: "Trần Thị B", email: "b@example.com", role: "user" },
    { id: 4, name: "Phạm D", email: "d@example.com", role: "user" },
    { id: 5, name: "Lê E", email: "e@example.com", role: "user" },
  ]);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<string>("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return users.filter(u => {
      const matchesQuery = `${u.name} ${u.email}`.toLowerCase().includes(q);
      const matchesRole = role === "all" ? true : u.role === role;
      return matchesQuery && matchesRole;
    });
  }, [users, query, role]);

  const displayed = useMemo(() => {
    const start = page * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>Quản lý người dùng</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Tìm theo tên hoặc email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
          />
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Vai trò</InputLabel>
            <Select label="Vai trò" value={role} onChange={(e) => { setRole(e.target.value); setPage(0); }}>
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="admin">Quản trị</MenuItem>
              <MenuItem value="user">Người dùng</MenuItem>
            </Select>
          </FormControl>
          <Button variant="text" onClick={() => { setQuery(""); setRole("all"); setPage(0); }}>Xóa lọc</Button>
        </Stack>
      </Paper>

      <Paper elevation={2}>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Vai trò</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayed.map(u => (
                <TableRow key={u.id} sx={{ "&:nth-of-type(odd)": { backgroundColor: (theme) => theme.palette.action.hover } }}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell align="center">
                    <Chip label={u.role === 'admin' ? 'Quản trị' : 'Người dùng'} color={u.role === 'admin' ? 'warning' : 'default'} size="small" />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button size="small" variant="outlined" onClick={() => setUsers(prev => prev.map(x => x.id === u.id ? { ...x, role: x.role === 'admin' ? 'user' : 'admin' } : x))}>Chuyển vai trò</Button>
                      <Button size="small" color="error" onClick={() => setUsers(prev => prev.filter(x => x.id !== u.id))}>Xóa</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {displayed.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">Không có dữ liệu</TableCell>
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

export default AdminUsers;

