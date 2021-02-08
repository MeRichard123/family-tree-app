import React from "react";
import { Link } from "react-router-dom";
import Loading from "../Utils/Loading";
import settings from "../Assets/settings.svg";
import UserTree from "../Components/UserTree";
import { names } from "../Utils/Types";
import { useUserDetail } from "../Hooks";

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
  const { data, isLoading, isSuccess } = useUserDetail();

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
