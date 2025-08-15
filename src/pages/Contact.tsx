import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { 
  Phone, 
  Email, 
  LocationOn, 
  AccessTime,
  Send,
  Facebook,
  Twitter,
  Instagram
} from "@mui/icons-material";
import { useState } from "react";

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.");
    setContactForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Liên Hệ Với Chúng Tôi
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
          Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn. 
          Hãy liên hệ với chúng tôi để được tư vấn tốt nhất.
        </Typography>
      </Box>

      <Grid container spacing={6}>
        {/* Contact Form */}
        <Grid size={{xs:12,  md:7}}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              Gửi tin nhắn cho chúng tôi
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{xs:12,  sm:4}}>
                  <TextField
                    fullWidth
                    label="Họ và tên *"
                    value={contactForm.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </Grid>
                <Grid size={{xs:12,  sm:4}}>
                  <TextField
                    fullWidth
                    label="Email *"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </Grid>
                <Grid size={{xs:12}}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    value={contactForm.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </Grid>
                <Grid size={{xs:12}}>
                  <TextField
                    fullWidth
                    label="Tiêu đề *"
                    value={contactForm.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    required
                  />
                </Grid>
                <Grid size={{xs:12}}>
                  <TextField
                    fullWidth
                    label="Nội dung tin nhắn *"
                    multiline
                    rows={6}
                    value={contactForm.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                  />
                </Grid>
                <Grid size={{xs:12}}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<Send />}
                    sx={{ px: 4, py: 1.5 }}
                  >
                    Gửi tin nhắn
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Contact Information */}
        <Grid size={{xs:12,  md:5}}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Main Office */}
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Văn phòng chính
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Địa chỉ"
                      secondary="123 Đường ABC, Quận 1, TP.HCM, Việt Nam"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Điện thoại"
                      secondary="+84 123 456 789"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Email color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary="info@travelstay.vn"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AccessTime color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Giờ làm việc"
                      secondary="Thứ 2 - Thứ 6: 8:00 - 18:00"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Support */}
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Hỗ trợ khách hàng
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <Phone color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Hotline đặt phòng"
                      secondary="+84 987 654 321"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Email color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email hỗ trợ"
                      secondary="support@travelstay.vn"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AccessTime color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Hỗ trợ 24/7"
                      secondary="Luôn sẵn sàng phục vụ"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Kết nối với chúng tôi
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Theo dõi chúng tôi trên mạng xã hội để cập nhật những ưu đãi mới nhất
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Facebook />}
                    sx={{ flex: 1 }}
                  >
                    Facebook
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Twitter />}
                    sx={{ flex: 1 }}
                  >
                    Twitter
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Instagram />}
                    sx={{ flex: 1 }}
                  >
                    Instagram
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* Map Section */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ mb: 4 }}>
          Vị trí của chúng tôi
        </Typography>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Box
            sx={{
              height: 400,
              backgroundColor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Bản đồ Google Maps sẽ được hiển thị tại đây
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ mb: 4 }}>
          Câu hỏi thường gặp
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{xs:12,  md:6}}>
            <Card elevation={1}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Làm thế nào để đặt phòng?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bạn có thể đặt phòng trực tuyến thông qua website của chúng tôi, 
                  hoặc gọi điện thoại đến hotline để được hỗ trợ.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{xs:12,  md:6}}>
            <Card elevation={1}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Chính sách hủy phòng như thế nào?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bạn có thể hủy phòng miễn phí trước 24 giờ so với ngày check-in. 
                  Sau thời gian này sẽ áp dụng phí hủy phòng.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{xs:12,  md:6}}>
            <Card elevation={1}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Có thể thanh toán bằng cách nào?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Chúng tôi chấp nhận thanh toán bằng thẻ tín dụng, chuyển khoản ngân hàng, 
                  và các ví điện tử phổ biến.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{xs:12,  md:6}}>
            <Card elevation={1}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Có dịch vụ đưa đón sân bay không?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Có, chúng tôi cung cấp dịch vụ đưa đón sân bay cho khách hàng. 
                  Vui lòng liên hệ trước để đặt dịch vụ này.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Contact;