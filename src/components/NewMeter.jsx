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
import useAddNewMeterLogic from "../hooks/useAddNewMeterLogic";
import { Notification, Loader } from "../ui/index";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewMeter({ open, setOpen, fetchMeters }) {
  const { regions } = useCommon();
  const {
    meterDetails,
    onChangeHandler,
    createHandler,
    helperText,
    isLoading,
    showNotification,
    setShowNotification,
    notificationMessage,
    severity,
  } = useAddNewMeterLogic(fetchMeters);
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
        <DialogTitle>Add New Meter</DialogTitle>
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
                value={meterDetails?.meterNo}
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
                value={meterDetails?.billingAddress}
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
                value={meterDetails?.regionId || ""}
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
                  value={meterDetails?.status}
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
          <Button onClick={createHandler} variant="contained" size="small" loading={isLoading}>
            Create
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
