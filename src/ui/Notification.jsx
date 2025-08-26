import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Notification({
  open,
  setOpen,
  message,
  severity = "success",
}) {
  return (
    <>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="description"
        // fullWidth
      >
        <DialogContent>
          <DialogContentText
            id="description"
            sx={{ textAlign: "center", py: 1 }}
          >
            {severity === "error" ? (
              <CancelIcon sx={{ fontSize: 100, mb: 1 }} color={severity} />
            ) : (
              <CheckCircleIcon sx={{ fontSize: 100, mb: 1 }} color={severity} />
            )}

            <Typography variant="h6" color={severity}>
              {severity.toUpperCase()}!
            </Typography>
            <Typography variant="body2" sx={{ my: 1 }}>
              {message}
            </Typography>
            <Button
              variant="contained"
              onClick={() => setOpen(false)}
              size="medium"
              sx={{ mt: 2 }}
              color={severity}
            >
              Close
            </Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
