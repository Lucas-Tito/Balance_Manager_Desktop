import React from "react";
import totalIcon from "../../assets/totalIcon.png";
import "./../Header/style.css";

export const Header = () => {
  return (
    <div className="container">
      <div className="content">
        <img src={totalIcon} alt="logo" />
        <button className="btn1">Nova transação</button>
      </div>
    </div>
  );
};
