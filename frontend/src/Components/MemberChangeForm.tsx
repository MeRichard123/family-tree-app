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
      {type === "cousins" && <CousinForm />}
      {type === "aunts" && <AuntForm />}
      {type === "grandparents" && <GrandParentForm />}
      {type === "siblings" && <SiblingForm />}
      {type === "uncles" && <UncleForm userId={userId} />}
    </div>
  );
};

export default MemberChangeForm;
