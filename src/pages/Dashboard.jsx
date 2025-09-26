import { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import ElectricMeterIcon from "@mui/icons-material/ElectricMeter";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import useDashboardLogic from "../hooks/useDashboardLogic";
import { StatusCard } from "../ui/index";
import { RecentPayments, MonthlyPayment } from "../components/index";

const Dashboard = () => {
  const { fetchCount, count } = useDashboardLogic();
  useEffect(() => {
    fetchCount();
  }, []);
  return (
    <Box
      sx={{
        paddingX: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <StatusCard
            title="Total Meters"
            value={count?.meterCount || 0}
            icon={
              <ElectricMeterIcon
                sx={{
                  width: "auto",
                  height: 30,
                }}
              />
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <StatusCard
            title="Total Payment"
            value={count?.totalPayment || 0}
            icon={
              <CreditScoreIcon
                sx={{
                  width: "auto",
                  height: 30,
                }}
              />
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <StatusCard
            title="Un-Paid Meter"
            value={count?.unPaidMeterCount || 0}
            icon={
              <PaymentsIcon
                sx={{
                  width: "auto",
                  height: 30,
                }}
              />
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <StatusCard
            title="Average Payment"
            value={count?.avgPaymentAmt || 0}
            icon={
              <CreditCardIcon
                sx={{
                  width: "auto",
                  height: 30,
                }}
              />
            }
          />
        </Grid>
      </Grid>
      <Grid container>
        <RecentPayments />
      </Grid>
      <Grid container>
        <MonthlyPayment />
      </Grid>
    </Box>
  );
};

export default Dashboard;
