import React from "react";
import "./style.css";

import incomeIcon from "../../assets/incomeIcon.png";
import expensesIcon from "../../assets/expensesIcon.png";
import totalIcon from "../../assets/totalIcon.png";

export const Sumary = () => {
  return (
    <div className="containerSumary">
      <div className="box">
        <header className="header">
          <p>Entradas</p>
          <img src={incomeIcon} alt="incomeIcone" />
        </header>
        <strong className="strong">R$1000,00</strong>
      </div>
      <div className="box">
        <header className="header">
          <p>Saídas</p>
          <img src={expensesIcon} alt="expenses" />
        </header>
        <strong className="strong"> - R$500,00</strong>
      </div>
      <div className="boxTotal">
        <header className="header">
          <p>Total</p>
          <img src={totalIcon} alt="total" />
        </header>
        <strong className="strong">R$500,00</strong>
      </div>
    </div>
  );
};
