import React from "react";

interface names {
  p_gfather: string;
  p_gmother: string;
  m_gfather: string;
  m_gmother: string;
  p_uncle: string;
  p_aunt: string;
  father: string;
  mother: string;
  m_uncle: string;
  m_aunt: string;
  cousins: Array<string>;
}

const Tree: React.FC<names> = (props) => {
  return (
    <div className="tree-container">
      <div className="p-gfather leaf left">{props.p_gfather}</div>
      <div className="p-gmother leaf left">{props.p_gmother}</div>
      <div className="m-gfather leaf right">{props.m_gfather}</div>
      <div className="m-gmother leaf right">{props.m_gmother}</div>

      <div className="p-uncle leaf left">{props.p_uncle}</div>
      <div className="p-aunt leaf left">{props.p_aunt}</div>
      <div className="father leaf left">{props.father}</div>
      <div className="mother leaf right">{props.mother}</div>
      <div className="m-uncle leaf right">{props.m_uncle}</div>
      <div className="m-aunt leaf right">{props.m_aunt}</div>

      <div className="log">You</div>
      <div className="apple">
        <ul>
          {props.cousins.map((cousin) => (
            <li>{cousin}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tree;
