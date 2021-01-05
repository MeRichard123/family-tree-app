import React from "react";

const Tree: React.FC = () => {
  return (
    <div className="tree-container">
      <div className="p-gfather leaf left">P Grandfather</div>
      <div className="p-gmother leaf left">P Mother</div>
      <div className="m-gfather leaf right">M Grandfather</div>
      <div className="m-gmother leaf right">M Grandmother</div>

      <div className="p-uncle leaf left">P Uncle</div>
      <div className="p-aunt leaf left">P Aunt</div>
      <div className="father leaf left">Father</div>
      <div className="mother leaf right">Mother</div>
      <div className="m-uncle leaf right">M Uncle</div>
      <div className="m-aunt leaf right">M Aunt </div>

      <div className="log">You</div>
      <div className="apple">
        <ul>
          <li>Cousin 1</li>
          <li>Cousin 2</li>
        </ul>
      </div>
    </div>
  );
};

export default Tree;
