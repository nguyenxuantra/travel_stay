import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Link as MuiLink,
  Divider,
  Alert,
  Grid,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { 
  Person, 
  Email, 
  Lock, 
  Phone,
  Visibility, 
  VisibilityOff,
  Google,
  Facebook
} from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Kiểm tra form
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phone || !formData.password || !formData.confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Email không hợp lệ");
      return;
    }

    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (!acceptTerms) {
      setError("Vui lòng đồng ý với điều khoản sử dụng");
      return;
    }

    // Mock register - trong thực tế sẽ gọi API
    console.log("Register attempt:", formData);
    
    // Giả lập đăng ký thành công
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", formData.email);
    localStorage.setItem("userName", `${formData.firstName} ${formData.lastName}`);
    
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

  const handleSocialRegister = (provider: string) => {
    console.log(`Đăng ký với ${provider}`);
    // TODO: Implement social register
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Đăng Ký Tài Khoản
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Tạo tài khoản mới để trải nghiệm dịch vụ đặt phòng tốt nhất
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Register Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid  size={{xs:12,  sm:6}}>
              <TextField
                fullWidth
                label="Họ"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Nhập họ của bạn"
                InputProps={{
                  startAdornment: <Person sx={{ mr: 1, color: "text.secondary" }} />
                }}
                required
              />
            </Grid>
            <Grid size={{xs:12,  sm:6}}>
              <TextField
                fullWidth
                label="Tên"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Nhập tên của bạn"
                InputProps={{
                  startAdornment: <Person sx={{ mr: 1, color: "text.secondary" }} />
                }}
                required
              />
            </Grid>
          </Grid>

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
            sx={{ mt: 2 }}
            required
          />

          <TextField
            fullWidth
            label="Số điện thoại"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="Nhập số điện thoại"
            InputProps={{
              startAdornment: <Phone sx={{ mr: 1, color: "text.secondary" }} />
            }}
            sx={{ mt: 2 }}
            required
          />

          <TextField
            fullWidth
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="Tạo mật khẩu mới"
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
            sx={{ mt: 2 }}
            required
          />

          <TextField
            fullWidth
            label="Xác nhận mật khẩu"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            placeholder="Nhập lại mật khẩu"
            InputProps={{
              startAdornment: <Lock sx={{ mr: 1, color: "text.secondary" }} />,
              endAdornment: (
                <Button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  sx={{ minWidth: "auto", p: 0.5 }}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </Button>
              )
            }}
            sx={{ mt: 2 }}
            required
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                Tôi đồng ý với{" "}
                <MuiLink href="/terms" underline="hover">
                  điều khoản sử dụng
                </MuiLink>{" "}
                và{" "}
                <MuiLink href="/privacy" underline="hover">
                  chính sách bảo mật
                </MuiLink>
              </Typography>
            }
            sx={{ mt: 2, mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mb: 3, py: 1.5 }}
          >
            Đăng Ký
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            hoặc
          </Typography>
        </Divider>

        {/* Social Register */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={() => handleSocialRegister("Google")}
            sx={{ py: 1.5 }}
          >
            Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Facebook />}
            onClick={() => handleSocialRegister("Facebook")}
            sx={{ py: 1.5 }}
          >
            Facebook
          </Button>
        </Box>

        {/* Login Link */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Đã có tài khoản?{" "}
            <MuiLink
              component={Link}
              to="/login"
              variant="body2"
              underline="hover"
              sx={{ cursor: "pointer", fontWeight: "bold" }}
            >
              Đăng nhập ngay
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
