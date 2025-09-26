import { use, useEffect } from "react";
import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import {
  AreaChart,
  Area,
  CartesianGrid,
  // Line,
  // LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useDashboardLogic from "../hooks/useDashboardLogic";

export default function MonthlyPayment() {
  const { fetchYears, years, year, setYear, monthlyBillPayments } =
    useDashboardLogic();
  useEffect(() => {
    fetchYears();
  }, []);
  return (
    <Box
      sx={{
        my: 2,
        width: "100%",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Grid size={12} ml={4} mt={2}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Monthly Bill Payment
        </Typography>
      </Grid>
      <Grid
        size={12}
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Grid size={{ xs: 12, md: 2 }} sx={{ alignItems: "center", mr: 2 }}>
          <Autocomplete
            disablePortal
            options={years}
            size="small"
            value={year}
            onChange={(event, newValue) => {
              setYear(newValue?.id);
            }}
            renderInput={(params) => <TextField {...params} label="Year" />}
          />
        </Grid>
      </Grid>
      {/* <Grid size={12}>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={500}
            height={200}
            data={monthlyBillPayments}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              connectNulls
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>
      </Grid> */}
      <Grid size={12} sx={{ mb: 2 }}>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            width={500}
            height={400}
            data={monthlyBillPayments}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#67C090"
              fill="#DDF4E7"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Grid>
    </Box>
  );
}
