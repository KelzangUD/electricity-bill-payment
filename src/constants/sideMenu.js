import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PaymentIcon from "@mui/icons-material/Payment";
import ListIcon from "@mui/icons-material/List";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

export const MenuItems = [
  {
    module: "Dashboard",
    icon: (
      <DashboardIcon
        fontSize="small"
        sx={{
          color: "inherit",
          // ":hover": {
          //   color: "#0277bd",
          // },
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
          color: "#000",
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
    module: "Payment",
    icon: (
      <PaymentIcon
        fontSize="small"
        sx={{
          color: "#000",
        }}
      />
    ),
    itemNumber: 2,
    route: "/home/bill-payment",
    // nestedItems: [
    //   {
    //     page: "Bill Payment",
    //     route: "/home/bill-payment",
    //   },
    // ],
  },
  {
    module: "Report",
    icon: (
      <ListIcon
        fontSize="small"
        sx={{
          color: "#000",
        }}
      />
    ),
    route: "/home/report",
    // itemNumber: 1,
    // nestedItems: [
    //   {
    //     page: "",
    //     route: "/home/bill-payment",
    //   },
    // ],
  },
  {
    module: "Settings",
    icon: (
      <SettingsIcon
        fontSize="small"
        sx={{
          color: "#000",
        }}
      />
    ),
    itemNumber: 3,
    nestedItems: [
      {
        page: "System Users",
        route: "/home/users",
      },
    ],
  },
];
