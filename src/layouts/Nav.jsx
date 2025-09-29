import { forwardRef, useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Logout from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import { drawerClasses } from "@mui/material/Drawer";
import MainMenu from "./MainMenu";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Nav = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const [currentLocation, setCurrentLocation] = useState("");
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [showLogOutDialog, setShowLogOutDialog] = useState(false);
  useEffect(() => {
    setCurrentLocation(location?.pathname?.split("/").pop());
  }, [location]);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logoutHandle = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigation("/");
  };

  const menuId = "primary-search-account-menu";

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
          color: "#000",
          backgroundColor: "#hsl(0deg 0% 96.86%)",
        },
      }}
    >
      <Box sx={{ width: 250 }} role="presentation">
        <MainMenu />
      </Box>
    </Drawer>
  );
  const renderLogOutDialog = (
    <Dialog
      open={showLogOutDialog}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={() => setShowLogOutDialog(false)}
      aria-describedby="alert-dialog"
    >
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog">
          Are you sure you want to sign out?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mr: 2, mb: 2 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setShowLogOutDialog(false)}
          size="small"
        >
          Cancel
        </Button>
        <Button variant="contained" size="small" onClick={logoutHandle}>
          Confirmed
        </Button>
      </DialogActions>
    </Dialog>
  );
  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
          marginBottom: 2,
          backgroundColor: "hsl(0deg 0% 96.86%)",
          color: "#000",
          borderBottom: "1px solid hsl(240 4.8% 85.9%)",
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center" }} spacing={2}>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              marginRight: { xs: 2 },
              width: "10%",
            }}
          >
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="body2"
                noWrap
                sx={{
                  ml: -2,
                  display: "flex",
                  color: "inherit",
                  textDecoration: "none",
                  alignItems: "center",
                }}
              >
                <NavigateNextIcon sx={{ mb: 0.2 }} color="textSecondary" />
                {currentLocation.toUpperCase()}
              </Typography>
            </Box>
            <Box
              sx={{
                ml: "auto", // pushes this Box to the right
                alignItems: "flex-end",
              }}
            >
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
                onClick={() => setShowLogOutDialog(true)}
                color="inherit"
                sx={{
                  marginLeft: 2,
                }}
              >
                <Logout sx={{ height: { xs: 20, md: 25 }, width: "auto" }} />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileSideMenu}
      {renderLogOutDialog}
    </>
  );
};

export default Nav;
