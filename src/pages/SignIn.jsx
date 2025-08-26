import {
  Box,
  InputAdornment,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import bg_img from "../assets/bg.png";
import LoginIcon from "@mui/icons-material/Login";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import { Header, Footer } from "../layouts/index";
import { Notification } from "../ui/index";
import useSignInLogic from "../hooks/useSignInLogic";

const SignIn = () => {
  const {
    userDetails,
    helperText,
    handleChange,
    handleSubmit,
    isLoading,
    showNotification,
    setShowNotification,
    notificationMessage,
  } = useSignInLogic();

  return (
    <>
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          maxHeight: "100%",
          backgroundImage: `url(${bg_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <Paper sx={{ py: 2 }}>
          <Box sx={{ textAlign: "center", my: 2 }}>
            <Avatar sx={{ m: "auto", bgcolor: "primary.main", mb: 1 }}>
              <LockIcon />
            </Avatar>
            <Typography variant="h6" fontWeight="bold">
              Welcome Back!
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Sign in to your account.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gap: 2,
              paddingX: "24px",
              paddingBottom: "24px",
            }}
          >
            <TextField
              label="User Name"
              size="small"
              fullWidth
              type="text"
              name="username"
              value={userDetails?.username}
              required
              error={helperText?.username?.type === "error"}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                },
              }}
              FormHelperTextProps={{
                sx: {
                  color:
                    helperText.username.type === "error"
                      ? "error.main"
                      : helperText.username.type === "success"
                      ? "success.main"
                      : "warning.main",
                },
              }}
              onChange={handleChange}
              helperText={helperText?.username?.message}
            />
            <TextField
              label="Password"
              size="small"
              fullWidth
              type="password"
              name="password"
              value={userDetails?.password}
              required
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                },
              }}
              FormHelperTextProps={{
                sx: {
                  color:
                    helperText.username.type === "error"
                      ? "error.main"
                      : helperText.username.type === "success"
                      ? "success.main"
                      : "warning.main",
                },
              }}
              error={helperText?.password?.type === "error"}
              onChange={handleChange}
              helperText={helperText?.password?.message}
            />
            <Button
              loading={isLoading}
              loadingPosition="start"
              variant="contained"
              color="primary"
              size="medium"
              fullWidth
              onClick={handleSubmit}
              type="submit"
              endIcon={<LoginIcon />}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </Box>
      <Footer />
      {showNotification && (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={notificationMessage}
        />
      )}
    </>
  );
};

export default SignIn;
