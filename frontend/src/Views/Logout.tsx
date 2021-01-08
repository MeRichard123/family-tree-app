import React, { useEffect } from "react";
import { useAuthToken, useAuth } from "../Utils/store";
import axios from "axios";

const Logout = () => {
  const token = useAuthToken((state) => state.token);
  const setToken = useAuthToken((state) => state.setToken);
  const setAuthed = useAuth((state) => state.setAuthed);

  const logoutuser = async () => {
    await axios.post("http://localhost:8000/api/auth/logout", null, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  };
  useEffect(() => {
    logoutuser();
    setToken("0");
    setAuthed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div className="logout">You have been Logged out</div>;
};

export default Logout;
