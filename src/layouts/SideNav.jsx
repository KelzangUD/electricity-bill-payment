import { styled } from "@mui/material/styles";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import MainMenu from "./MainMenu";

const Drawer = styled(MuiDrawer)({
  width: 220,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: 220,
    boxSizing: "border-box",
    color: "#000",
    fontWeight: "bold",
    // backgroundColor: "#0277bd",
    backgroundColor: "hsl(0deg 0% 96.86%)",
  },
});

const Wrapper = ({ component: Component }) => {
  return (
    <>
      <Component />
    </>
  );
};

export default function SideNav() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
      }}
    >
      <Wrapper component={MainMenu} />
    </Drawer>
  );
}
