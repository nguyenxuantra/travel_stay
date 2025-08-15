import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
  Rating,
  Stack,
  Pagination,
  TextField,
  InputAdornment,
  Paper
} from "@mui/material";
import { 
  Search, 
  LocationOn, 
  Wifi, 
  Pool, 
  Restaurant,
  Spa,
  FilterList
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { hotels, getAmenityLabel } from "../data/hotels";

const Hotels = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    priceRange: [0, 10000000],
    rating: 0,
    amenities: [] as string[],
    sortBy: "rating"
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) setSearchQuery(searchFromUrl);
  }, [searchParams]);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi": return <Wifi fontSize="small" />;
      case "pool": return <Pool fontSize="small" />;
      case "restaurant": return <Restaurant fontSize="small" />;
      case "spa": return <Spa fontSize="small" />;
      default: return undefined;
    }
  };

  const handleAmenityChange = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1];
    const matchesRating = hotel.rating >= filters.rating;
    const matchesAmenities = filters.amenities.length === 0 || 
                            filters.amenities.every(amenity => hotel.amenities.includes(amenity));
    
    return matchesSearch && matchesPrice && matchesRating && matchesAmenities;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      default: return 0;
    }
  });

  const handleHotelClick = (hotelId: number) => navigate(`/hotel/${hotelId}`);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Khám Phá Khách Sạn
      </Typography>

      {/* Enhanced Search Bar */}
      <Paper elevation={3} sx={{ p: 2.5, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{xs:12, md:6}}>
            <TextField
              fullWidth
              label="Tìm kiếm khách sạn hoặc địa điểm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid size={{xs:12, md:3}}>
            <FormControl fullWidth size="small">
              <InputLabel>Sắp xếp</InputLabel>
              <Select
                value={filters.sortBy}
                label="Sắp xếp"
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              >
                <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
                <MenuItem value="price-low">Giá tăng dần</MenuItem>
                <MenuItem value="price-high">Giá giảm dần</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{xs:12, md:3}}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained" onClick={() => { /* trigger filter drawer on mobile later */ }}>Bộ lọc</Button>
              <Button variant="outlined" onClick={() => { setSearchQuery(""); setFilters({ priceRange:[0,10000000], rating:0, amenities:[], sortBy:'rating' }); }}>Xóa</Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        {/* Filters Sidebar */}
        <Grid size={{xs:12, md:3}}>
          <Paper elevation={2} sx={{ p: 3, position: { md: 'sticky' }, top: { md: 100 }, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <FilterList sx={{ mr: 1 }} />
              <Typography variant="h6">Bộ lọc</Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Khoảng giá (VNĐ)
              </Typography>
              <Slider
                value={filters.priceRange}
                onChange={(_, newValue) => setFilters(prev => ({ ...prev, priceRange: newValue as number[] }))}
                valueLabelDisplay="auto"
                min={0}
                max={20000000}
                step={500000}
                valueLabelFormat={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">{(filters.priceRange[0] / 1000000).toFixed(1)}M</Typography>
                <Typography variant="body2">{(filters.priceRange[1] / 1000000).toFixed(1)}M</Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Đánh giá tối thiểu
              </Typography>
              <Rating
                value={filters.rating}
                onChange={(_, newValue) => setFilters(prev => ({ ...prev, rating: newValue || 0 }))}
                precision={0.5}
              />
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Tiện ích
              </Typography>
              <FormGroup>
                {["wifi", "pool", "restaurant", "spa"].map((amenity) => (
                  <FormControlLabel
                    key={amenity}
                    control={
                      <Checkbox
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                      />
                    }
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {getAmenityIcon(amenity)}
                        <Typography sx={{ ml: 1 }}>
                          {getAmenityLabel(amenity)}
                        </Typography>
                      </Box>
                    }
                  />
                ))}
              </FormGroup>
            </Box>
          </Paper>
        </Grid>

        {/* Hotels List */}
        <Grid size={{xs:12, md:9}}>
          <Grid container spacing={3}>
            {sortedHotels.map((hotel) => (
              <Grid size={{xs:12, sm:6, md:4}} key={hotel.id}>
                <Card elevation={3} sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 2 }} onClick={() => handleHotelClick(hotel.id)}>
                  <Box sx={{ position: "relative" }}>
                    <CardMedia component="img" height="170" image={hotel.image} alt={hotel.name} />
                    {hotel.discount !== "0%" && (
                      <Chip label={hotel.discount} color="error" sx={{ position: "absolute", top: 12, right: 12, fontWeight: "bold" }} />
                    )}
                  </Box>
                  <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6" gutterBottom>{hotel.name}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <LocationOn fontSize="small" color="action" sx={{ mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">{hotel.location}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Rating value={hotel.rating} precision={0.1} readOnly size="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {hotel.rating} ({hotel.reviews})
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      {hotel.amenities.slice(0, 3).map((amenity) => (
                        <Chip key={amenity} icon={getAmenityIcon(amenity)} label={getAmenityLabel(amenity)} size="small" variant="outlined" />
                      ))}
                    </Stack>
                    <Box sx={{ mt: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="h6" color="primary" fontWeight="bold">{(hotel.price/1000000).toFixed(1)}M VNĐ</Typography>
                      <Button variant="contained" size="small">Xem chi tiết</Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {sortedHotels.length === 0 && (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" color="text.secondary">Không tìm thấy khách sạn nào phù hợp</Typography>
              <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setFilters({ priceRange: [0, 10000000], rating: 0, amenities: [], sortBy: "rating" })}>Xóa bộ lọc</Button>
            </Box>
          )}

          {sortedHotels.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination count={Math.ceil(sortedHotels.length / 9)} color="primary" />
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Hotels;
