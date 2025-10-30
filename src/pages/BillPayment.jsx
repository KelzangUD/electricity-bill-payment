import {
  Alert,
  Box,
  Button,
  Grid,
  MenuItem,
  Skeleton,
  TextField,
} from "@mui/material";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { DataTable, Loader, Notification } from "../ui/index";
import { BillPaymentColumns } from "../constants/columns";
import useBillPaymentLogic from "../hooks/useBillPaymentLogic";
import { useCommon } from "../contexts/CommonContext";

const BillPayment = () => {
  const { regions } = useCommon();
  const {
    isLoading,
    meters,
    selectedRows,
    setSelectedRows,
    payAllHandle,
    showNotification,
    notificationMessage,
    severity,
    setShowNotification,
    rowSelectionModel,
    setRowSelectionModel,
    region,
    regionChangeHandler,
    fetchMeters,
  } = useBillPaymentLogic();

  return (
    <>
      <Box
        sx={{
          paddingX: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <Alert severity="info">
              To pay for all meters, select the checkbox in the table header. To
              pay for specific meters, select the checkboxes for the
              corresponding rows.
            </Alert>
          </Grid>
          <Grid size={12}>
            {regions ? (
              <TextField
                key="region-select"
                name="regionId"
                select
                label="Region"
                size="small"
                sx={{ minWidth: 300, backgroundColor: "white" }}
                required
                value={region || ""}
                onChange={regionChangeHandler}
                SelectProps={{
                  MenuProps: { disablePortal: true },
                }}
              >
                <MenuItem value="ALL">ALL</MenuItem>
                {regions.map((r) => (
                  <MenuItem key={r.id} value={r.id}>
                    {r.name}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <Skeleton variant="rectangular" width={300} height={40} />
            )}
            <Button
              variant="contained"
              sx={{
                marginLeft: 2,
              }}
              onClick={fetchMeters}
            >
              Fetch
            </Button>
          </Grid>
          <Grid
            size={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              size="small"
              endIcon={<CreditScoreIcon />}
              disabled={selectedRows?.length > 0 ? false : true}
              loading={isLoading}
              onClick={payAllHandle}
            >
              Pay Now
            </Button>
          </Grid>
          <Grid size={12}>
            <DataTable
              columns={BillPaymentColumns()}
              rows={meters}
              loading={isLoading}
              checkboxSelection={true}
              selectedRows={selectedRows}
              onSelectionChange={setSelectedRows}
              rowSelectionModel={rowSelectionModel}
              setRowSelectionModel={setRowSelectionModel}
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

export default BillPayment;
