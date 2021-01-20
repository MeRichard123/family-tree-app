import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Tree from "../Assets/tree.svg";
import { useQuery } from "react-query";
import AddMember from "../Components/AddMember";
import Loading from "../Utils/Loading";

interface props {
  username: string;
  userId: number;
}

const routes: Array<string> = [
  "aunts",
  "uncles",
  "grandparents",
  "siblings",
  "cousins",
];

const UserInfoForm: React.FC<props> = () => {
  const [mother, setMother] = useState<string>("");
  const [father, setFather] = useState<string>("");

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

  const FormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestObject = {
      user: data?.id,
      mother,
      father,
    };
    await axios.post("http://localhost:8000/api/auth/user", requestObject, {
      headers: { Authorization: `Token ${token}` },
    });
  };

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
    </div>
  );
};

export default UserInfoForm;
