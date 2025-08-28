import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Route from "../routes/Route";
import { jwtDecode } from "jwt-decode";

export default function useSignInLogic() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [helperText, setHelperText] = useState({
    username: {
      message: "",
      type: "",
    },
    password: {
      message: "",
      type: "",
    },
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setHelperText({
      ...helperText,
      [e?.target?.name]: { message: "", type: "" },
    });
    setUserDetails({ ...userDetails, [e?.target?.name]: e?.target?.value });
  };
  const handleSubmit = async () => {
    if (userDetails?.username === "" && userDetails?.password === "") {
      if (userDetails?.username === "") {
        setHelperText({
          ...helperText,
          username: { message: "Username is required!", type: "info" },
        });
        return;
      }
      if (userDetails?.password === "") {
        setHelperText({
          ...helperText,
          password: { message: "Password is required!", type: "info" },
        });
        return;
      }
    } else {
      setIsLoading(true);
      try {
        const res = await Route(
          "POST",
          "/api/v1/auth/authenticate",
          null,
          userDetails,
          null
        );
        if (res?.status === 200) {
          const decoded = jwtDecode(res?.data?.access_token);
          if (decoded) {
            localStorage.setItem("access_token", res?.data?.access_token);
            localStorage.setItem("refresh_token", res?.data?.refresh_token);
            localStorage.setItem("username", decoded?.username);
            localStorage.setItem("role", decoded?.roles[1]);
            navigate("/home");
          }
        }
        if (res?.status === 403) {
          setSeverity("error");
          setNotificationMessage(
            "Failed To Sign In. Please use correct credential!"
          );
          setShowNotification(true);
        }
      } catch (error) {
        // console.error("Error during sign-in:", error);
        setSeverity("error");
        setNotificationMessage("Failed To Sign In.");
        setShowNotification(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    userDetails,
    helperText,
    handleChange,
    handleSubmit,
    isLoading,
    showNotification,
    setShowNotification,
    notificationMessage,
    severity
  };
}
