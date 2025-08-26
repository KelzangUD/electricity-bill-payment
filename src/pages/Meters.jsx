import { Box, Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataTable, Loader } from "../ui/index";
import { NewMeter, EditMeter } from "../components/index";
import { MetersColumns } from "../constants/columns";
import useMetersLogic from "../hooks/useMetersLogic";

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
  } = useMetersLogic();

  return (
    <>
      <Box
        sx={{
          paddingX: 4,
        }}
      >
        <Grid container spacing={2}>
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
    </>
  );
};

export default Meters;
