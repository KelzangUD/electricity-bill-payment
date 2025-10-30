import { Box, Button, Grid, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from "@mui/icons-material/Add";
import { DataTable, Loader, Notification } from "../ui/index";
import { NewMeter, EditMeter } from "../components/index";
import { MetersColumns } from "../constants/columns";
import useMetersLogic from "../hooks/useMetersLogic";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Meters = () => {
  const {
    isLoading,
    meters,
    addNew,
    setAddNew,
    fetchMeters,
    fetchDetails,
    edit,
    setEdit,
    meterDetails,
    bulkUploadHandler,
    showNotification,
    setShowNotification,
    notificationMessage,
    severity,
    fileInputRef,
    clearFile,
    selectedFile,
  } = useMetersLogic();

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
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              color="success"
              startIcon={<CloudUploadIcon />}
              size="small"
            >
              {selectedFile === null ? "Upload files" : "Filed Uploaded"}
              <VisuallyHiddenInput
                type="file"
                onChange={bulkUploadHandler}
                accept=".xlsx, .xls, .csv"
                ref={fileInputRef}
              />
            </Button>
            <Button
              variant="contained"
              size="small"
              endIcon={<AddIcon />}
              onClick={() => setAddNew(true)}
            >
              New Meter
            </Button>
          </Grid>
          <Grid size={12}>
            <DataTable
              columns={MetersColumns(fetchDetails)}
              rows={meters}
              loading={isLoading}
            />
          </Grid>
        </Grid>
      </Box>
      {addNew && (
        <NewMeter open={addNew} setOpen={setAddNew} fetchMeters={fetchMeters} />
      )}
      {edit && (
        <EditMeter
          open={edit}
          setOpen={setEdit}
          fetchMeters={fetchMeters}
          meterDetails={meterDetails}
        />
      )}
      {isLoading && <Loader open={isLoading} />}
      {showNotification && (
        <Notification
          open={showNotification}
          setOpen={() => {
            setShowNotification(false);
            if (fileInputRef !== "") {
              clearFile();
            }
          }}
          message={notificationMessage}
          severity={severity}
        />
      )}
    </>
  );
};

export default Meters;
