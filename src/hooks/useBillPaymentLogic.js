import { useEffect, useState } from "react";
import Route from "../routes/Route";

const useBillPaymentLogic = () => {
  const access_token = localStorage.getItem("access_token");
  const username = localStorage.getItem("username");
  const [isLoading, setIsLoading] = useState(false);
  const [meters, setMeters] = useState([]);
  const [region, setRegion] = useState("ALL");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState({
    type: "include",
    ids: new Set(),
  });

  const regionChangeHandler = (event) => {
    setRegion(event?.target?.value);
  };
  const fetchMeters = async () => {
    setIsLoading(true);
    try {
      const response = await Route(
        "GET",
        `/api/v1/billpayment?region=${region}`,
        access_token,
        null,
        null
      );
      if (response?.status === 200) {
        setMeters(
          response?.data?.map((item, index) => ({
            id: item?.meterNo,
            sl: index + 1,
            ...item,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching meters:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const payAllHandle = async () => {
    setIsLoading(true);
    // console.log(...selectedRows);
    try {
      const response = await Route(
        "POST",
        `/api/v1/billpayment?meterNo=${selectedRows?.join(
          ","
        )}&createdBy=${username}`,
        access_token,
        null,
        null
      );
      console.log(response);
      if (response?.status === 200) {
        // setMeterDetails(response?.data);
        setSelectedRows([]);
        setRowSelectionModel((prev) => ({
          type: "include",
          ids: new Set(),
        }));
        fetchMeters();
        setNotificationMessage("Payment Successful!");
        setSeverity("success");
        setShowNotification(true);
      }
    } catch (err) {
      setNotificationMessage(err);
      setSeverity("error");
      setShowNotification(true);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMeters();
    // eslint-disable-next-line
  }, []);

  return {
    isLoading,
    meters,
    selectedRows,
    setSelectedRows,
    payAllHandle,
    showNotification,
    notificationMessage,
    severity,
    setShowNotification,
    rowSelectionModel,
    setRowSelectionModel,
    region,
    regionChangeHandler,
    fetchMeters,
  };
};

export default useBillPaymentLogic;
