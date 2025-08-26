import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Slide,
  TextField,
} from "@mui/material";
import { useCommon } from "../contexts/CommonContext";
import useEditMeterLogic from "../hooks/useEditMeterLogic";
import { Notification, Loader } from "../ui/index";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditMeter({
  open,
  setOpen,
  fetchMeters,
  meterDetails,
}) {
  const { regions } = useCommon();

  const {
    newMeterDetails,
    onChangeHandler,
    updateHandler,
    helperText,
    isLoading,
    showNotification,
    setShowNotification,
    notificationMessage,
    severity,
  } = useEditMeterLogic(fetchMeters, meterDetails);
  return (
    <>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Update Meter Detail</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={6}>
              <TextField
                name="meterNo"
                variant="outlined"
                label="Meter No"
                size="small"
                required
                fullWidth
                value={newMeterDetails?.meterNo}
                onChange={onChangeHandler}
                error={helperText?.meterNo?.type === "error"}
                helperText={helperText?.meterNo?.message}
                FormHelperTextProps={{
                  sx: {
                    color:
                      helperText.meterNo.type === "error"
                        ? "error.main"
                        : helperText.meterNo.type === "success"
                        ? "success.main"
                        : "warning.main",
                  },
                }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                name="billingAddress"
                variant="outlined"
                label="Billing Address"
                size="small"
                fullWidth
                value={newMeterDetails?.meterName}
                onChange={onChangeHandler}
                error={helperText?.billingAddress?.type === "error"}
                helperText={helperText?.billingAddress?.message}
                FormHelperTextProps={{
                  sx: {
                    color:
                      helperText.billingAddress.type === "error"
                        ? "error.main"
                        : helperText.billingAddress.type === "success"
                        ? "success.main"
                        : "warning.main",
                  },
                }}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                name="regionId"
                select
                label="Region"
                fullWidth
                size="small"
                required
                value={newMeterDetails?.regionId || ""}
                onChange={onChangeHandler}
                error={helperText?.regionId?.type === "error"}
                helperText={helperText?.regionId?.message}
                FormHelperTextProps={{
                  sx: {
                    color:
                      helperText.regionId.type === "error"
                        ? "error.main"
                        : helperText.regionId.type === "success"
                        ? "success.main"
                        : "warning.main",
                  },
                }}
              >
                {regions?.map((region) => (
                  <MenuItem key={region?.id} value={region?.id}>
                    {region?.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <FormControl>
                <FormLabel id="status-group-label">Status</FormLabel>
                <RadioGroup
                  aria-labelledby="status-group-label"
                  name="status"
                  row
                  value={newMeterDetails?.status}
                  onChange={onChangeHandler}
                >
                  <FormControlLabel
                    value="Active"
                    control={<Radio />}
                    label="Active"
                  />
                  <FormControlLabel
                    value="Inactive"
                    control={<Radio />}
                    label="InActive"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 2 }}>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            size="small"
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={updateHandler}
            variant="contained"
            size="small"
            loading={isLoading}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {isLoading && <Loader open={isLoading} />}
      {showNotification && (
        <Notification
          open={showNotification}
          setOpen={() => {
            setShowNotification(false);
            setOpen(false);
          }}
          message={notificationMessage}
          severity={severity}
        />
      )}
    </>
  );
}
