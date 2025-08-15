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
    Chip,
    Stack
} from "@mui/material";
import {
    Search,
    LocationOn,
    Wifi,
    Pool,
    Restaurant,
    Spa
} from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hotels, getAmenityLabel } from "../data/hotels";

const Home = () => {
    const [searchData, setSearchData] = useState({
        destination: "",
        checkIn: "",
        checkOut: "",
        guests: 1
    });

    const navigate = useNavigate();

    const featuredHotels = hotels.slice(0, 8);

    const getAmenityIconComponent = (amenity: string) => {
        switch (amenity) {
            case "wifi": return <Wifi fontSize="small" />;
            case "pool": return <Pool fontSize="small" />;
            case "restaurant": return <Restaurant fontSize="small" />;
            case "spa": return <Spa fontSize="small" />;
            default: return undefined;
        }
    };

    const handleSearch = () => {
        if (searchData.destination.trim()) {
            navigate(`/hotels?search=${encodeURIComponent(searchData.destination)}`);
        } else {
            navigate('/hotels');
        }
    };

    const quickDestinations = ["Đà Nẵng", "Nha Trang", "Phú Quốc", "Hội An", "Hà Nội", "TP.HCM"];

    return (
        <Box>
            {/* Hero Section with Search */}
            <Box
                sx={{
                    background: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&h=700&fit=crop')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "white",
                    py: 12,
                    mb: 6
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 800, mb: 2 }}>
                        Tìm Khách Sạn Hoàn Hảo
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ mb: 4, opacity: 0.9 }}>
                        Khám phá và đặt phòng tại những khách sạn tốt nhất Việt Nam
                    </Typography>

                    {/* Enhanced Search Form */}
                    <Paper elevation={8} sx={{ p: 2.5, maxWidth: 980, mx: "auto", borderRadius: 3, backgroundColor: "rgba(255,255,255,0.95)" }}>
                        <Grid container spacing={1.5} alignItems="center">
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    label="Điểm đến"
                                    value={searchData.destination}
                                    onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                                    placeholder="Thành phố, địa điểm..."
                                    InputProps={{
                                        startAdornment: <LocationOn sx={{ mr: 1, color: "text.secondary" }} />
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 6, md: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Check-in"
                                    type="date"
                                    value={searchData.checkIn}
                                    onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid size={{ xs: 6, md: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Check-out"
                                    type="date"
                                    value={searchData.checkOut}
                                    onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid size={{ xs: 6, md: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Khách</InputLabel>
                                    <Select
                                        value={searchData.guests}
                                        label="Khách"
                                        onChange={(e) => setSearchData({ ...searchData, guests: e.target.value as number })}
                                    >
                                        {[1, 2, 3, 4, 5, 6].map((num) => (
                                            <MenuItem key={num} value={num}>{num} người</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 6, md: 2 }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    startIcon={<Search />}
                                    onClick={handleSearch}
                                    sx={{ height: 56 }}
                                >
                                    Tìm kiếm
                                </Button>
                            </Grid>
                        </Grid>

                        {/* Quick destination chips */}
                        <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
                            {quickDestinations.map((d) => (
                                <Chip key={d} label={d} onClick={() => setSearchData({ ...searchData, destination: d })} />
                            ))}
                        </Stack>
                    </Paper>
                </Container>
            </Box>



            {/* Featured Hotels */}
            <Container maxWidth="lg" sx={{ mb: 6 }}>
                <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
                    Khách Sạn Nổi Bật
                </Typography>

                <Grid container spacing={4}>
                    {featuredHotels.map((hotel) => (
                        <Grid size={{ xs: 12,sm:6, md: 3 }} key={hotel.id}>
                            <Card elevation={4} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                <Box sx={{ position: "relative" }}>
                                    <CardMedia component="img" height="200" image={hotel.image} alt={hotel.name} />
                                    {hotel.discount !== "0%" && (
                                        <Chip label={hotel.discount} color="error" sx={{ position: "absolute", top: 16, right: 16, fontWeight: "bold" }} />
                                    )}
                                </Box>

                                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                        {hotel.name}
                                    </Typography>

                                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                        <LocationOn fontSize="small" color="action" sx={{ mr: 0.5 }} />
                                        <Typography variant="body2" color="text.secondary">{hotel.location}</Typography>
                                    </Box>

                                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                        <Rating value={hotel.rating} precision={0.1} readOnly size="small" />
                                        <Typography variant="body2" sx={{ ml: 1 }}>{hotel.rating} ({hotel.reviews} đánh giá)</Typography>
                                    </Box>

                                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                        <Stack direction="row" spacing={1}>
                                            {hotel.amenities.slice(0, 3).map((amenity) => (
                                                <Chip key={amenity} icon={getAmenityIconComponent(amenity) as React.ReactElement} label={getAmenityLabel(amenity)} size="small" variant="outlined" />
                                            ))}
                                        </Stack>
                                    </Box>

                                    <Box sx={{ mt: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Typography variant="h6" color="primary" fontWeight="bold">{(hotel.price / 1000000).toFixed(1)}M VNĐ</Typography>
                                        <Button variant="contained" size="small" component={Link} to={`/hotel/${hotel.id}`}>Xem chi tiết</Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {/* Popular Destinations */}
            <Container maxWidth="lg" sx={{ mb: 6 }}>
                <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 3 }}>
                    Điểm Đến Phổ Biến
                </Typography>
                <Grid container spacing={3}>
                    {[
                        { city: "Đà Nẵng", img: "photo-1520250497591-112f2f40a3f4" },
                        { city: "Nha Trang", img: "photo-1571896349842-33c89424de2d" },
                        { city: "Phú Quốc", img: "photo-1571003123894-1f0594d2b5d9" },
                        { city: "Hội An", img: "photo-1542314831-068cd1dbfeeb" },
                        { city: "Hà Nội", img: "photo-1551882547-ff40c63fe5fa" },
                        { city: "TP.HCM", img: "photo-1566073771259-6a8506099945" }
                    ].map((d) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={d.city}>
                            <Card sx={{ borderRadius: 2, overflow: 'hidden', cursor: 'pointer', transition: 'transform .2s ease, box-shadow .2s ease', '&:hover': { transform: 'translateY(-2px)', boxShadow: 6 } }} component={Link} to={`/destination/${encodeURIComponent(d.city)}`}>
                                <CardMedia component="img" height="160" image={`https://images.unsplash.com/${d.img}?w=600&h=400&fit=crop`} alt={d.city} />
                                <CardContent>
                                    <Typography variant="h6">{d.city}</Typography>
                                    <Typography variant="body2" color="text.secondary">Khám phá ưu đãi tại {d.city}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {/* Testimonials */}
            <Box sx={{ backgroundColor: "#fafafa", py: 6 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
                        Khách hàng nói gì về chúng tôi
                    </Typography>
                    <Grid container spacing={3}>
                        {[1, 2, 3].map((i) => (
                            <Grid size={{ xs: 12, md: 4 }} key={i}>
                                <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        “Dịch vụ tuyệt vời, đặt phòng nhanh chóng và giá rất tốt. Sẽ quay lại sử dụng!”
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <AvatarFallback name={`User ${i}`} />
                                        <Box>
                                            <Typography variant="subtitle2">Khách hàng #{i}</Typography>
                                            <Rating value={5 - (i - 1) * 0.5} size="small" readOnly />
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Newsletter */}
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>Nhận ưu đãi mới nhất</Typography>
                            <Typography variant="body2" color="text.secondary">Đăng ký nhận bản tin để không bỏ lỡ khuyến mãi hấp dẫn</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Grid container spacing={1}>
                                <Grid size={{ xs: 8 }}>
                                    <TextField fullWidth placeholder="Nhập email của bạn" />
                                </Grid>
                                <Grid size={{ xs: 4 }}>
                                    <Button variant="contained" fullWidth>Đăng ký</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

const AvatarFallback = ({ name }: { name: string }) => {
    const initials = name.split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase();
    return (
        <Box sx={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
            {initials}
        </Box>
    );
};

export default Home;