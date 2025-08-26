import { useState } from "react";
import Route from "../routes/Route";

const useEditMeterLogic = (fetchMeters, meterDetails) => {
  const access_token = localStorage.getItem("access_token");
  const [newMeterDetails, setNewMeterDetails] = useState({
    meterNo: meterDetails?.meterNo || "",
    meterName: meterDetails?.meterName || "",
    createdBy: localStorage.getItem("username"),
    regionId: meterDetails?.regionId || "",
    status: meterDetails?.status || "Inactive",
    meterId: meterDetails?.meterId || "",
  });
  const [helperText, setHelperText] = useState({
    meterNo: { message: "", type: "" },
    billingAddress: { message: "", type: "" },
    regionId: { message: "", type: "" },
    status: { message: "", type: "" },
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [severity, setSeverity] = useState("success");
  const onChangeHandler = (e) => {
    setHelperText({
      ...helperText,
      [e?.target?.name]: { message: "", type: "" },
    });
    setNewMeterDetails({
      ...newMeterDetails,
      [e?.target?.name]: e?.target?.value,
    });
  };
  const validation = () => {
    if (newMeterDetails?.meterNo === "") {
      setHelperText({
        ...helperText,
        meterNo: { message: "Meter No is required!", type: "info" },
      });
      return false;
    }
    if (newMeterDetails?.billingAddress === "") {
      setHelperText({
        ...helperText,
        billingAddress: {
          message: "Billing Address is required!",
          type: "info",
        },
      });
      return false;
    }
    if (newMeterDetails?.regionId === "") {
      setHelperText({
        ...helperText,
        regionId: { message: "Region is required!", type: "info" },
      });
      return false;
    }
    if (newMeterDetails?.status === "") {
      setHelperText({
        ...helperText,
        status: { message: "Status is required!", type: "info" },
      });
      return false;
    }
    return true;
  };
  const updateHandler = async () => {
    if (validation()) {
      setIsLoading(true);
      try {
        const res = await Route(
          "PUT",
          "/api/v1/meter",
          access_token,
          newMeterDetails,
          null
        );
        console.log(res);
        if (res?.status === 201) {
          setNotificationMessage("Meter Details Updated Successfully!");
          setShowNotification(true);
          setSeverity("success");
          newMeterDetails({
            meterNo: "",
            billingAddress: "",
            createdBy: localStorage.getItem("username"),
            regionId: "",
            status: "Inactive",
            meterId: "",
          });
          fetchMeters();
        }
      } catch (err) {
        setNotificationMessage("Failed To Update Meter Details!");
        setSeverity("error");
        setShowNotification(true);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return {
    newMeterDetails,
    onChangeHandler,
    helperText,
    isLoading,
    showNotification,
    setShowNotification,
    notificationMessage,
    updateHandler,
    severity,
  };
};

export default useEditMeterLogic;
