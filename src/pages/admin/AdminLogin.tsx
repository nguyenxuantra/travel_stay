import { useEffect, useState } from "react";
import { Box, Paper, Container, Typography, TextField, Button, Alert } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isAdmin = typeof window !== "undefined" && localStorage.getItem("isAdmin") === "true";
  useEffect(() => {
    if (isAdmin) navigate("/admin");
  }, [isAdmin, navigate]);

  if (isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // Demo: hardcode admin credential
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError("Thông tin đăng nhập không đúng");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>Đăng nhập Admin</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth sx={{ mb: 2 }} />
          <TextField label="Mật khẩu" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ mb: 2 }} />
          <Button variant="contained" type="submit" fullWidth>Đăng nhập</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminLogin;


