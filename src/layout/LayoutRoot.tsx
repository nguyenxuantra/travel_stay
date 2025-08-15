import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const RootLayout = () => {
  return (
    <Box sx={{ 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <ScrollToTop/>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default RootLayout;
