import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Rating,
  Breadcrumbs
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import { hotels } from "../data/hotels";

const cityHero: Record<string, string> = {
  "Đà Nẵng": "photo-1520250497591-112f2f40a3f4",
  "Nha Trang": "photo-1571896349842-33c89424de2d",
  "Phú Quốc": "photo-1571003123894-1f0594d2b5d9",
  "Hội An": "photo-1542314831-068cd1dbfeeb",
  "Hà Nội": "photo-1551882547-ff40c63fe5fa",
  "TP.HCM": "photo-1566073771259-6a8506099945",
};

// Mapping từ tên thành phố sang các từ khóa tìm kiếm
const cityKeywords: Record<string, string[]> = {
  "Đà Nẵng": ["đà nẵng", "danang", "da nang"],
  "Nha Trang": ["nha trang", "nhatrang", "khánh hòa", "khanh hoa"],
  "Phú Quốc": ["phú quốc", "phu quoc", "kiên giang", "kien giang"],
  "Hội An": ["hội an", "hoi an", "quảng nam", "quang nam"],
  "Hà Nội": ["hà nội", "ha noi", "hanoi"],
  "TP.HCM": ["tp.hcm", "tp hcm", "hồ chí minh", "ho chi minh", "sài gòn", "saigon", "quận 1", "quan 1"],
};

const Destination = () => {
  const params = useParams();
  const cityParam = params.city ? decodeURIComponent(params.city) : "";

  const filtered = useMemo(() => {
    if (!cityParam) return [];
    
    const cityKey = cityParam.toLowerCase();
    const keywords = cityKeywords[cityParam] || [cityKey];
    
    return hotels.filter(hotel => {
      const hotelLocation = hotel.location.toLowerCase();
      const hotelName = hotel.name.toLowerCase();
      
      // Kiểm tra xem khách sạn có khớp với bất kỳ từ khóa nào không
      return keywords.some(keyword => 
        hotelLocation.includes(keyword) || 
        hotelName.includes(keyword) ||
        // Mở rộng tìm kiếm cho các trường hợp đặc biệt
        (cityParam === "TP.HCM" && (hotelLocation.includes("tp.hcm") || hotelLocation.includes("quận"))) ||
        (cityParam === "Đà Nẵng" && hotelLocation.includes("đà nẵng")) ||
        (cityParam === "Nha Trang" && hotelLocation.includes("nha trang")) ||
        (cityParam === "Phú Quốc" && hotelLocation.includes("phú quốc")) ||
        (cityParam === "Hội An" && hotelLocation.includes("hội an")) ||
        (cityParam === "Hà Nội" && hotelLocation.includes("hà nội"))
      );
    });
  }, [cityParam]);

  const heroId = cityHero[cityParam] || "photo-1542314831-068cd1dbfeeb";

  return (
    <Box>
      <Box
        sx={{
          background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/${heroId}?w=1600&h=700&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          py: 8,
          mb: 4
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "rgba(255,255,255,0.85)", mb: 1 }}>
            <Typography component={Link} to="/" color="inherit" sx={{ textDecoration: "none" }}>Trang chủ</Typography>
            <Typography color="inherit">Điểm đến</Typography>
            <Typography color="inherit" fontWeight={700}>{cityParam}</Typography>
          </Breadcrumbs>
          <Typography variant="h3" fontWeight={800}>{cityParam}</Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>{filtered.length} khách sạn phù hợp</Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 6 }}>
        {filtered.length > 0 ? (
          <Grid container spacing={3}>
            {filtered.map(hotel => (
              <Grid size={{ xs: 12,sm:6, md: 4 }} key={hotel.id}>
                <Card elevation={3} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardMedia component="img" height="180" image={hotel.image} alt={hotel.name} />
                  <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6" gutterBottom>{hotel.name}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <LocationOn fontSize="small" color="action" sx={{ mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">{hotel.location}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Rating value={hotel.rating} precision={0.1} readOnly size="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>{hotel.rating} ({hotel.reviews} đánh giá)</Typography>
                    </Box>
                    <Box sx={{ mt: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Chip label={`${(hotel.price).toLocaleString('vi-VN')} VNĐ/đêm`} color="primary" variant="outlined" />
                      <Button variant="contained" size="small" component={Link} to={`/hotel/${hotel.id}`}>Xem</Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Chưa có khách sạn cho khu vực này
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Chúng tôi đang cập nhật thêm khách sạn cho {cityParam}
            </Typography>
            <Button variant="contained" component={Link} to="/hotels">
              Xem tất cả khách sạn
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Destination;


