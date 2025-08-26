import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Slide,
  TextField,
} from "@mui/material";
import { useCommon } from "../contexts/CommonContext";
import useAddNewUserLogic from "../hooks/useAddNewUserLogic";
import { Notification, Loader } from "../ui/index";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewUser({ open, setOpen, fetchUsers }) {
  const { roles } = useCommon();
  const {
    onChangeHandler,
    userDetails,
    createHandler,
    helperText,
    isLoading,
    showNotification,
    setShowNotification,
    notificationMessage,
    severity,
  } = useAddNewUserLogic(fetchUsers);
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
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={4}>
              <TextField
                name="fname"
                variant="outlined"
                label="First Name"
                size="small"
                required
                value={userDetails?.fname}
                onChange={onChangeHandler}
                error={helperText?.fname?.type === "error"}
                helperText={helperText?.fname?.message}
                FormHelperTextProps={{
                  sx: {
                    color:
                      helperText.fname.type === "error"
                        ? "error.main"
                        : helperText.fname.type === "success"
                        ? "success.main"
                        : "warning.main",
                  },
                }}
              />
            </Grid>
            <Grid size={4}>
              <TextField
                name="mname"
                variant="outlined"
                label="Middle Name"
                size="small"
                value={userDetails?.mname}
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid size={4}>
              <TextField
                name="lname"
                variant="outlined"
                label="Last Name"
                size="small"
                value={userDetails?.lname}
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                name="email"
                variant="outlined"
                label="Email"
                size="small"
                fullWidth
                required
                value={userDetails?.email}
                onChange={onChangeHandler}
                error={helperText?.email?.type === "error"}
                helperText={helperText?.email?.message}
                FormHelperTextProps={{
                  sx: {
                    color:
                      helperText.email.type === "error"
                        ? "error.main"
                        : helperText.email.type === "success"
                        ? "success.main"
                        : "warning.main",
                  },
                }}
              />
            </Grid>
            <Grid size={4}>
              <TextField
                name="username"
                variant="outlined"
                label="Emp ID"
                size="small"
                required
                value={userDetails?.username}
                onChange={onChangeHandler}
                error={helperText?.username?.type === "error"}
                helperText={helperText?.username?.message}
                FormHelperTextProps={{
                  sx: {
                    color:
                      helperText.username.type === "error"
                        ? "error.main"
                        : helperText.username.type === "success"
                        ? "success.main"
                        : "warning.main",
                  },
                }}
              />
            </Grid>
            <Grid size={4}>
              <TextField
                name="password"
                variant="outlined"
                label="Password"
                size="small"
                required
                value={userDetails?.password}
                onChange={onChangeHandler}
                error={helperText?.password?.type === "error"}
                helperText={helperText?.password?.message}
                FormHelperTextProps={{
                  sx: {
                    color:
                      helperText.password.type === "error"
                        ? "error.main"
                        : helperText.password.type === "success"
                        ? "success.main"
                        : "warning.main",
                  },
                }}
              />
            </Grid>
            <Grid size={4}>
              <TextField
                name="mobileNo"
                variant="outlined"
                label="Mobile No"
                size="small"
                required
                value={userDetails?.mobileNo}
                onChange={onChangeHandler}
                error={helperText?.mobileNo?.type === "error"}
                helperText={helperText?.mobileNo?.message}
                FormHelperTextProps={{
                  sx: {
                    color:
                      helperText.mobileNo.type === "error"
                        ? "error.main"
                        : helperText.mobileNo.type === "success"
                        ? "success.main"
                        : "warning.main",
                  },
                }}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                name="roleId"
                select
                label="Role"
                fullWidth
                size="small"
                required
                value={userDetails?.roleId}
                onChange={onChangeHandler}
                error={helperText?.roleId?.type === "error"}
                helperText={helperText?.roleId?.message}
                FormHelperTextProps={{
                  sx: {
                    color:
                      helperText.roleId.type === "error"
                        ? "error.main"
                        : helperText.roleId.type === "success"
                        ? "success.main"
                        : "warning.main",
                  },
                }}
              >
                {roles?.map((role) => (
                  <MenuItem key={role?.id} value={role?.id}>
                    {role?.name}
                  </MenuItem>
                ))}
              </TextField>
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
          <Button onClick={createHandler} variant="contained" size="small">
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
