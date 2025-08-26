import { useEffect, useState } from "react";
import Route from "../routes/Route";

export default function useUsersLogic() {
  const token = localStorage.getItem("access_token");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await Route(
        "GET",
        "/api/v1/mangement",
        token,
        null,
        null
      );
      if (response?.status === 200) {
        setUsers(
          response?.data?.map((item, index) => ({
            id: index,
            sl: index + 1,
            ...item,
          }))
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);
  const fetchDetails = async (empId) => {
    console.log(empId);
    setIsLoading(true);
    try {
      const response = await Route(
        "GET",
        `/api/v1/mangement/getUserDtls/${empId}`,
        token,
        null,
        null
      );
      if (response?.status === 200) {
        setUserDetails(response?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    users,
    isLoading,
    addNew,
    setAddNew,
    fetchUsers,
    fetchDetails,
  };
}
