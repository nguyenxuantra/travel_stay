import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItemText,
  Divider,
  Container,
  Button,
  ListItemButton,
  ListItemIcon,
  Avatar,
  TextField,
  InputAdornment
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HotelIcon from "@mui/icons-material/Hotel";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import GroupIcon from "@mui/icons-material/Group";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

const drawerWidthExpanded = 260;
const drawerWidthCollapsed = 80;

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Admin area is public per requirement; no guard

  const menuItems = [
    { text: "Tổng quan", path: "/admin", icon: <DashboardIcon /> },
    { text: "Khách sạn", path: "/admin/hotels", icon: <HotelIcon /> },
    { text: "Đặt phòng", path: "/admin/bookings", icon: <BookOnlineIcon /> },
    { text: "Người dùng", path: "/admin/users", icon: <GroupIcon /> }
  ];

  const currentDrawerWidth = collapsed ? drawerWidthCollapsed : drawerWidthExpanded;

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", color: "rgba(255,255,255,0.92)" }}>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        p: 2
      }}>
        <Typography
          variant="h6"
          fontWeight={800}
          sx={{ opacity: collapsed ? 0 : 1, transition: "opacity .2s" }}
        >
          Admin Panel
        </Typography>
        <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ display: { xs: "none", md: "inline-flex" }, color: "inherit" }}>
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />
      <List sx={{ px: 1, pt: 1 }}>
        {menuItems.map((item) => {
          const selected = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.path}
              selected={selected}
              sx={{
                borderRadius: 1.5,
                mb: 0.5,
                px: 1.25,
                color: "inherit",
                "& .MuiListItemIcon-root": { color: "inherit", opacity: 0.9 },
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.06)"
                },
                "&.Mui-selected": {
                  backgroundColor: "rgba(255,255,255,0.12)",
                  borderLeft: "3px solid rgba(255,255,255,0.9)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  opacity: collapsed ? 0 : 1,
                  transition: "opacity .2s",
                  whiteSpace: "nowrap",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ mt: "auto", p: 2 }}>
        <Button
          fullWidth={!collapsed}
          variant="outlined"
          color="inherit"
          component={Link}
          to="/"
          sx={{ justifyContent: "flex-start", px: 1.25, borderColor: "rgba(255,255,255,0.4)" }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <Box component="span" sx={{ opacity: collapsed ? 0 : 1, transition: "opacity .2s" }}>Về trang web</Box>
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${currentDrawerWidth}px)` },
          ml: { md: `${currentDrawerWidth}px` },
          background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 60%, #0d47a1 100%)`,
          boxShadow: '0 4px 16px rgba(0,0,0,0.18)'
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Khu vực quản trị
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: { xs: "40%", sm: "50%", md: 420 } }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Tìm kiếm..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "rgba(255,255,255,0.9)" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputBase-root": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.35)", transition: 'border-color .2s ease' },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.7)" },
                "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" }
              }}
            />
            <Avatar sx={{ bgcolor: "rgba(255,255,255,0.25)", transition: 'transform .2s ease', "&:hover": { transform: 'scale(1.05)' } }}>A</Avatar>
            {/* <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              component={Link}
              to="/"
              sx={{
                border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: 999,
                px: 1.5,
                transition: 'all .2s ease',
                "&:hover": { backgroundColor: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.7)' }
              }}
            >
              Trang chủ
            </Button> */}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: currentDrawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidthExpanded,
              background: (theme) => `linear-gradient(160deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 70%, #0d47a1 100%)`,
              color: "rgba(255,255,255,0.92)",
              borderRight: "1px solid rgba(255,255,255,0.12)"
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: currentDrawerWidth,
              overflowX: "hidden",
              transition: 'width .25s ease',
              background: (theme) => `linear-gradient(160deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 70%, #0d47a1 100%)`,
              color: "rgba(255,255,255,0.92)",
              borderRight: "1px solid rgba(255,255,255,0.12)",
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.03)'
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${currentDrawerWidth}px)` } }}>
        <Toolbar />
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default AdminLayout;


