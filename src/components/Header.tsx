import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HotelIcon from "@mui/icons-material/Hotel";
import PersonIcon from "@mui/icons-material/Person";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { text: "Trang chủ", path: "/" },
    { text: "Khách sạn", path: "/hotels" },
    { text: "Liên hệ", path: "/contact" }
  ];

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    const user = localStorage.getItem("userName");
    if (loginStatus === "true" && user) {
      setIsLoggedIn(true);
      setUserName(user);
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, [location]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
    setAnchorEl(null);
    navigate("/");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        TravelStay
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component={Link} to={item.path}>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                color: location.pathname === item.path ? theme.palette.primary.main : "inherit",
                textAlign: "center"
              }}
            />
          </ListItem>
        ))}
        {isLoggedIn ? (
          <>
            <ListItem component={Link} to="/profile">
              <ListItemText primary="Tài khoản" sx={{ textAlign: "center" }} />
            </ListItem>
            <ListItem onClick={handleLogout}>
              <ListItemText primary="Đăng xuất" sx={{ textAlign: "center" }} />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem component={Link} to="/login">
              <ListItemText primary="Đăng nhập" sx={{ textAlign: "center" }} />
            </ListItem>
            <ListItem component={Link} to="/register">
              <ListItemText primary="Đăng ký" sx={{ textAlign: "center" }} />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" elevation={0} sx={{
      background: "rgba(25, 118, 210, 0.95)",
      backdropFilter: "saturate(180%) blur(10px)",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
    }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <HotelIcon sx={{ mr: 1, fontSize: 30 }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ textDecoration: "none", color: "inherit", fontWeight: 800, letterSpacing: 0.3 }}
            >
              TravelStay
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: 15,
                    px: 1.25,
                    fontWeight: location.pathname === item.path ? 700 : 500,
                    borderBottom: location.pathname === item.path ? "2px solid white" : "2px solid transparent",
                    borderRadius: 0,
                    transition: "all .2s",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.12)" }
                  }}
                >
                  {item.text}
                </Button>
              ))}
              {isLoggedIn ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, ml: 1 }}>
                  <Typography variant="body2" sx={{ color: "white", opacity: 0.9 }}>
                    Xin chào, {userName.split(" ")[0]}
                  </Typography>
                  <IconButton onClick={handleProfileMenuOpen} sx={{ color: "white" }}>
                    <Avatar sx={{ width: 34, height: 34, bgcolor: "rgba(255,255,255,0.2)" }}>
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                </Box>
              ) : (
                <Box sx={{ display: "flex", gap: 1, ml: 1 }}>
                  <Button
                    component={Link}
                    to="/login"
                    sx={{
                      color: "white",
                      textTransform: "none",
                      border: "1px solid rgba(255,255,255,0.7)",
                      borderRadius: 999,
                      px: 2,
                      "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.12)" }
                    }}
                  >
                    Đăng nhập
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    sx={{
                      backgroundColor: "#fff",
                      color: "primary.main",
                      textTransform: "none",
                      borderRadius: 999,
                      px: 2,
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" }
                    }}
                  >
                    Đăng ký
                  </Button>
                </Box>
              )}
            </Box>
          )}

          {isMobile && (
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: 260 } }}
      >
        {drawer}
      </Drawer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={Link} to="/profile">Tài khoản của tôi</MenuItem>
        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;