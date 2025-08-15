import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Link as MuiLink,
  Divider,
  Alert
} from "@mui/material";
import { 
  Email, 
  Lock, 
  Visibility, 
  VisibilityOff,
  Google,
  Facebook
} from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Kiểm tra form
    if (!formData.email || !formData.password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Email không hợp lệ");
      return;
    }

    // Mock login - trong thực tế sẽ gọi API
    console.log("Login attempt:", formData);
    
    // Giả lập đăng nhập thành công
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", formData.email);
    
    // Chuyển hướng về trang chủ
    navigate("/");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(""); // Xóa lỗi khi user gõ
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Đăng nhập với ${provider}`);
    // TODO: Implement social login
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Đăng Nhập
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Chào mừng bạn quay trở lại! Vui lòng đăng nhập để tiếp tục.
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Nhập email của bạn"
            InputProps={{
              startAdornment: <Email sx={{ mr: 1, color: "text.secondary" }} />
            }}
            sx={{ mb: 3 }}
            required
          />

          <TextField
            fullWidth
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="Nhập mật khẩu của bạn"
            InputProps={{
              startAdornment: <Lock sx={{ mr: 1, color: "text.secondary" }} />,
              endAdornment: (
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ minWidth: "auto", p: 0.5 }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </Button>
              )
            }}
            sx={{ mb: 3 }}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mb: 3, py: 1.5 }}
          >
            Đăng Nhập
          </Button>
        </Box>

        {/* Forgot Password */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <MuiLink
            component={Link}
            to="/forgot-password"
            variant="body2"
            underline="hover"
            sx={{ cursor: "pointer" }}
          >
            Quên mật khẩu?
          </MuiLink>
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            hoặc
          </Typography>
        </Divider>

        {/* Social Login */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={() => handleSocialLogin("Google")}
            sx={{ py: 1.5 }}
          >
            Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Facebook />}
            onClick={() => handleSocialLogin("Facebook")}
            sx={{ py: 1.5 }}
          >
            Facebook
          </Button>
        </Box>

        {/* Sign Up Link */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Chưa có tài khoản?{" "}
            <MuiLink
              component={Link}
              to="/register"
              variant="body2"
              underline="hover"
              sx={{ cursor: "pointer", fontWeight: "bold" }}
            >
              Đăng ký ngay
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
