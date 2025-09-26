import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import { RenderStatus } from "../ui/index";

export const UsersColumns = (fetchDetails) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  return [
    { field: "sl", headerName: "Sl. No", width: 70 },
    {
      field: "userName",
      headerName: "User Name",
      flex: isMdUp ? 2 : undefined,
      width: isMdUp ? undefined : 250,
    },
    {
      field: "user_code",
      headerName: "Emp ID",
      flex: isMdUp ? 1 : undefined,
      width: isMdUp ? undefined : 100,
    },
    {
      field: "email",
      headerName: "Email",
      flex: isMdUp ? 2 : undefined,
      width: isMdUp ? undefined : 250,
    },
    {
      field: "mobile_no",
      headerName: "Mobile No.",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 150,
    },
    {
      field: "role_name",
      headerName: "Role Name",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 150,
    },
    {
      field: "action",
      headerName: "Action",
      flex: isMdUp ? 0.5 : undefined,
      width: isMdUp ? undefined : 100,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => fetchDetails(params?.row?.user_code)}
            color="primary"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
};

export const MetersColumns = (fetchDetails) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  return [
    { field: "sl", headerName: "Sl. No", width: 70 },
    {
      field: "meterName",
      headerName: "Meter Name",
      flex: isMdUp ? 2 : undefined,
      width: isMdUp ? undefined : 250,
    },
    {
      field: "meterNo",
      headerName: "Meter No",
      flex: isMdUp ? 1 : undefined,
      width: isMdUp ? undefined : 100,
    },
    {
      field: "region_name",
      headerName: "Region",
      flex: isMdUp ? 2 : undefined,
      width: isMdUp ? undefined : 250,
    },
    {
      field: "status",
      headerName: "Status",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 150,
      renderCell: (params) => <RenderStatus status={params?.row?.status} />,
    },
    {
      field: "action",
      headerName: "Action",
      flex: isMdUp ? 0.5 : undefined,
      width: isMdUp ? undefined : 100,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => fetchDetails(params?.row?.meterId)}
            color="primary"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
};

// ============================================= Bill Payment ===========================================
export const BillPaymentColumns = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  return [
    { field: "sl", headerName: "Sl. No", width: 70 },
    {
      field: "meterName",
      headerName: "Meter Name",
      flex: isMdUp ? 2 : undefined,
      width: isMdUp ? undefined : 250,
    },
    {
      field: "meterNo",
      headerName: "Meter No",
      flex: isMdUp ? 1 : undefined,
      width: isMdUp ? undefined : 120,
    },
    {
      field: "region_name",
      headerName: "Region",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 250,
    },
    {
      field: "outstandingAmt",
      headerName: "Outstanding",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 150,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      flex: isMdUp ? 5.5 : undefined,
      width: isMdUp ? undefined : 650,
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   flex: isMdUp ? 1 : undefined,
    //   width: isMdUp ? undefined : 100,
    //   align: "right",
    //   headerAlign: "right",
    //   renderCell: (params) => (
    //     <>
    //       <IconButton
    //         aria-label="edit"
    //         size="small"
    //         onClick={() => fetchDetails(params?.row?.meterId)}
    //         color="primary"
    //       >
    //         <AddCardIcon fontSize="inherit" />
    //       </IconButton>
    //     </>
    //   ),
    // },
  ];
};

// ============================================= Report Header ===========================================
export const ReportColumns = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  return [
    { field: "sl", headerName: "Sl. No", width: 70 },
    {
      field: "meterNo",
      headerName: "Meter Number",
      flex: isMdUp ? 2 : undefined,
      width: isMdUp ? undefined : 250,
    },
    {
      field: "regionName",
      headerName: "Region",
      flex: isMdUp ? 1 : undefined,
      width: isMdUp ? undefined : 120,
    },
    {
      field: "amt",
      headerName: "Amount(Nu.)",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 250,
    },
    {
      field: "transactionId",
      headerName: "Transaction ID",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 150,
    },
    {
      field: "transactionDate",
      headerName: "Transaction Date",
      flex: isMdUp ? 3.5 : undefined,
      width: isMdUp ? undefined : 350,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 150,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 150,
    },
  ];
};

// ============================================= Recent Payment ===========================================
export const RecentPaymentColumns = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  return [
    { field: "sl", headerName: "Sl. No", width: 70 },
    {
      field: "meterNo",
      headerName: "Meter Number",
      flex: isMdUp ? 2 : undefined,
      width: isMdUp ? undefined : 250,
    },
    {
      field: "amount",
      headerName: "Amount(Nu.)",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 150,
    },
    {
      field: "transDate",
      headerName: "Transaction Date",
      flex: isMdUp ? 3.5 : undefined,
      width: isMdUp ? undefined : 350,
    },
    {
      field: "status",
      headerName: "Status",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 150,
      renderCell: (params) => <RenderStatus status={params?.row?.status} />,
    },
  ];
};
