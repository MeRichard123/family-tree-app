import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import AddMember from "./AddMember";

interface props {
  username: string;
}

const routes: Array<string> = [
  "aunts",
  "uncles",
  "grandparents",
  "siblings",
  "cousins",
];

const UserInfoForm: React.FC<props> = ({ username }) => {
  const [mother, setMother] = useState<string>("");
  const [father, setFather] = useState<string>("");

  let token = localStorage.getItem("token");
  token = JSON.parse(token || "{}").token;

  const getTreeData = async () => {
    const { data } = await axios.get("http://localhost:8000/api/tree", {
      headers: { Authorization: `Token ${token}` },
    });
    return data;
  };
  const { data, isLoading, isSuccess } = useQuery("getTree", getTreeData, {
    staleTime: 5000,
  });

  const fatherFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const motherFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="modal-form">
      <h3 className="modal-form__title">
        Hi {username} customize your tree with names below:
      </h3>
      <div className="member-form">
        {routes.map((route, index) => (
          <AddMember type={route} key={index} />
        ))}
      </div>

      <form
        action=""
        className="modal-form__parent-form"
        onSubmit={motherFormHandler}
      >
        <input
          type="text"
          value={mother}
          onChange={(e) => setMother(e.target.value)}
        />
        <input
          type="submit"
          value="Add Mother"
          className="modal-form__parent-form__button"
        />
      </form>
      <form
        action=""
        className="modal-form__parent-form"
        onSubmit={fatherFormHandler}
      >
        <input
          type="text"
          value={father}
          onChange={(e) => setFather(e.target.value)}
        />
        <input
          type="submit"
          value="Add Father"
          className="modal-form__parent-form__button"
        />
      </form>
    </div>
  );
};

export default UserInfoForm;
