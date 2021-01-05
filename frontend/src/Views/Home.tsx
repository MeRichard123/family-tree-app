import React from "react";
import Tree from "../Components/Tree";

const Home: React.FC = () => {
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
        <Tree />
      </div>
    </section>
  );
};

export default Home;
