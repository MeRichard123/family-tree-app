import React, { useState } from "react";
import axios from "axios";
/*
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    side = models.CharField(max_length=10, choices=SIDE_CHOICES, default="Maternal")
    Gtype = models.CharField(max_length=10, choices=GPARENT_TYPE, default="Mother")

    SIDE_CHOICES = (
    ("Paternal", "Paternal"),
    ("Maternal","Maternal")
)
GPARENT_TYPE = (
     ("Mother", "Mother"),
    ("Father","Father")
)

*/
interface props {
  userId: number;
}

const GrandparentForm: React.FC<props> = ({ userId }) => {
  const [name, setName] = useState<string>("");
  const [side, setSide] = useState<string>("Maternal");
  const [Gtype, setGtype] = useState<string>("Mother");

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
    console.log(requestObject);
    await axios.post("http://localhost:8000/api/grandparents/", requestObject, {
      headers: { Authorization: `token ${token}` },
    });

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
