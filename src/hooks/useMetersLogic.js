import { useEffect, useState, useRef } from "react";
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
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
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
        setMeterDetails(response?.data);
        setEdit(true);
      }
    } catch (err) {
      setNotificationMessage("Failed To Fetch Meter Details!");
      setSeverity("error");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };
  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const bulkUploadHandler = async (e) => {
    setIsLoading(true);
    try {
      let data = new FormData();
      setSelectedFile(e?.target?.files[0]);
      data.append("File", e?.target?.files[0]);
      data.append("createdBy", localStorage.getItem("username"));
      const res = await Route(
        "POST",
        `/api/v1/meter/uploadMeter`,
        access_token,
        data,
        null,
        "multipart/form-data"
      );
      if (res?.status === 201) {
        setNotificationMessage("Bulk Upload Successful!");
        setSeverity("success");
        setShowNotification(true);
        fetchMeters();
      }
      if (res?.status === 400) {
        // console.log("response 400 " + res);
        setNotificationMessage("Failed to upload meter details! Try again");
        setSeverity("error");
        setShowNotification(true);
      }
      if (res?.status === 409) {
        // console.log("response 409 " + res);
        setNotificationMessage(
          "Duplicate consumer no. found. Verify the consumer no, try again!"
        );
        setSeverity("error");
        setShowNotification(true);
      }
      if (res?.status === 500) {
        // console.log("response 500 " + res);
        setNotificationMessage("Failed to upload meter details! Try again");
        setSeverity("error");
        setShowNotification(true);
      }
    } catch (error) {
      setNotificationMessage("Error", error);
      setSeverity("error");
      setShowNotification(true);
    } finally {
      clearFile();
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
    bulkUploadHandler,
    fileInputRef,
    clearFile,
    selectedFile,
  };
};

export default useMetersLogic;
