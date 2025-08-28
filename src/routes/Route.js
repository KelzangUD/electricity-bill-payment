import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const Route = async (
  method,
  endpoint,
  token,
  data,
  id,
  contentType = "application/json"
) => {
  const headers = {
    "Content-Type": contentType,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const requestOptions = {
    method,
    headers,
  };
  // Handle JSON or FormData content types
  if (contentType === "application/json") {
    requestOptions.data = JSON.stringify(data);
  } else if (contentType === "multipart/form-data") {
    requestOptions.data = data;
  } else {
    requestOptions.data = data;
  }

  // try {
  //   if (id !== null) {
  //     const response = await axios(
  //       `${apiUrl}${endpoint}/${id}`,
  //       requestOptions
  //     );
  //     return response;
  //   } else {
  //     const response = await axios(`${apiUrl}${endpoint}`, requestOptions);
  //     return response;
  //   }
  // } catch (error) {
  //   if (error?.response?.status === 403) {
  //     window?.location?.replace("/");
  //     return;
  //   } else {
  //     return error;
  //   }
  // }
  const makeRequest = async () => {
    try {
      if (id !== null) {
        const response = await axios(
          `${apiUrl}${endpoint}/${id}`,
          requestOptions
        );
        return response;
      } else {
        const response = await axios(`${apiUrl}${endpoint}`, requestOptions);
        return response;
      }
    } catch (error) {
      if (error?.status === 403) {
        try {
          const refresh_token = localStorage.getItem("refresh_token");
          if (!refresh_token) {
            return error;
          }

          const refreshOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refresh_token}`,
            },
          };
          console.log(refreshOptions)
          const refreshResponse = await axios(
            `${apiUrl}/api/v1/auth/refresh-token`,
            refreshOptions
          );
          console.log("refresh Response",  refreshResponse)
          if (refreshResponse?.status === 200) {
            console.log("Token refreshed:", refreshResponse?.data);
            localStorage.setItem(
              "access_token",
              refreshResponse?.data?.access_token
            );
            localStorage.setItem(
              "refresh_token",
              refreshResponse?.data?.refresh_token
            );
          }
        } catch (refreshError) {
          console.log("Failed to refresh token:", refreshError);
          return refreshError;
        }
      }
      throw error;
    }
  };

  return makeRequest();
};

export default Route;
