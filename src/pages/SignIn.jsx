import {
  Grid,
  Box,
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
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const handleSubmit = async () => {
    navigate("/home");
  };

  return (
    <>
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
            backgroundImage: `url(${bg_img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Paper sx={{ py: 2 }}>
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Avatar sx={{ m: "auto", bgcolor: "primary.main", mb: 1 }}>
                  <LockIcon />
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  Welcome Back!
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Sign in to continue.
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
                  required
                  InputProps={{
                    endAdornment: <PersonIcon />,
                  }}
                />
                <TextField
                  label="Password"
                  size="small"
                  fullWidth
                  type="password"
                  name="password"
                  required
                  InputProps={{
                    endAdornment: <KeyIcon />,
                  }}
                />
                <Button
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
          </Grid>
        </Box>
        <Footer />
      </>
    </>
  );
};

export default SignIn;
