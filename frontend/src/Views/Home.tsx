import React from "react";
import { Redirect } from "react-router-dom";
import Tree from "../Components/Tree";
import { useAuth } from "../Utils/store";
import { names } from "../Utils/Types";

export const defaultTreeProps: names = {
  p_gfather: "P Grandfather",
  p_gmother: "P Grandmother",
  m_gfather: "M Grandfather",
  m_gmother: "M Grandmother",
  p_uncle: "P Uncle",
  p_aunt: "P Aunt",
  father: "Father",
  mother: "Mother",
  m_uncle: "M Uncle",
  m_aunt: "M Aunt",
  cousins: ["Cousin1", "Cousin2"],
};

const Home: React.FC = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }
  return (
    <section className="homepage">
      <div className="homepage__detail">
        <h1>Generate Your Family Tree Today </h1>
        <div className="homepage__detail__container">
          <p>
            See the demo tree below. Hit Sign Up when you’re ready to create
            your own.
          </p>
        </div>
      </div>
      <div className="tree">
        <Tree {...defaultTreeProps} />
      </div>
    </section>
  );
};

export default Home;
