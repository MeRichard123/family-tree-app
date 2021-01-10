import axios from "axios";

interface Uncle {
  id: number;
  name: string;
  side: string;
  spouse: string;
  user: number;
}

interface Aunt {
  id: number;
  name: string;
  side: string;
  spouse: string;
  user: number;
}

let token = localStorage.getItem("token");
token = JSON.parse(token || "{}").token;

const getMember = async (type: String, member: String) => {
  const { data } = await axios.get(
    `http://localhost:8000/api/${type}/${member}`,
    {
      headers: { Authorization: `Token ${token}` },
    }
  );
  return data;
};

export const GetPaternalUncles = (uncles: String[]) => {
  let allUncles: Array<Uncle> = [];
  uncles.forEach((uncle) => {
    getMember("uncles", uncle).then((res) => allUncles.push(...res));
  });
  const paternalUncles = allUncles.filter(
    (person) => person.side == "Paternal"
  );
  return allUncles;
};

export const GetMaternalUncles = (uncles: String[]) => {
  let allUncles: Array<Uncle> = [];
  uncles.forEach((uncle) => {
    getMember("uncles", uncle).then((res) => allUncles.push(...res));
  });
  const maternalUncles = allUncles.filter(
    (person) => person.side == "Maternal"
  );
  return allUncles;
};

export const GetPaternalAunts = (aunts: String[]) => {
  let allAunts: Array<Aunt> = [];
  aunts.forEach((aunt) => {
    getMember("aunts", aunt).then((res) => allAunts.push(...res));
  });
  const PaternalAunts = allAunts.filter((person) => person.side == "Paternal");

  return allAunts;
};

export const GetMaternalAunts = (aunts: String[]) => {
  const allAunts: Array<Aunt> = [];
  aunts.forEach(async (aunt) => {
    const data = await getMember("aunts", aunt);
    allAunts.push(...data);
  });
  console.log(allAunts);
  const MaternalAunts = allAunts.filter((person) => person.side == "Maternal");
  console.log(MaternalAunts);

  return allAunts.filter((person) => person.side == "Maternal");
};
