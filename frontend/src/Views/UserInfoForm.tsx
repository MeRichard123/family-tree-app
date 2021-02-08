import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Tree from "../Assets/tree.svg";
import AddMember from "../Components/AddMember";
import Loading from "../Utils/Loading";
import { useUserDetail } from "../Hooks";

const routes: Array<string> = [
  "aunts",
  "uncles",
  "grandparents",
  "siblings",
  "cousins",
];

const UserInfoForm: React.FC = () => {
  const [mother, setMother] = useState<string>("");
  const [father, setFather] = useState<string>("");
  const [oldPassword, setOldPass] = useState<string>("");
  const [newPassword, setNewPass] = useState<string>("");
  const [HTTPMethod, setHTTP] = useState<string>("create");
  const alert = useAlert();

  let token = useRef<string | null>("" || null);
  token.current = localStorage.getItem("token");
  token.current = JSON.parse(token.current || "{}").token;
  const { data, isLoading, isSuccess } = useUserDetail();

  let ID = useRef<number | null>(0 || null);

  if (isSuccess) {
    ID.current = data.id;
  }

  const RemoveAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(
          `http://localhost:8000/account/delete/${data?.username}`,
          {
            headers: { Authorization: `Token ${token.current}` },
          }
        );
        window.location.replace("/logout");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const ChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      old_password: oldPassword,
      new_password: newPassword,
    };
    try {
      const res = await axios.put(
        `http://localhost:8000/api/auth/passwordReset`,
        body,
        {
          headers: { Authorization: `Token ${token.current}` },
        }
      );
      alert.info(res.data.message);
    } catch {
      console.log("Error");
    }
  };

  const FormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestObject = {
      user: data?.id,
      mother,
      father,
    };
    if (HTTPMethod === "create") {
      try {
        await axios.post(`http://localhost:8000/api/tree/`, requestObject, {
          headers: { Authorization: `Token ${token.current}` },
        });
        alert.info("Parents Added");
      } catch (err) {
        alert.error("An Error has occured!");
      }
    } else if (HTTPMethod === "put") {
      try {
        await axios.put(
          `http://localhost:8000/api/tree/${ID.current}/`,
          requestObject,
          {
            headers: { Authorization: `Token ${token.current}` },
          }
        );
        alert.info("Updated Parents");
      } catch {
        alert.error("An Error has occured!");
      }
    }
  };

  useEffect(() => {
    const GetPutNames = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/tree/${ID.current}`,
          {
            headers: { Authorization: `Token ${token.current}` },
          }
        );
        if (data.father?.length > 1) {
          setFather(data.father);
          setMother(data.mother);
          setHTTP("put");
        } else {
          setHTTP("create");
        }
      } catch {
        console.log("Tree doesn't exist");
        setHTTP("create");
      }
    };
    GetPutNames();
  }, []);

  return (
    <div className="modal-form">
      {isLoading && <Loading />}
      <Link to="/home">
        <div className="form-settings">
          <img src={Tree} alt="" />
        </div>
      </Link>
      <h3 className="modal-form__title">
        Hi {data?.username[0].toUpperCase() + data?.username.slice(1)} customize
        your tree with names below:
      </h3>

      <div className="member-form">
        {routes.map((route, index) => (
          <AddMember type={route} key={index} userId={data?.id} />
        ))}

        <div className="member-box">
          <h2>Parents</h2>
          <form
            action=""
            className="modal-form__parent-form"
            onSubmit={FormHandler}
          >
            <label htmlFor="motherInput">Mother:</label>
            <input
              type="text"
              id="motherInput"
              value={mother}
              onChange={(e) => setMother(e.target.value)}
            />
            <label htmlFor="fatherInput">Father:</label>
            <input
              type="text"
              id="fatherInput"
              value={father}
              onChange={(e) => setFather(e.target.value)}
            />
            <input
              type="submit"
              value="Add Parents"
              className="modal-form__parent-form__button"
            />
          </form>
        </div>
      </div>

      <h1 className="title-account">Account</h1>
      <div className="account">
        <div className="account-remove">
          <form action="" onSubmit={RemoveAccount}>
            <h2>Danger Zone</h2>
            <button type="submit">Delete Account</button>
          </form>
        </div>
        <div className="account-password">
          <form
            action=""
            className="modal-form__parent-form"
            onSubmit={ChangePassword}
          >
            <h2>Change Password</h2>
            <label htmlFor="old">Old Password</label>
            <input
              type="text"
              id="old"
              value={oldPassword}
              onChange={(e) => setOldPass(e.target.value)}
            />
            <label htmlFor="new">New Password</label>
            <input
              type="text"
              id="new"
              value={newPassword}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <input
              type="submit"
              value="Change Password"
              className="changepassbtn"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;
