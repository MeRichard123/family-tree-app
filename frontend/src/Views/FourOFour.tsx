import React, { useLayoutEffect, useState } from "react";

const FourOFour: React.FC = () => {
  const [offsetHeight, setOffset] = useState(0);

  useLayoutEffect(() => {
    const footerHeight: number =
      document.querySelector("footer")?.getBoundingClientRect().height || 0;
    const navHeight: number =
      document.querySelector("nav")?.getBoundingClientRect().height || 0;

    const footerNavHeight = footerHeight + navHeight;
    setOffset(footerNavHeight);
  }, []);
  return (
    <div
      className="error"
      style={{ minHeight: `calc(100vh - ${offsetHeight}px)` }}
    >
      <h1>404</h1>
      <h2>Page Not Found</h2>
    </div>
  );
};

export default FourOFour;
