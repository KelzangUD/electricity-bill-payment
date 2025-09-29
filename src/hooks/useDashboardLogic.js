import { useState, useEffect, useCallback, useRef } from "react";
import Route from "../routes/Route";
import { transformMonthlyData } from "../util/CommonUtil";

export default function useDashboardLogic() {
  const [count, setCount] = useState({
    meterCount: null,
    totalPayment: null,
    unPaidMeterCount: null,
    avgPaymentAmt: null,
    meterNo: null,
    transDate: null,
    status: null,
    amount: null,
  });
  const [recentPayments, setRecentPayments] = useState([]);
  const [monthlyBillPayments, setMonthlyBillPayments] = useState([]);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const fetchCount = useCallback(async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken || accessToken === "") {
      return;
    }
    try {
      const res = await Route(
        "GET",
        "/api/v1/dashboard/count",
        accessToken,
        null,
        null
      );
      if (res?.status === 200) {
        setCount({
          meterCount: res?.data?.meterCount,
          totalPayment: res?.data?.totalPayment,
          unPaidMeterCount: res?.data?.unPaidMeterCount,
          avgPaymentAmt: res?.data?.avgPaymentAmt,
          meterNo: res?.data?.meterNo,
          transDate: res?.data?.transDate,
          status: res?.data?.status,
          amount: res?.data?.amount,
        });
      } else {
        console.log("API call failed with status:", res?.status);
      }
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  }, []);

  const fetchRecentPayments = useCallback(async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken || accessToken === "") {
      return;
    }
    try {
      const res = await Route(
        "GET",
        "/api/v1/dashboard/recentPayment",
        accessToken,
        null,
        null
      );
      if (res?.status === 200) {
        setRecentPayments(
          res?.data?.map((item, index) => ({
            id: index,
            sl: index + 1,
            meterNo: item?.meterNo,
            amount: item?.amount,
            transDate: item?.transDate,
            status: item?.status,
          }))
        );
      } else {
        console.log("API call failed with status:", res?.status);
      }
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  }, []);
  const fetchYears = useCallback(async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken || accessToken === "") {
      return;
    }
    try {
      const res = await Route(
        "GET",
        "/api/v1/dashboard/fetchYear",
        accessToken,
        null,
        null
      );
      if (res?.status === 200) {
        setYears(
          res?.data?.map((item) => ({
            id: item?.year,
            label: item?.year,
          }))
        );
      } else {
        console.log("API call failed with status:", res?.status);
      }
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  }, []);
  const fetchMonthlyPayment = useCallback(async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken || accessToken === "") {
      return;
    }
    try {
      const res = await Route(
        "GET",
        `/api/v1/dashboard/monthlyBillPayment/${year}`,
        accessToken,
        null,
        null
      );
      if (res?.status === 200) {
        setMonthlyBillPayments(transformMonthlyData(res?.data));
      } else {
        console.log("API call failed with status:", res?.status);
      }
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  }, []);

  useEffect(() => {
    fetchMonthlyPayment();
  }, [year]);

  return {
    count,
    recentPayments,
    monthlyBillPayments,
    years,
    year,
    setYear,
    fetchCount,
    fetchRecentPayments,
    recentPayments,
    fetchYears,
  };
}
