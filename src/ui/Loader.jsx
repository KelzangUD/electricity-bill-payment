import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Loader = ({ open, message = "Processing your request..." }) => {
  return (
    <Dialog
      open={open}
      fullWidth
    >
      <DialogContent sx={{ my: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <CircularProgress color="primary" size={80} />
          <Typography variant="body2" sx={{ mt: 6 }}>
            {message}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Loader;
