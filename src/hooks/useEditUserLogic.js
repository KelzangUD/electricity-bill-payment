import { useState } from "react";
import Route from "../routes/Route";

const useEditUserLogic = (fetchUsers, userDetails) => {
  const access_token = localStorage.getItem("access_token");
  const [newUserDetails, setNewUserDetails] = useState({
    fname: userDetails?.fname || "",
    mname: userDetails?.mname || "",
    lname: userDetails?.lname || "",
    mobileNo: userDetails?.mobile_no || "",
    email: userDetails?.email || "",
    roleId: userDetails?.role_id || "",
    updatedBy: localStorage.getItem("username"),
    userId: userDetails?.user_id || "",
    user_code: userDetails?.user_code || "",
    empl_id: parseInt(userDetails?.empl_id) || "",
    user_id: userDetails?.user_id || "",
  });
  const [helperText, setHelperText] = useState({
    fname: { message: "", type: "" },
    mobileNo: { message: "", type: "" },
    email: { message: "", type: "" },
    roleId: { message: "", type: "" },
    user_code: { message: "", type: "" },
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
    setNewUserDetails({
      ...newUserDetails,
      [e?.target?.name]: e?.target?.value,
    });
  };
  const validation = () => {
    if (newUserDetails?.fname === "") {
      setHelperText({
        ...helperText,
        fname: { message: "First Name is required!", type: "info" },
      });
      return false;
    }
    if (newUserDetails?.mobileNo === "") {
      setHelperText({
        ...helperText,
        mobileNo: {
          message: "Mobile No is required!",
          type: "info",
        },
      });
      return false;
    }
    if (newUserDetails?.email === "") {
      setHelperText({
        ...helperText,
        email: { message: "Email ID is required!", type: "info" },
      });
      return false;
    }
    if (newUserDetails?.empId === "") {
      setHelperText({
        ...helperText,
        status: { message: "Username (Emp ID) is required!", type: "info" },
      });
      return false;
    }
    if (newUserDetails?.roleId === "") {
      setHelperText({
        ...helperText,
        status: { message: "Role is required!", type: "info" },
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
          `/api/v1/management?fname=${newUserDetails?.fname}&mname=${newUserDetails?.mname}&lname=${newUserDetails?.lname}&mobileNo=${newUserDetails?.mobileNo}&email=${newUserDetails?.email}&status=Active&roleId=${newUserDetails?.roleId}&updatedBy=${newUserDetails?.updatedBy}&userId=${newUserDetails?.userId}&userCode=${newUserDetails?.user_code}&empId=${newUserDetails?.empl_id}`,
          access_token,
          null,
          null
        );
        if (res?.status === 200) {
          setNotificationMessage("User Details Updated Successfully!");
          setShowNotification(true);
          setSeverity("success");
          setNewUserDetails({
            fname: "",
            mname: "",
            lname: "",
            mobileNo: "",
            email: "",
            roleId: "",
            updatedBy: localStorage.getItem("username"),
            userId: "",
            user_code: "",
          });
          fetchUsers();
        }
      } catch (err) {
        setNotificationMessage("Failed To Update User Details!");
        setSeverity("error");
        setShowNotification(true);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return {
    newUserDetails,
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

export default useEditUserLogic;
