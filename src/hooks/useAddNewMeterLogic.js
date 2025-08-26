import { useState } from "react";
import Route from "../routes/Route";

const useAddNewMeterLogic = (fetchMeters) => {
  const access_token = localStorage.getItem("access_token");
  const [meterDetails, setMeterDetails] = useState({
    meterNo: "",
    billingAddress: "",
    createdBy: localStorage.getItem("username"),
    regionId: "",
    status: "Inactive",
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
    setMeterDetails({ ...meterDetails, [e?.target?.name]: e?.target?.value });
  };
  const validation = () => {
    if (meterDetails?.meterNo === "") {
      setHelperText({
        ...helperText,
        meterNo: { message: "Meter No is required!", type: "info" },
      });
      return false;
    }
    if (meterDetails?.billingAddress === "") {
      setHelperText({
        ...helperText,
        billingAddress: {
          message: "Billing Address is required!",
          type: "info",
        },
      });
      return false;
    }
    if (meterDetails?.regionId === "") {
      setHelperText({
        ...helperText,
        regionId: { message: "Region is required!", type: "info" },
      });
      return false;
    }
    if (meterDetails?.status === "") {
      setHelperText({
        ...helperText,
        status: { message: "Status is required!", type: "info" },
      });
      return false;
    }
    return true;
  };
  const createHandler = async () => {
    if (validation()) {
      setIsLoading(true);
      try {
        const res = await Route(
          "POST",
          "/api/v1/meter",
          access_token,
          meterDetails,
          null
        );
        console.log(res);
        if (res?.status === 201) {
          setNotificationMessage("New Meter created successfully!");
          setShowNotification(true);
          setSeverity("success");
          setMeterDetails({
            meterNo: "",
            billingAddress: "",
            createdBy: localStorage.getItem("username"),
            regionId: "",
            status: "Inactive",
          });
          fetchMeters();
        }
      } catch (err) {
        setNotificationMessage("Failed To Create New Meter!");
        setSeverity("error");
        setShowNotification(true);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return {
    meterDetails,
    onChangeHandler,
    helperText,
    isLoading,
    showNotification,
    setShowNotification,
    notificationMessage,
    createHandler,
    severity,
  };
};

export default useAddNewMeterLogic;
