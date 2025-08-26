import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  ListItemIcon,
  MenuItem,
  Menu,
  Toolbar,
  // Tooltip,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
// import HomeIcon from "@mui/icons-material/Home";
import Logout from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import { drawerClasses } from "@mui/material/Drawer";
import MainMenu from "./MainMenu";

const Nav = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const [currentLocation, setCurrentLocation] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  useEffect(() => {
    setCurrentLocation(location?.pathname?.split("/").pop());
  }, [location]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const profileHandle = () => {
    navigation("/home/profile");
    setAnchorEl(false);
  };

  const logoutHandle = async () => {
    navigation("/");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      id={menuId}
      keepMounted
      transformOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        width: 440,
        marginTop: 10,
      }}
    >
      <MenuItem onClick={profileHandle}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        My Profile
      </MenuItem>
      <MenuItem onClick={logoutHandle}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileSideMenu = (
    <Drawer
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{
        flexShrink: 0,
        boxSizing: "border-box",
        mt: 10,
        [`& .${drawerClasses.paper}`]: {
          boxSizing: "border-box",
          color: "#fff",
          backgroundColor: "#0277bd",
        },
      }}
    >
      <Box sx={{ width: 250 }} role="presentation">
        <MainMenu />
      </Box>
    </Drawer>
  );
  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
          paddingY: "21px",
          marginBottom: 4,
          background: "#0277bd",
          color: "#fff",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="small"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="subtitle1"
            noWrap
            sx={{
              mr: 2,
              display: "flex",
              fontWeight: 400,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {currentLocation.toUpperCase()}
          </Typography>
          <Box>
            {/* <Tooltip title="Redirect to SSO">
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => {
                  window.location.assign("https://hub.tashicell.com/dashboard");
                }}
                color="inherit"
              >
                <HomeIcon sx={{ height: { xs: 20, md: 25 }, width: "auto" }} />
              </IconButton>
            </Tooltip> */}
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{
                marginLeft: 2,
              }}
            >
              <AccountCircle
                sx={{ height: { xs: 20, md: 25 }, width: "auto" }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileSideMenu}
      {renderMenu}
    </>
  );
};

export default Nav;
