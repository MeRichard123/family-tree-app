import React from "react";
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
  cousins: Array<StateType>;
  siblings: Array<StateType>;
  aunts: Array<StateType>;
  uncles: Array<StateType>;
  grandparents: Array<GrandParentType>;
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
    return data;
  };
  const { data, isSuccess } = useQuery("getTree", getUserTree, {
    refetchInterval: 100000,
  });
  const TreeData: RootObject = data;

  const paternalAunts = TreeData?.aunts?.filter(
    (person) => person.side === "Paternal"
  );
  const maternalAunts = TreeData?.aunts?.filter(
    (person) => person.side === "Maternal"
  );
  const paternalUncles = TreeData?.uncles?.filter(
    (person) => person.side === "Paternal"
  );
  const maternalUncles = TreeData?.uncles?.filter(
    (person) => person.side === "Maternal"
  );
  const MGParents = TreeData?.grandparents?.filter(
    (person) => person.side === "Maternal"
  );
  const PGParents = TreeData?.grandparents?.filter(
    (person) => person.side === "Paternal"
  );

  return (
    <>
      {!TreeData && !isSuccess ? (
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

          <div className="apple">
            <ul>
              {TreeData.cousins?.map((cousin) => (
                <li key={cousin.id}>{cousin.name}</li>
              ))}
            </ul>
          </div>
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
