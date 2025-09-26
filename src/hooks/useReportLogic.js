import { useEffect, useState } from "react";
import Route from "../routes/Route";
import { dateFormatter } from "../util/CommonUtil";

const useReportLogic = () => {
  const access_token = localStorage.getItem("access_token");
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState([]);
  const [reportDetails, setReportDetails] = useState({
    fromDate: dateFormatter(new Date()),
    toDate: dateFormatter(new Date()),
    storeId: "ALL",
    storeName: "All",
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const fetchReport = async () => {
    setIsLoading(true);
    try {
      const response = await Route(
        "GET",
        `/api/v1/report?fromDate=${reportDetails?.fromDate}&toDate=${reportDetails?.toDate}&storeId=${reportDetails?.storeId}`,
        access_token,
        null,
        null
      );
      console.log(response);
      if (response?.status === 200) {
        setReport(
          response?.data?.map((item, index) => ({
            id: index,
            sl: index + 1,
            ...item,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line
  }, []);
  const fromDateHandle = (e) => {
    setReportDetails((prev) => ({
      ...prev,
      fromDate: dateFormatter(e?.$d),
    }));
  };
  const toDateHandle = (e) => {
    setReportDetails((prev) => ({
      ...prev,
      toDate: dateFormatter(e?.$d),
    }));
  };
  const regionHandle = (e, value) => {
    setReportDetails((prev) => ({
      ...prev,
      storeId: value?.id || "ALL",
      storeName: value?.label || "All",
    }));
  };

  return {
    isLoading,
    notificationMessage,
    severity,
    showNotification,
    setShowNotification,
    report,
    fetchReport,
    reportDetails,
    fromDateHandle,
    toDateHandle,
    regionHandle,
  };
};

export default useReportLogic;
