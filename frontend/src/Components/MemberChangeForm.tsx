import React from "react";
import {
  AuntForm,
  CousinForm,
  GrandParentForm,
  SiblingForm,
  UncleForm,
} from "./Forms";

interface props {
  type: string;
  userId: number;
}

const MemberChangeForm: React.FC<props> = ({ type, userId }) => {
  return (
    <div className="modal-form">
      {type === "cousins" && <CousinForm userId={userId} />}
      {type === "aunts" && <AuntForm userId={userId} />}
      {type === "grandparents" && <GrandParentForm userId={userId} />}
      {type === "siblings" && <SiblingForm userId={userId} />}
      {type === "uncles" && <UncleForm userId={userId} />}
    </div>
  );
};

export default MemberChangeForm;
