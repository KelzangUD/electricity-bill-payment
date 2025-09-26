import React from "react";
import { Box, CardContent, Typography } from "@mui/material";

const StatusCard = ({ title, value, icon }) => {
  return (
    <Box
      sx={{
        width: "100%",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="caption" color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5">{value}</Typography>
        </Box>
        <Box>{icon}</Box>
      </CardContent>
    </Box>
  );
};

export default StatusCard;
