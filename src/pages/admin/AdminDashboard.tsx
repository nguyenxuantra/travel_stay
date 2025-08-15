import { Card, CardContent, Grid, Typography, Box, Chip, Button, Avatar } from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

const StatCard = ({
  title,
  value,
  icon,
  gradient
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  gradient: [string, string];
}) => (
  <Card elevation={4} sx={{
    background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
    color: "white",
    overflow: "hidden"
  }}>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="subtitle2" sx={{ opacity: 0.9 }} gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={800}>{value}</Typography>
        </Box>
        <Box sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          display: "grid",
          placeItems: "center",
          background: "rgba(255,255,255,0.18)"
        }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const MiniBars = ({ data, color }: { data: number[]; color: string }) => (
  <Box sx={{ display: "flex", alignItems: "flex-end", gap: 0.75, height: 56 }}>
    {data.map((h, i) => (
      <Box key={i} sx={{ width: 8, height: h, borderRadius: 1, backgroundColor: color, opacity: 0.9 }} />
    ))}
  </Box>
);

const AdminDashboard = () => {
  const currency = (v: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v);

  const recentBookings = [
    { id: 1012, user: "Nguyễn Văn A", hotel: "Grand Hotel Saigon", total: 5000000, status: "confirmed" },
    { id: 1011, user: "Trần Thị B", hotel: "InterContinental Danang", total: 9000000, status: "pending" },
    { id: 1010, user: "Lê Minh C", hotel: "Mariott Resort Nha Trang", total: 3600000, status: "confirmed" }
  ];

  return (
    <Box>
      <Typography variant="h5" fontWeight={800} sx={{ mb: 3 }}>
        Tổng quan
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Tổng số khách sạn" value={10} icon={<HotelIcon htmlColor="#fff" />} gradient={["#42a5f5", "#1e88e5"]} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Đặt phòng hôm nay" value={23} icon={<BookOnlineIcon htmlColor="#fff" />} gradient={["#66bb6a", "#43a047"]} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Doanh thu tháng" value={currency(125000000)} icon={<AttachMoneyIcon htmlColor="#fff" />} gradient={["#ffa726", "#fb8c00"]} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Người dùng mới" value={57} icon={<PersonAddAlt1Icon htmlColor="#fff" />} gradient={["#ab47bc", "#8e24aa"]} />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 0.5 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6" fontWeight={700}>Doanh thu 7 ngày</Typography>
                <Chip label={"+12% tuần này"} color="success" size="small" />
              </Box>
              <MiniBars data={[18, 24, 30, 22, 34, 40, 28].map(v => v)} color="#1e88e5" />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                Tổng: {currency(125000000)} trong tháng hiện tại
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="h6" fontWeight={700}>Đặt phòng gần đây</Typography>
                <Button size="small">Xem tất cả</Button>
              </Box>
              {recentBookings.map((r) => (
                <Box key={r.id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 1.25 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                    <Avatar sx={{ width: 36, height: 36 }}>{r.user.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700}>{r.user}</Typography>
                      <Typography variant="body2" color="text.secondary">{r.hotel}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                    <Chip label={currency(r.total)} size="small" />
                    <Chip label={r.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'} color={r.status === 'confirmed' ? 'success' : 'warning'} size="small" />
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card elevation={0} sx={{ mt: 2, p: 2, border: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1.5 }}>
          <Typography variant="subtitle1" fontWeight={700}>Tác vụ nhanh</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<HotelIcon />}
              onClick={() => window.location.href = '/admin/hotels'}
            >
              Thêm khách sạn
            </Button>
            <Button
              variant="outlined"
              startIcon={<BookOnlineIcon />}
              onClick={() => window.location.href = '/admin/bookings'}
            >
              Xem đặt phòng
            </Button>
            <Button
              variant="outlined"
              startIcon={<PersonAddAlt1Icon />}
              onClick={() => window.location.href = '/admin/users'}
            >
              Thêm người dùng
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default AdminDashboard;
