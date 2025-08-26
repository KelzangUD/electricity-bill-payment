import { createContext, useState, useContext, useEffect } from "react";
import Route from "../routes/Route";

const CommonContext = createContext();

export const CommonProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [regions, setRegions] = useState([]);

  const fetchRoles = async () => {
    const res = await Route("GET", "/api/v1/common/role", null, null, null);
    if (res?.status === 200) {
      setRoles(res?.data || []);
    }
  };
  const fetchRegions = async () => {
    const res = await Route("GET", "/api/v1/common/regions", null, null, null);
    if (res?.status === 200) {
      setRegions(res?.data || []);
    }
  };
  useEffect(() => {
    fetchRoles();
    fetchRegions();
    // eslint-disable-next-line
  }, []);

  return (
    <CommonContext.Provider
      value={{
        roles,
        regions,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export const useCommon = () => useContext(CommonContext);
