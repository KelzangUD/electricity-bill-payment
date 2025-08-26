import { useEffect, useState } from "react";
import Route from "../routes/Route";

const useMetersLogic = () => {
  const access_token = localStorage.getItem("access_token");
  const [isLoading, setIsLoading] = useState(false);
  const [meters, setMeters] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [meterDetails, setMeterDetails] = useState({
    regionId: "",
    meterNo: "",
    status: "",
    meterId: "",
    region_name: "",
    meterName: "",
  });
  const fetchMeters = async () => {
    setIsLoading(true);
    try {
      const response = await Route(
        "GET",
        "/api/v1/meter",
        access_token,
        null,
        null
      );
      if (response?.status === 200) {
        console.log(response?.data);
        setMeters(
          response?.data?.map((item, index) => ({
            id: item?.meterId,
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
  const fetchDetails = async (meterId) => {
    console.log(meterId);
    setIsLoading(true);
    try {
      const response = await Route(
        "GET",
        `/api/v1/meter/getMeterDtls/${meterId}`,
        access_token,
        null,
        null
      );
      if (response?.status === 200) {
        console.log(response?.data);
        setMeterDetails(response?.data);
        setEdit(true);
      }
    } catch (err) {
      setNotificationMessage("Failed To Fetch Meter Details!");
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
    addNew,
    setAddNew,
    fetchMeters,
    edit,
    setEdit,
    meterDetails,
    notificationMessage,
    severity,
    showNotification,
    setShowNotification,
    fetchDetails,
  };
};

export default useMetersLogic;
