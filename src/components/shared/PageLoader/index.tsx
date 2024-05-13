import React from "react";
import { ClipLoader } from "react-spinners";

export const PageLoader = () => {
  return (
    <div>
      <div
        style={{
          height: "100vh",
          position: "fixed",
          display: "flex", flexDirection: 'column',
          gap: '20px',
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          zIndex: 11111111,
          background: 'white'
        }}
      >
        <ClipLoader color="rgb(12, 131, 31)" size={70} />
      </div>
    </div>
  );
};
