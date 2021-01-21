import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Utils/Loading";
import settings from "../Assets/settings.svg";
import UserTree from "../Components/UserTree";

interface names {
  p_gfather: string;
  p_gmother: string;
  m_gfather: string;
  m_gmother: string;
  p_uncle: string;
  p_aunt: string;
  father: string;
  mother: string;
  m_uncle: string;
  m_aunt: string;
  cousins: Array<string>;
}

export const defaultTreeProps: names = {
  p_gfather: "P Grandfather",
  p_gmother: "P Mother",
  m_gfather: "M Grandfather",
  m_gmother: "M Grandmother",
  p_uncle: "P Uncle",
  p_aunt: "P Aunt",
  father: "Father",
  mother: "Mother",
  m_uncle: "M Uncle",
  m_aunt: "M Aunt",
  cousins: ["Cousin1", "Cousin2"],
};

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
          <Link to="/settings">
            <div className="userpage__settings">
              <img src={settings} alt="" />
            </div>
          </Link>

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

          <UserTree id={data.id} />
        </div>
      )}
    </>
  );
};

export default UserPage;
