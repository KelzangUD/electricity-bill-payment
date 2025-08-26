import { useState } from "react";
import Route from "../routes/Route";

const useAddNewUserLogic = (fetchUsers) => {
  const access_token = localStorage.getItem("access_token");
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    fname: "",
    mname: "",
    lname: "",
    email: "",
    mobileNo: "",
    roleId: "",
    createdBy: localStorage.getItem("username"),
  });
  const [helperText, setHelperText] = useState({
    username: { message: "", type: "" },
    password: { message: "", type: "" },
    fname: { message: "", type: "" },
    email: { message: "", type: "" },
    mobileNo: { message: "", type: "" },
    password: { message: "", type: "" },
    roleId: { message: "", type: "" },
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [isLoading, setIsLoading] = useState(false);
  const onChangeHandler = (e) => {
    setHelperText({
      ...helperText,
      [e?.target?.name]: { message: "", type: "" },
    });
    setUserDetails({ ...userDetails, [e?.target?.name]: e?.target?.value });
  };
  const validation = () => {
    if (userDetails?.fname === "") {
      setHelperText({
        ...helperText,
        fname: { message: "First Name is required!", type: "info" },
      });
      return false;
    }
    if (userDetails?.email === "") {
      setHelperText({
        ...helperText,
        email: { message: "Email is required!", type: "info" },
      });
      return false;
    }
    if (userDetails?.username === "") {
      setHelperText({
        ...helperText,
        username: { message: "Emp ID is required!", type: "info" },
      });
      return false;
    }
    if (userDetails?.password === "") {
      setHelperText({
        ...helperText,
        password: { message: "Password is required!", type: "info" },
      });
      return false;
    }
    if (userDetails?.mobileNo === "") {
      setHelperText({
        ...helperText,
        mobileNo: { message: "Mobile No is required!", type: "info" },
      });
      return false;
    }
    if (userDetails?.roleId === "") {
      setHelperText({
        ...helperText,
        roleId: { message: "Role is required!", type: "info" },
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
          "/api/v1/mangement",
          access_token,
          userDetails,
          null
        );
        console.log(res);
        if (res?.status === 201) {
          setNotificationMessage("User created successfully!");
          setShowNotification(true);
          setSeverity("success");
          setUserDetails({
            username: "",
            password: "",
            fname: "",
            mname: "",
            lname: "",
            email: "",
            mobileNo: "",
            roleId: "",
            createdBy: localStorage.getItem("username"),
          });
          fetchUsers();
        }
      } catch (err) {
        setNotificationMessage("Failed To Create New User!");
        setSeverity("error");
        setShowNotification(true);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return {
    onChangeHandler,
    userDetails,
    helperText,
    isLoading,
    showNotification,
    setShowNotification,
    notificationMessage,
    createHandler,
    severity,
  };
};

export default useAddNewUserLogic;
