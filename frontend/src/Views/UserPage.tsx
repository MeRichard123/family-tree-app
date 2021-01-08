import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "../Utils/Loading";
import Tree from "../Components/Tree";
import { defaultTreeProps } from "./Home";
import settings from "../Assets/settings.svg";

const UserPage = () => {
  let token = localStorage.getItem("token");
  token = JSON.parse(token || "{}").token;

  const getUserDetail = async () => {
    const { data } = await axios.get("http://localhost:8000/api/auth/user", {
      headers: { Authorization: `Token ${token}` },
    });
    return data;
  };
  const { data, isLoading, isSuccess } = useQuery("getUser", getUserDetail, {
    staleTime: 5000,
  });

  return (
    <>
      {isLoading && <Loading />}
      {isSuccess && (
        <div className="userpage">
          <div className="userpage__settings">
            <img src={settings} alt="" />
          </div>
          <h1 className="userpage__title">
            Welcome,{" "}
            <span>
              {data.username.charAt(0).toUpperCase() + data.username.slice(1)}
            </span>{" "}
            to your Family Tree
          </h1>
          <p className="userpage__instruction">
            Hit settings to add your family members
          </p>
          <Tree {...defaultTreeProps} />
        </div>
      )}
    </>
  );
};

export default UserPage;
