import React, { useState } from "react";
import Modal from "react-modal";
import "./style.css";
import incomeIcon from "../../assets/incomeIcon.png";
import expensesIcon from "../../assets/expensesIcon.png";
import closeIcon from "../../assets/closeIcon.svg";

export const NewTransactionModal = ({ isOpen, onRequestClose }) => {
  const [type, setType] = useState("");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button onClick={onRequestClose} className="react-modal-close">
        <img src={closeIcon} />
      </button>
      <div className="containerModal">
        <h2>Cadastrar transação</h2>
        <form className="form">
          <input className="input" placeholder="Titulo" />
          <input className="input" placeholder="Valor" />
          <div className="TransactionTypeCotainer">
            <button
              type="button"
              onClick={() => setType("deposit")}
              className={type == "deposit" ? "active1" : ""}
            >
              <img src={incomeIcon} />
              <span>Entrada</span>
            </button>
            <button
              type="button"
              onClick={() => setType("withdraw")}
              className={type == "withdraw" ? "active2" : ""}
            >
              <img src={expensesIcon} />
              <span>Saída</span>
            </button>
          </div>
          <input className="input" placeholder="Categoria" />
          <input className="input" placeholder="Quantidade" />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </Modal>
  );
};
