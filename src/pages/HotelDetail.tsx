import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Rating,
  Tabs,
  Tab,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel
} from "@mui/material";
import { 
  LocationOn, 
  Wifi, 
  Pool, 
  Restaurant,
  Spa,
  Phone,
  Email,
} from "@mui/icons-material";
import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { hotels, getAmenityLabelFull } from "../data/hotels";

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = useMemo(() => hotels.find(h => String(h.id) === id), [id]);

  const [activeTab, setActiveTab] = useState(0);
  const [bookingDialog, setBookingDialog] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    rooms: 1,
    customerName: "",
    customerEmail: "",
    customerPhone: ""
  });

  if (!hotel) {
    navigate("/hotels");
    return null;
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi": return <Wifi />;
      case "pool": return <Pool />;
      case "restaurant": return <Restaurant />;
      case "spa": return <Spa />;
      default: return undefined;
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleBooking = () => {
    setBookingDialog(true);
  };

  const handleCloseBooking = () => {
    setBookingDialog(false);
    setBookingStep(0);
  };

  const handleNextStep = () => {
    setBookingStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setBookingStep(prev => prev - 1);
  };

  const handleConfirmBooking = () => {
    console.log("Booking confirmed:", bookingData);
    handleCloseBooking();
  };

  const calculateTotalPrice = () => {
    const selectedRoom = hotel.roomTypes && hotel.roomTypes[0];
    if (!selectedRoom) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return selectedRoom.price * Math.max(nights, 1) * bookingData.rooms;
  };

  const bookingSteps = [
    "Chọn ngày và số lượng",
    "Thông tin khách hàng",
    "Xác nhận đặt phòng"
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {hotel.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <LocationOn color="action" sx={{ mr: 1 }} />
          <Typography variant="h6" color="text.secondary">
            {hotel.location}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Rating value={hotel.rating} precision={0.1} readOnly size="large" />
          <Typography variant="h6" sx={{ ml: 1 }}>
            {hotel.rating} ({hotel.reviews} đánh giá)
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{xs:12, md:8}}>
          <CardMedia
            component="img"
            height="400"
            image={hotel.images[0]}
            alt={hotel.name}
            sx={{ borderRadius: 2 }}
          />
        </Grid>
        <Grid size={{xs:12,  md:4}}>
          <Grid container spacing={2}>
            {hotel.images.slice(1, 4).map((image, index) => (
              <Grid size={{xs:6,  md:12}} key={index}>
                <CardMedia
                  component="img"
                  height="120"
                  image={image}
                  alt={`${hotel.name} ${index + 2}`}
                  sx={{ borderRadius: 1 }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid size={{xs:12, md:8}}>
          {/* Tabs */}
          <Paper sx={{ mb: 4 }}>
            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="Mô tả" />
              <Tab label="Tiện ích" />
              <Tab label="Đánh giá" />
            </Tabs>
          </Paper>

          <Box sx={{ minHeight: 400 }}>
            {activeTab === 0 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Về khách sạn
                </Typography>
                <Typography variant="body1" paragraph>
                  {hotel.description}
                </Typography>
                {hotel.longDescription && (
                  <Typography variant="body1">
                    {hotel.longDescription}
                  </Typography>
                )}
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Tiện ích khách sạn
                </Typography>
                <Grid container spacing={2}>
                  {hotel.amenities.map((amenity) => (
                    <Grid size={{xs:12, sm:6}} key={amenity}>
                      <Card variant="outlined">
                        <CardContent sx={{ display: "flex", alignItems: "center" }}>
                          {getAmenityIcon(amenity)}
                          <Typography sx={{ ml: 2 }}>
                            {getAmenityLabelFull(amenity)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Đánh giá từ khách hàng
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  (Mock) Chưa có API đánh giá.
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>

        {/* Sidebar - Room Selection & Booking */}
        <Grid size={{xs:12, md:4}}>
          <Paper elevation={3} sx={{ p: 3, position: "sticky", top: 100 }}>
            <Typography variant="h5" gutterBottom>
              Chọn phòng
            </Typography>
            
            {(hotel.roomTypes || []).map((room) => (
              <Card key={room.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {room.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {room.description}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6" color="primary">
                      {(room.price / 1000000).toFixed(1)}M VNĐ
                    </Typography>
                    <Button variant="contained" onClick={handleBooking}>
                      Đặt phòng
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}

            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Liên hệ đặt phòng
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Phone sx={{ mr: 1 }} />
                  <Typography>+84 123 456 789</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Email sx={{ mr: 1 }} />
                  <Typography>booking@grandhotel.vn</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={bookingDialog} onClose={handleCloseBooking} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5">Đặt phòng - {hotel.name}</Typography>
        </DialogTitle>
        
        <DialogContent>
          <Stepper activeStep={bookingStep} sx={{ mb: 4 }}>
            {bookingSteps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {bookingStep === 0 && (
            <Grid container spacing={2}>
              <Grid size={{xs:12, md:6}}>
                <TextField
                  fullWidth
                  label="Ngày check-in"
                  type="date"
                  value={bookingData.checkIn}
                  onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{xs:12, md:6}}>
                <TextField
                  fullWidth
                  label="Ngày check-out"
                  type="date"
                  value={bookingData.checkOut}
                  onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{xs:12, md:6}}>
                <FormControl fullWidth>
                  <InputLabel>Số khách</InputLabel>
                  <Select
                    value={bookingData.guests}
                    label="Số khách"
                    onChange={(e) => setBookingData({...bookingData, guests: e.target.value as number})}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <MenuItem key={num} value={num}>{num} người</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{xs:12, md:6}}>
                <FormControl fullWidth>
                  <InputLabel>Số phòng</InputLabel>
                  <Select
                    value={bookingData.rooms}
                    label="Số phòng"
                    onChange={(e) => setBookingData({...bookingData, rooms: e.target.value as number})}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <MenuItem key={num} value={num}>{num} phòng</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}

          {bookingStep === 1 && (
            <Grid container spacing={2}>
              <Grid size={{xs:12}}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  value={bookingData.customerName}
                  onChange={(e) => setBookingData({...bookingData, customerName: e.target.value})}
                />
              </Grid>
              <Grid size={{xs:12, md:6}}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={bookingData.customerEmail}
                  onChange={(e) => setBookingData({...bookingData, customerEmail: e.target.value})}
                />
              </Grid>
              <Grid size={{xs:12, md:6}}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  value={bookingData.customerPhone}
                  onChange={(e) => setBookingData({...bookingData, customerPhone: e.target.value})}
                />
              </Grid>
            </Grid>
          )}

          {bookingStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>Xác nhận thông tin đặt phòng</Typography>
              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid size={{xs:6}}>
                    <Typography variant="body2" color="text.secondary">Khách sạn:</Typography>
                    <Typography variant="body1">{hotel.name}</Typography>
                  </Grid>
                  <Grid size={{xs:6}}>
                    <Typography variant="body2" color="text.secondary">Loại phòng:</Typography>
                    <Typography variant="body1">Phòng Deluxe</Typography>
                  </Grid>
                  <Grid size={{xs:6}}>
                    <Typography variant="body2" color="text.secondary">Check-in:</Typography>
                    <Typography variant="body1">{bookingData.checkIn}</Typography>
                  </Grid>
                  <Grid size={{xs:6}}>
                    <Typography variant="body2" color="text.secondary">Check-out:</Typography>
                    <Typography variant="body1">{bookingData.checkOut}</Typography>
                  </Grid>
                  <Grid size={{xs:6}}>
                    <Typography variant="body2" color="text.secondary">Số khách:</Typography>
                    <Typography variant="body1">{bookingData.guests} người</Typography>
                  </Grid>
                  <Grid size={{xs:6}}>
                    <Typography variant="body2" color="text.secondary">Số phòng:</Typography>
                    <Typography variant="body1">{bookingData.rooms} phòng</Typography>
                  </Grid>
                </Grid>
              </Paper>
              
              <Typography variant="h6" color="primary" gutterBottom>
                Tổng tiền: {calculateTotalPrice().toLocaleString('vi-VN')} VNĐ
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseBooking}>Hủy</Button>
          {bookingStep > 0 && (
            <Button onClick={handlePrevStep}>Quay lại</Button>
          )}
          {bookingStep < 2 ? (
            <Button variant="contained" onClick={handleNextStep}>
              Tiếp theo
            </Button>
          ) : (
            <Button variant="contained" onClick={handleConfirmBooking}>
              Xác nhận đặt phòng
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HotelDetail;
