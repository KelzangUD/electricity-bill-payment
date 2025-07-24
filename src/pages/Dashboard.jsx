// import Nav from "../layout/dashboard/Nav";
import { Box, Paper, } from "@mui/material";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import bg from "../assets/bg.png";
import { SideNav, Footer} from "../layouts/index";


const Item = styled(Paper)(({ theme }) => ({
  borderRadius: 0,
  minHeight: "100vh",
  width: "100%",
}));

const Dashboard = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          <Item style={{ backgroundImage: `url(${bg})` }}>
            {/* <Nav /> */}
            <Outlet />
          </Item>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
