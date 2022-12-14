import React from "react";

const Spinner = ({ message }) => {
  return (
    <div className="ui segment" style={{ minHeight: "10em" }}>
      <div className="ui active inverted dimmer">
        <div className="ui text loader">{message || "Loading..."}</div>
      </div>
      <p></p>
    </div>
  );
};

export default Spinner