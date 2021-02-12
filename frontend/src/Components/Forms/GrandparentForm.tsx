import React, { useState } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import { BASE_URL } from "../../Utils/store";

interface props {
  userId: number;
}

const GrandparentForm: React.FC<props> = ({ userId }) => {
  const [name, setName] = useState<string>("");
  const [side, setSide] = useState<string>("Maternal");
  const [Gtype, setGtype] = useState<string>("Mother");
  const alert = useAlert();

  let token = localStorage.getItem("token");
  token = JSON.parse(token || "{}").token;
  const createGrandparent = async (e: React.FormEvent) => {
    e.preventDefault();
    let requestObject = {
      name,
      side,
      Gtype,
      user: userId,
    };
    try {
      await axios.post(`${BASE_URL}/api/grandparents/`, requestObject, {
        headers: { Authorization: `token ${token}` },
      });
      alert.success("Grandparent Added");
    } catch {
      alert.error("There was an Error");
    }

    setName("");
    setGtype("Mother");
    setSide("Maternal");
  };
  return (
    <div className="memberadd-form">
      <h2 className="memberadd-form__title">Add a New Grandparent</h2>
      <form
        action=""
        className="memberadd-form__form"
        onSubmit={createGrandparent}
      >
        <label htmlFor="nameInput">Name:</label>
        <input
          type="text"
          id="nameInput"
          required
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <label htmlFor="sideInput">Family Side:</label>

        <select
          name="sideInput"
          id=""
          value={side}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSide(e.target.value);
          }}
        >
          <option value="Paternal">Paternal</option>
          <option value="Maternal">Maternal</option>
        </select>
        <label htmlFor="typeInput">GrandMother or GrandFather?</label>

        <select
          name="typeInput"
          id=""
          value={Gtype}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setGtype(e.target.value);
          }}
        >
          <option value="Mother">Mother</option>
          <option value="Father">Father</option>
        </select>
        <input type="submit" value="Add Grandparent" id="btn" />
      </form>
    </div>
  );
};

export default GrandparentForm;
