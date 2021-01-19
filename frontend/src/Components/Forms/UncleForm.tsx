import React, { ChangeEvent, useState } from "react";
import axios from "axios";

interface props {
  userId: number;
}

const UncleForm: React.FC<props> = ({ userId }) => {
  const [name, setName] = useState<string>("");
  const [spouse, setSpouse] = useState<string>("");
  const [side, setSide] = useState<string>("Paternal");

  let token = localStorage.getItem("token");
  token = JSON.parse(token || "{}").token;
  const CreateUncle = async (e: React.FormEvent) => {
    e.preventDefault();
    let requestObject = {
      name,
      side,
      spouse,
      user: userId,
    };
    await axios.post("http://localhost:8000/api/uncles/", requestObject, {
      headers: { Authorization: `token ${token}` },
    });
    setName("");
    setSpouse("");
  };
  return (
    <div className="memberadd-form">
      <h2 className="memberadd-form__title">Add a New uncle</h2>
      <form action="" className="memberadd-form__form" onSubmit={CreateUncle}>
        <label htmlFor="nameInput">Name:</label>
        <input
          type="text"
          id="nameInput"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <label htmlFor="typeSelect">Side:</label>
        <select
          name=""
          id="typeSelect"
          value={side}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setSide(e.target.value)
          }
        >
          <option value="Paternal">Paternal</option>
          <option value="Maternal">Maternal</option>
        </select>
        <label htmlFor="spouseInput">Spouse:</label>
        <input
          type="text"
          id="spouseInput"
          value={spouse}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSpouse(e.target.value)
          }
        />
        <input type="submit" value="Add Uncle" id="btn" />
      </form>
    </div>
  );
};

export default UncleForm;