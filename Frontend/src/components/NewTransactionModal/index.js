import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./style.css";
import incomeIcon from "../../assets/incomeIcon.png";
import expensesIcon from "../../assets/expensesIcon.png";
import closeIcon from "../../assets/closeIcon.svg";

export const NewTransactionModal = ({ isOpen, onRequestClose }) => {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");

  function handleNewTransaction(e) {
    e.preventDefault();
    const data = {
      title,
      value,
      category,
      type,
      date: () => {
        const data1 = new Date();
        return data1.getDate();
      },
    };

    fetch("http://localhost:3001/transactions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then(onRequestClose())
      .catch((err) => console.log(err));
  }

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
          <input
            className="input"
            placeholder="Titulo"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            className="input"
            placeholder="Valor"
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
          />
          <div className="TransactionTypeCotainer">
            <button
              type="button"
              onClick={() => setType("income")}
              className={type == "income" ? "active1" : ""}
            >
              <img src={incomeIcon} />
              <span>Entrada</span>
            </button>
            <button
              type="button"
              onClick={() => setType("expenses")}
              className={type == "expenses" ? "active2" : ""}
            >
              <img src={expensesIcon} />
              <span>Saída</span>
            </button>
          </div>
          <input
            className="input"
            placeholder="Categoria"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
          <button type="submit" onClick={handleNewTransaction}>
            Cadastrar
          </button>
        </form>
      </div>
    </Modal>
  );
};
