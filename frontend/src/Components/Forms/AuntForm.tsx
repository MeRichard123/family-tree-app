import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useAlert } from "react-alert";

interface props {
  userId: number;
}

const AuntForm: React.FC<props> = ({ userId }) => {
  const [name, setName] = useState<string>("");
  const [spouse, setSpouse] = useState<string>("");
  const [side, setSide] = useState<string>("Paternal");
  const alert = useAlert();

  let token = localStorage.getItem("token");
  token = JSON.parse(token || "{}").token;
  const CreateAunt = async (e: React.FormEvent) => {
    e.preventDefault();
    let requestObject = {
      name,
      side,
      spouse,
      user: userId,
    };
    try {
      await axios.post("http://localhost:8000/api/aunts/", requestObject, {
        headers: { Authorization: `token ${token}` },
      });
      alert.success("Aunt Added");
    } catch {
      alert.error("There was an Error");
    }

    setName("");
    setSpouse("");
  };
  return (
    <div className="memberadd-form">
      <h2 className="memberadd-form__title">Add a New Aunt</h2>
      <form action="" className="memberadd-form__form" onSubmit={CreateAunt}>
        <label htmlFor="nameInput">Name:</label>
        <input
          type="text"
          id="nameInput"
          required
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
        <input type="submit" value="Add Aunt" id="btn" />
      </form>
    </div>
  );
};

export default AuntForm;
