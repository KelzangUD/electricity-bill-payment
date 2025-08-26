import { styled } from "@mui/material/styles";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import MainMenu from "./MainMenu";

const Drawer = styled(MuiDrawer)({
  width: 240,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: 240,
    boxSizing: "border-box",
    color: "#fff",
    backgroundColor: "#0277bd",
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
