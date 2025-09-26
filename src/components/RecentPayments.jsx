import { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { DataTable } from "../ui/index";
import useDashboardLogic from "../hooks/useDashboardLogic";
import { RecentPaymentColumns } from "../constants/columns";

const RecentPayments = () => {
  const { recentPayments, fetchRecentPayments } = useDashboardLogic();
  useEffect(() => {
    fetchRecentPayments();
  }, []);

  return (
    <Box
      sx={{
        mt: 2,
        width: "100%",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Grid size={12} ml={4} mt={2}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Recent Payments
        </Typography>
      </Grid>
      <Grid size={12} sx={{ p: 2 }}>
        <DataTable
          columns={RecentPaymentColumns()}
          rows={recentPayments ?? []}
        />
      </Grid>
    </Box>
  );
};

export default RecentPayments;
