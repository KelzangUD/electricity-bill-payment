import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

export const MenuItems = [
  {
    module: "Dashboard",
    icon: (
      <DashboardIcon
        fontSize="small"
        sx={{
          color: "#eee",
        }}
      />
    ),
    route: "/home",
  },
  {
    module: "Master",
    icon: (
      <AppRegistrationIcon
        fontSize="small"
        sx={{
          color: "#eee",
        }}
      />
    ),
    itemNumber: 1,
    nestedItems: [
      {
        page: "Meters",
        route: "/home/meters",
      },
    ],
  },
  {
    module: "Settings",
    icon: (
      <SettingsIcon
        fontSize="small"
        sx={{
          color: "#eee",
        }}
      />
    ),
    itemNumber: 2,
    nestedItems: [
      {
        page: "System Users",
        route: "/home/users",
      },
    ],
  },
];
