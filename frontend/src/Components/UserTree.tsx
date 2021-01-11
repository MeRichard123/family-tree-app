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

interface GrandParentType {
  id: number;
  name: string;
  side: string;
  GType: string;
  user: number;
}

const UserTree: React.FC<PropTypes> = ({ id }) => {
  const [aunts, setAunts] = useState<StateType[]>();
  const [uncles, setUncles] = useState<StateType[]>();
  const [gparents, setGParents] = useState<GrandParentType[]>();

  // Get User Token

  let token = localStorage.getItem("token");
  token = JSON.parse(token || "{}").token;
  const headers = { headers: { Authorization: `Token ${token}` } };

  // Fetch User Tree

  const getUserTree = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/tree/${id}`,
      headers
    );
    return data[0];
  };
  const { data, isSuccess } = useQuery("getTree", getUserTree, {
    staleTime: 5000,
  });
  const TreeData: RootObject = data;

  // Get All the Data

  useEffect(() => {
    if (isSuccess) {
      const getMember = async (type: String, member: String) => {
        const { data } = await axios.get(
          `http://localhost:8000/api/${type}/${member}`,
          headers
        );
        return data;
      };

      const GetUncles = (uncles: String[]) => {
        let allUncles: Array<StateType> = [];
        uncles?.forEach((uncle) => {
          getMember("uncles", uncle).then((res) => allUncles.push(...res));
        });
        return allUncles;
      };

      const GetAunts = (aunts: String[]) => {
        let allAunts: Array<StateType> = [];
        aunts?.forEach((aunt) => {
          getMember("aunts", aunt).then((res) => allAunts.push(...res));
        });
        return allAunts;
      };

      const GetGrandparents = (grandparents: String[]) => {
        let allGParents: Array<GrandParentType> = [];
        grandparents?.forEach((gparent) => {
          getMember("grandparents", gparent).then((res) =>
            allGParents.push(...res)
          );
        });
        return allGParents;
      };

      setUncles(GetUncles(data?.uncles));
      setAunts(GetAunts(data?.aunts));
      setGParents(GetGrandparents(data?.grandparents));
    }
  }, [data, isSuccess, token]);

  const paternalAunts = aunts?.filter((person) => person.side === "Paternal");
  const maternalAunts = aunts?.filter((person) => person.side === "Maternal");
  const paternalUncles = uncles?.filter((person) => person.side === "Paternal");
  const maternalUncles = uncles?.filter((person) => person.side === "Maternal");
  const MGParents = gparents?.filter((person) => person.side === "Maternal");
  const PGParents = gparents?.filter((person) => person.side === "Paternal");

  return (
    <>
      {!data ? (
        <div className="tree">
          <Tree {...defaultTreeProps} />
        </div>
      ) : (
        <div className="tree-container">
          <div className="p-gfather leaf left">
            {PGParents ? PGParents[0]?.name : ""}
          </div>
          <div className="p-gmother leaf left">
            {PGParents ? PGParents[1]?.name : ""}
          </div>
          <div className="m-gfather leaf right">
            {MGParents ? MGParents[0]?.name : ""}
          </div>
          <div className="m-gmother leaf right">
            {MGParents ? MGParents[1]?.name : ""}
          </div>

          <div className="p-uncle">
            {paternalUncles?.map((uncle) => (
              <div className="leaf left">{uncle.name}</div>
            ))}
          </div>
          <div className="p-aunt">
            {paternalAunts?.map((aunt) => (
              <div className="leaf left">{aunt.name}</div>
            ))}
          </div>
          <div className="father leaf left">{TreeData.father}</div>
          <div className="mother leaf right">{TreeData.mother}</div>
          <div className="m-uncle">
            {maternalUncles?.map((uncle) => (
              <div className="leaf right">{uncle.name}</div>
            ))}
          </div>
          <div className="m-aunt">
            {maternalAunts?.map((aunt) => (
              <div className="leaf right">{aunt.name}</div>
            ))}
          </div>

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
