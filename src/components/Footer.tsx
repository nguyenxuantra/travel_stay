import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link as MuiLink,
  IconButton,
  Divider
} from "@mui/material";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Email, 
  Phone, 
  LocationOn 
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        py: 6,
        mt: "auto"
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid size={{xs:12,  md:4}}>
            <Typography variant="h6" color="primary" gutterBottom>
              TravelStay
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Nền tảng đặt phòng khách sạn hàng đầu Việt Nam. 
              Chúng tôi cung cấp dịch vụ đặt phòng chất lượng cao 
              với giá cả hợp lý và trải nghiệm tuyệt vời.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" size="small">
                <Facebook />
              </IconButton>
              <IconButton color="primary" size="small">
                <Twitter />
              </IconButton>
              <IconButton color="primary" size="small">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{xs:12,  md:4}}>
            <Typography variant="h6" color="primary" gutterBottom>
              Liên kết nhanh
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <MuiLink href="/" color="text.secondary" underline="hover">
                Trang chủ
              </MuiLink>
              <MuiLink href="/hotels" color="text.secondary" underline="hover">
                Khách sạn
              </MuiLink>
              <MuiLink href="/about" color="text.secondary" underline="hover">
                Về chúng tôi
              </MuiLink>
              <MuiLink href="/contact" color="text.secondary" underline="hover">
                Liên hệ
              </MuiLink>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid size={{xs:12,  md:4}}>
            <Typography variant="h6" color="primary" gutterBottom>
              Thông tin liên hệ
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOn color="primary" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  123 Đường ABC, Quận 1, TP.HCM
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Phone color="primary" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  +84 123 456 789
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Email color="primary" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  info@travelstay.vn
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />
        
        {/* Copyright */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} TravelStay. Tất cả quyền được bảo lưu.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;