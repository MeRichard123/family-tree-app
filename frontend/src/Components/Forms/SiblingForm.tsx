import React, { useState } from "react";
import axios from "axios";
import { useAlert } from "react-alert";

interface props {
  userId: number;
}

const SiblingForm: React.FC<props> = ({ userId }) => {
  const [name, setName] = useState<string>("");
  const alert = useAlert();

  let token = localStorage.getItem("token");
  token = JSON.parse(token || "{}").token;
  const CreateSibling = async (e: React.FormEvent) => {
    e.preventDefault();
    let requestObject = {
      name,
      user: userId,
    };
    try {
      await axios.post("http://localhost:8000/api/siblings/", requestObject, {
        headers: { Authorization: `token ${token}` },
      });
      alert.success("Sibling Added");
    } catch {
      alert.error("There was an Error");
    }

    setName("");
  };
  return (
    <div className="memberadd-form">
      <h2 className="memberadd-form__title">Add a New Sibling</h2>
      <form action="" className="memberadd-form__form" onSubmit={CreateSibling}>
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
        <input type="submit" value="Add Sibling" id="btn" />
      </form>
    </div>
  );
};

export default SiblingForm;
