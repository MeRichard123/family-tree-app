import React, { useState, useEffect } from "react";
import axios from "axios";

interface props {
  userId: number;
}

interface TypeResponse {
  id: number;
  name: string;
  side: string;
  spouse: string;
  user: number;
}

const CousinForm: React.FC<props> = ({ userId }) => {
  const [name, setName] = useState<string>("");
  const [spouse, setSpouse] = useState<string>("");
  const [Father, setFather] = useState<string>("None");
  const [Mother, setMother] = useState<string>("None");

  const [aunts, setAunts] = useState<TypeResponse[]>([]);
  const [uncles, setUncles] = useState<TypeResponse[]>([]);

  let token = localStorage.getItem("token");
  token = JSON.parse(token || "{}").token;
  const CreateCousin = async (e: React.FormEvent) => {
    e.preventDefault();
    let motherId = "";
    let fatherId = "";
    if (Father === "None") {
      const res = await axios.get(`http://localhost:8000/api/aunts/${Mother}`, {
        headers: { Authorization: `token ${token}` },
      });
      motherId = res.data.id;
    }
    if (Mother === "None") {
      const fres = await axios.get(
        `http://localhost:8000/api/uncles/${Father}`,
        {
          headers: { Authorization: `token ${token}` },
        }
      );
      fatherId = fres.data.id;
    }
    let requestObject = {
      user: userId,
      name,
      spouse,
      Father: fatherId || "",
      Mother: motherId || "",
    };
    await axios.post("http://localhost:8000/api/cousins/", requestObject, {
      headers: { Authorization: `token ${token}` },
    });

    setName("");
    setMother("None");
    setFather("None");
    setSpouse("");
  };

  const getAunts = async () => {
    const res = await axios.get("http://localhost:8000/api/aunts/", {
      headers: { Authorization: `token ${token}` },
    });
    setAunts(res.data);
  };

  const getUncles = async () => {
    const res = await axios.get("http://localhost:8000/api/uncles/", {
      headers: { Authorization: `token ${token}` },
    });
    setUncles(res.data);
  };

  useEffect(() => {
    getAunts();
    getUncles();
  }, []);

  return (
    <div className="memberadd-form">
      <h2 className="memberadd-form__title">Add a New Cousin</h2>
      <form action="" className="memberadd-form__form" onSubmit={CreateCousin}>
        <label htmlFor="nameInput">Name:</label>
        <input
          type="text"
          id="nameInput"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <label htmlFor="motherInput">Mother:</label>

        <select
          name="motherInput"
          id=""
          value={Mother}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setMother(e.target.value);
          }}
        >
          {aunts.map((aunt) => (
            <option key={aunt.id} value={aunt.name}>
              {aunt.name}
            </option>
          ))}
          <option value="None">None</option>
        </select>
        <label htmlFor="fatherInput">Father:</label>
        <select
          name="fatherInput"
          id=""
          value={Father}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setFather(e.target.value);
          }}
        >
          {uncles.map((uncle) => (
            <option value={uncle.name} key={uncle.id}>
              {uncle.name}
            </option>
          ))}
          <option value="None">None</option>
        </select>
        <label htmlFor="spouseInput">Spouse:</label>
        <input
          type="text"
          id="spouseInput"
          value={spouse}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSpouse(e.target.value)
          }
        />
        <input type="submit" value="Add Cousin" id="btn" />
      </form>
    </div>
  );
};

export default CousinForm;
