import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { DataTable, Loader, Notification } from "../ui/index";
import { ReportColumns } from "../constants/columns";
import useReportLogic from "../hooks/useReportLogic";
import { useCommon } from "../contexts/CommonContext";

const Report = () => {
  const {
    isLoading,
    notificationMessage,
    severity,
    showNotification,
    setShowNotification,
    report,
    fetchReport,
    reportDetails,
    fromDateHandle,
    toDateHandle,
    regionHandle,
  } = useReportLogic();
  const { regions } = useCommon();
  return (
    <>
      <Box
        sx={{
          paddingX: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid
            size={12}
            container
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="From Date"
                    slotProps={{ textField: { size: "small" } }}
                    sx={{ backgroundColor: "#fff", width: "100%" }}
                    value={dayjs(reportDetails?.fromDate)}
                    onChange={fromDateHandle}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="To Date"
                    slotProps={{ textField: { size: "small" } }}
                    sx={{
                      backgroundColor: "#fff",
                      width: "100%",
                    }}
                    value={dayjs(reportDetails?.toDate)}
                    onChange={toDateHandle}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Autocomplete
                disablePortal
                options={[
                  { label: "All", id: "ALL" },
                  ...(regions?.map((item) => ({
                    label: item?.name,
                    id: item?.id,
                  })) || []),
                ]}
                size="small"
                sx={{
                  backgroundColor: "#fff",
                  mt: 1,
                }}
                onChange={regionHandle}
                value={reportDetails?.storeName || "All"}
                renderInput={(params) => (
                  <TextField {...params} label="Region" />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Button
                variant="contained"
                size="small"
                sx={{
                  mt: 1,
                }}
                onClick={fetchReport}
              >
                Search
              </Button>
            </Grid>
          </Grid>
          <Grid size={12}>
            <DataTable
              columns={ReportColumns()}
              rows={report}
              loading={isLoading}
            />
          </Grid>
        </Grid>
      </Box>
      {isLoading && <Loader open={isLoading} />}
      {showNotification && (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={notificationMessage}
          severity={severity}
        />
      )}
    </>
  );
};

export default Report;
