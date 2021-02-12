import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { defaultTreeProps } from "../Views/Home";
import Tree from "./Tree";
import { GrandParentType, StateType } from "../Utils/Types";
import { BASE_URL } from "../Utils/store";

interface PropTypes {
  id: number;
}

interface RootObject {
  user: number;
  mother: string;
  father: string;
  cousins: Array<StateType>;
  siblings: Array<StateType>;
  aunts: Array<StateType>;
  uncles: Array<StateType>;
  grandparents: Array<GrandParentType>;
}

const UserTree: React.FC<PropTypes> = ({ id }) => {
  // Get User Token

  let token = localStorage.getItem("token");
  token = JSON.parse(token || "{}").token;
  const headers = { headers: { Authorization: `Token ${token}` } };

  // Fetch User Tree

  const getUserTree = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/tree/${id}`, headers);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const { data, isSuccess } = useQuery("getTree", getUserTree);

  const TreeData: RootObject = data;

  let paternalAunts;
  let maternalAunts;
  let paternalUncles;
  let maternalUncles;
  let MGParents;
  let PGParents;
  let PCousins: StateType[] = [];
  let MCousins: StateType[] = [];

  // Filter Data
  if (TreeData) {
    paternalAunts = TreeData?.aunts?.filter(
      (person) => person.side === "Paternal"
    );
    maternalAunts = TreeData?.aunts?.filter(
      (person) => person.side === "Maternal"
    );
    paternalUncles = TreeData?.uncles?.filter(
      (person) => person.side === "Paternal"
    );
    maternalUncles = TreeData?.uncles?.filter(
      (person) => person.side === "Maternal"
    );
    MGParents = TreeData?.grandparents?.filter(
      (person) => person.side === "Maternal"
    );
    PGParents = TreeData?.grandparents?.filter(
      (person) => person.side === "Paternal"
    );
    PCousins = TreeData?.cousins?.filter(
      (person) => person.side === "Paternal"
    );
    MCousins = TreeData?.cousins.filter((person) => person.side === "Maternal");
  }

  return (
    <>
      {(!TreeData && !isSuccess) || data === "" ? (
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
              <div className="leaf left" key={uncle.id}>
                {uncle.name}
              </div>
            ))}
          </div>
          <div className="p-aunt">
            {paternalAunts?.map((aunt) => (
              <div className="leaf left" key={aunt.id}>
                {aunt.name}
              </div>
            ))}
          </div>
          <div className="father leaf left">{TreeData.father}</div>
          <div className="mother leaf right">{TreeData.mother}</div>
          <div className="m-uncle">
            {maternalUncles?.map((uncle) => (
              <div className="leaf right" key={uncle.id}>
                {uncle.name}
              </div>
            ))}
          </div>
          <div className="m-aunt">
            {maternalAunts?.map((aunt) => (
              <div className="leaf right" key={aunt.id}>
                {aunt.name}
              </div>
            ))}
          </div>

          <div className="log">You</div>

          {MCousins.length > 0 && (
            <div className="apple maternal-apple">
              <ul>
                {MCousins.map((cousin) => (
                  <li key={cousin.id}>{cousin.name}</li>
                ))}
              </ul>
            </div>
          )}
          {PCousins.length > 0 && (
            <div className="apple paternal-apple">
              <ul>
                {PCousins.map((cousin) => (
                  <li key={cousin.id}>{cousin.name}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="siblings">
            {TreeData.siblings?.map((sibling) => (
              <div className="sibling" key={sibling.id}>
                {sibling.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserTree;
