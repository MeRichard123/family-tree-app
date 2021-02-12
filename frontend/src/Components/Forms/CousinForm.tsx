import React, { useState } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import { BASE_URL } from "../../Utils/store";

interface props {
  userId: number;
}

const CousinForm: React.FC<props> = ({ userId }) => {
  const [name, setName] = useState<string>("");
  const [side, setSide] = useState<string>("Maternal");
  const alert = useAlert();

  let token = localStorage.getItem("token");
  token = JSON.parse(token || "{}").token;
  const CreateCousin = async (e: React.FormEvent) => {
    e.preventDefault();
    let requestObject = {
      user: userId,
      name,
      side,
    };
    try {
      await axios.post(`${BASE_URL}/api/cousins/`, requestObject, {
        headers: { Authorization: `token ${token}` },
      });
      alert.success("Cousin Added");
    } catch {
      alert.error("An Error Occurred");
    }

    setName("");
  };

  return (
    <div className="memberadd-form">
      <h2 className="memberadd-form__title">Add a New Cousin</h2>
      <form action="" className="memberadd-form__form" onSubmit={CreateCousin}>
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
          name="Side"
          id="sideInput"
          value={side}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSide(e.target.value);
          }}
        >
          <option value="Maternal">Maternal</option>
          <option value="Paternal">Paternal</option>
        </select>

        <input type="submit" value="Add Cousin" id="btn" />
      </form>
    </div>
  );
};

export default CousinForm;
