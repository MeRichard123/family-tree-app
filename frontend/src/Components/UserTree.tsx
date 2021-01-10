import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { defaultTreeProps } from "../Views/Home";
import Tree from "./Tree";

interface PropTypes {
  id: number;
}

interface RootObject {
  user: number;
  mother: string;
  father: string;
  cousins: string[];
  siblings: string[];
  aunts: string[];
  uncles: string[];
  grandparents: string[];
}

interface StateType {
  id: number;
  name: string;
  side: string;
  spouse: string;
  user: number;
}

const UserTree: React.FC<PropTypes> = ({ id }) => {
  const [aunts, setAunts] = useState<StateType[]>();
  const [uncles, setUncles] = useState<StateType[]>();

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

  const getUserTree = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/tree/${id}`, {
      headers: { Authorization: `Token ${token}` },
    });
    return data[0];
  };
  const { data, isLoading, isSuccess } = useQuery("getTree", getUserTree, {
    staleTime: 5000,
  });
  const TreeData: RootObject = data;
  useEffect(() => {
    if (data) {
      const GetUncles = (uncles: String[]) => {
        let allUncles: Array<StateType> = [];
        uncles?.forEach((uncle) => {
          getMember("uncles", uncle).then((res) => allUncles.push(...res));
        });
        const paternalUncles = allUncles.filter(
          (person) => person.side == "Paternal"
        );
        return allUncles;
      };

      const GetAunts = (aunts: String[]) => {
        let allAunts: Array<StateType> = [];
        aunts?.forEach((aunt) => {
          getMember("aunts", aunt).then((res) => allAunts.push(...res));
        });
        const PaternalAunts = allAunts.filter(
          (person) => person.side == "Paternal"
        );
        return allAunts;
      };

      const res = GetUncles(data?.uncles);
      const results = GetAunts(data?.aunts);
      setAunts(results);
      setUncles(res);
    }
  }, [data]);

  const paternalAunts = aunts?.filter((person) => person.side == "Paternal");
  const maternalAunts = aunts?.filter((person) => person.side == "Maternal");
  const paternalUncles = uncles?.filter((person) => person.side == "Paternal");
  const maternalUncles = uncles?.filter((person) => person.side == "Maternal");

  return (
    <>
      {!data ? (
        <div className="tree">
          <Tree {...defaultTreeProps} />
        </div>
      ) : (
        <div className="tree-container">
          <div className="p-gfather leaf left"></div>
          <div className="p-gmother leaf left"></div>
          <div className="m-gfather leaf right"></div>
          <div className="m-gmother leaf right"></div>

          {paternalUncles?.map((uncle) => (
            <div className="p-uncle leaf left">{uncle.name}</div>
          ))}
          {paternalAunts?.map((aunt) => (
            <div className="p-aunt leaf left">{aunt.name}</div>
          ))}
          <div className="father leaf left">{TreeData.father}</div>
          <div className="mother leaf right">{TreeData.mother}</div>
          {maternalUncles?.map((uncle) => (
            <div className="m-uncle leaf right">{uncle.name}</div>
          ))}
          {maternalAunts?.map((aunt) => (
            <div className="m-aunt leaf right">{aunt.name}</div>
          ))}

          <div className="log">You</div>
          <div className="apple">
            <ul>
              {TreeData.cousins?.map((cousin, index) => (
                <li key={index}>{cousin}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTree;
