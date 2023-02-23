import React from "react";
import ReactLoading from "react-loading";

function LoadingComponent() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ReactLoading type={"bars"} color={"black"} width={50} height={50} />
    </div>
  );
}

export default LoadingComponent;
