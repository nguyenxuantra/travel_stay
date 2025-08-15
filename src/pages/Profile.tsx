import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { 
  Email, 
  Phone, 
  LocationOn,
  Edit,
  CalendarToday,
  Payment,
  Star
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
}

interface Booking {
  id: number;
  hotelName: string;
  hotelImage: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled";
  rating?: number;
}

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [_, setIsEditing] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "Nguyễn",
    lastName: "Văn A",
    email: "nguyenvana@email.com",
    phone: "+84 123 456 789",
    address: "123 Đường ABC, Quận 1, TP.HCM"
  });
  const [tempProfile, setTempProfile] = useState<UserProfile>(userProfile);
  const navigate = useNavigate();

  // Mock data cho lịch sử đặt phòng
  const [bookings] = useState<Booking[]>([
    {
      id: 1,
      hotelName: "Grand Hotel Saigon",
      hotelImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=150&fit=crop",
      checkIn: "2024-01-15",
      checkOut: "2024-01-18",
      totalPrice: 7500000,
      status: "confirmed",
      rating: 5
    },
    {
      id: 2,
      hotelName: "Mariott Resort Nha Trang",
      hotelImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200&h=150&fit=crop",
      checkIn: "2024-02-20",
      checkOut: "2024-02-25",
      totalPrice: 16000000,
      status: "confirmed",
      rating: 4
    },
    {
      id: 3,
      hotelName: "InterContinental Danang",
      hotelImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&h=150&fit=crop",
      checkIn: "2024-03-10",
      checkOut: "2024-03-12",
      totalPrice: 9000000,
      status: "pending"
    }
  ]);

  useEffect(() => {
    // Kiểm tra đăng nhập
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Lấy thông tin user từ localStorage
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    
    if (userEmail && userName) {
      const [firstName, lastName] = userName.split(" ");
      setUserProfile(prev => ({
        ...prev,
        email: userEmail,
        firstName: firstName || prev.firstName,
        lastName: lastName || prev.lastName
      }));
    }
  }, [navigate]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEditProfile = () => {
    setTempProfile(userProfile);
    setEditDialog(true);
  };

  const handleSaveProfile = () => {
    setUserProfile(tempProfile);
    setEditDialog(false);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setTempProfile(userProfile);
    setEditDialog(false);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "success";
      case "pending": return "warning";
      case "cancelled": return "error";
      default: return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed": return "Đã xác nhận";
      case "pending": return "Chờ xác nhận";
      case "cancelled": return "Đã hủy";
      default: return status;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Profile Header */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{xs:12, md:3}} sx={{ textAlign: "center" }}>
              <Avatar
                sx={{ 
                  width: 120, 
                  height: 120, 
                  mx: "auto", 
                  mb: 2,
                  fontSize: "3rem"
                }}
              >
                {userProfile.firstName.charAt(0)}{userProfile.lastName.charAt(0)}
              </Avatar>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={handleEditProfile}
                sx={{ mb: 2 }}
              >
                Chỉnh sửa
              </Button>
            </Grid>
            
            <Grid size={{xs:12, md:9}}>
              <Typography variant="h4" gutterBottom>
                {userProfile.firstName} {userProfile.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Thành viên TravelStay
              </Typography>
              
              <Grid container spacing={2}>
                <Grid size={{xs:12, sm:6}}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Email sx={{ mr: 1, color: "text.secondary" }} />
                    <Typography>{userProfile.email}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Phone sx={{ mr: 1, color: "text.secondary" }} />
                    <Typography>{userProfile.phone}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LocationOn sx={{ mr: 1, color: "text.secondary" }} />
                    <Typography>{userProfile.address}</Typography>
                  </Box>
                </Grid>
                
                <Grid size={{xs:12, sm:6}}>
                  <Box sx={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card elevation={2}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Thông tin cá nhân" />
          <Tab label="Lịch sử đặt phòng" />
          <Tab label="Đánh giá" />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {/* Tab 1: Thông tin cá nhân */}
          {activeTab === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Thông tin chi tiết
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{xs:12, sm:6}}>
                  <TextField
                    fullWidth
                    label="Họ"
                    value={userProfile.firstName}
                    disabled
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <TextField
                    fullWidth
                    label="Tên"
                    value={userProfile.lastName}
                    disabled
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid size={{xs:12}}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={userProfile.email}
                    disabled
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid size={{xs:12}}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    value={userProfile.phone}
                    disabled
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid size={{xs:12}}>
                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    value={userProfile.address}
                    disabled
                    multiline
                    rows={2}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Tab 2: Lịch sử đặt phòng */}
          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Lịch sử đặt phòng ({bookings.length})
              </Typography>
              <List>
                {bookings.map((booking, index) => (
                  <Box key={booking.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar
                          variant="rounded"
                          src={booking.hotelImage}
                          sx={{ width: 80, height: 60 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={booking.hotelName}
                        secondary={
                          <Box>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                              <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                              <Typography variant="body2">
                                {new Date(booking.checkIn).toLocaleDateString('vi-VN')} - {new Date(booking.checkOut).toLocaleDateString('vi-VN')}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                              <Payment fontSize="small" sx={{ mr: 1 }} />
                              <Typography variant="body2" fontWeight="bold">
                                {booking.totalPrice.toLocaleString('vi-VN')} VNĐ
                              </Typography>
                            </Box>
                            <Chip
                              label={getStatusLabel(booking.status)}
                              color={getStatusColor(booking.status) as any}
                              size="small"
                            />
                          </Box>
                        }
                      />
                      <Box sx={{ textAlign: "right" }}>
                        {booking.rating && (
                          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <Star sx={{ color: "gold", mr: 0.5 }} />
                            <Typography variant="body2">{booking.rating}/5</Typography>
                          </Box>
                        )}
                        <Button variant="outlined" size="small">
                          Chi tiết
                        </Button>
                      </Box>
                    </ListItem>
                    {index < bookings.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Box>
          )}

          {/* Tab 3: Đánh giá */}
          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Đánh giá của bạn
              </Typography>
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  Bạn chưa có đánh giá nào. Hãy đặt phòng và trải nghiệm để đánh giá khách sạn!
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => navigate("/hotels")}
                >
                  Đặt phòng ngay
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Card>

      {/* Edit Profile Dialog */}
      <Dialog open={editDialog} onClose={handleCancelEdit} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6">Chỉnh sửa thông tin cá nhân</Typography>
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{xs:12, sm:6}}>
              <TextField
                fullWidth
                label="Họ"
                value={tempProfile.firstName}
                onChange={(e) => setTempProfile({...tempProfile, firstName: e.target.value})}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{xs:12, sm:6}}>
              <TextField
                fullWidth
                label="Tên"
                value={tempProfile.lastName}
                onChange={(e) => setTempProfile({...tempProfile, lastName: e.target.value})}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{xs:12}}>
              <TextField
                fullWidth
                label="Email"
                value={tempProfile.email}
                onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{xs:12}}>
              <TextField
                fullWidth
                label="Số điện thoại"
                value={tempProfile.phone}
                onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{xs:12}}>
              <TextField
                fullWidth
                label="Địa chỉ"
                value={tempProfile.address}
                onChange={(e) => setTempProfile({...tempProfile, address: e.target.value})}
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancelEdit}>Hủy</Button>
          <Button variant="contained" onClick={handleSaveProfile}>
            Lưu thay đổi
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
