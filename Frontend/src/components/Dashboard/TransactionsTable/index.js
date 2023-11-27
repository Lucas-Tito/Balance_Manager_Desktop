import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import Modal from "react-modal";
import { TransactionsContext, userContext } from "../../../TransactionContext";
import refreshIcon from "../../../assets/refresh_icon.svg";
import incomeIcon from "../../../assets/incomeIcon.png";
import expensesIcon from "../../../assets/expensesIcon.png";
import closeIcon from "../../../assets/closeIcon.svg";

export const TransactionsTable = () => {
  const {transactions, refreshTransaction} = useContext(TransactionsContext);

  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [id, setId] = useState("62342chda");

  function handleOpenNewTransactionModalOpen(key) {
    setIsNewTransactionModalOpen(true);

    fetch(`http://localhost:3000/api/transactions/${key}`)
      .then((response) => response.json())
      .then((data) => {
        setDescription(data.description);
        setCategory(data.category);
        setValue(data.value);
        setType(data.type);
        setId(data._id);
      });
  }

  function update() {
    const newTransaction = {
      description,
      value,
      type,
      category,
    };
    fetch(`http://localhost:3000/api/transactions/${id}`, {
      method: "PUT",
      body: JSON.stringify(newTransaction),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((transactions) => console.log(transactions));

    handleCloseNewTransactionModalOpen();
  }
  function deleteTransaction(id) {
    fetch(`http://localhost:3000/api/transactions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((transactions) => console.log(transactions));
  }

  function handleCloseNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <>
      <div className="containerTable">
        <table className="table">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Data</th>
              <th id="acoes">
                <span>Ações</span>
                <div className="refreshContainer" onClick={refreshTransaction}>              
                  <img
                    className="refreshImg"
                    style={{ cursor: "pointer" }}
                    src={refreshIcon}
                    width="28px"
                    height="28px"
                  />
                </div>

              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((test, key) => {
              return (
                <tr key={key}>
                  <td>{test.description}</td>
                  {test.type === "expenses" ? (
                    <td className={test.type}>
                      -
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(test.value)}
                    </td>
                  ) : (
                    <td className={test.type}>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(test.value)}
                    </td>
                  )}
                  <td>{test.category}</td>
                  <td>
                    {" "}
                    {new Intl.DateTimeFormat("pt-BR").format(
                      new Date(test.createdAt)
                    )}
                  </td>
                  <td className="acoes">
                    <button
                      className="btn-acoes"
                      onClick={() =>
                        handleOpenNewTransactionModalOpen(test._id)
                      }
                    >
                      Editar
                    </button>
                    <button
                      className="btn-acoes"
                      onClick={() => deleteTransaction(test._id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal
          isOpen={isNewTransactionModalOpen}
          onRequestClose={handleCloseNewTransactionModalOpen}
          overlayClassName="react-modal-overlay"
          className="react-modal-content"
        >
          <button
            onClick={handleCloseNewTransactionModalOpen}
            className="react-modal-close"
          >
            <img src={closeIcon} />
          </button>
          <div className="containerModal">
            <h2>Editar</h2>
            <form className="form">
              <input
                className="input"
                placeholder="Titulo"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
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
                  className={type === "income" ? "active1" : ""}
                >
                  <img src={incomeIcon} alt="income" />
                  <span>Entrada</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType("expenses")}
                  className={type === "expenses" ? "active2" : ""}
                >
                  <img src={expensesIcon} alt="expenses" />
                  <span>Saída</span>
                </button>
              </div>
              <input
                className="input"
                placeholder="Categoria"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
              <button type="button" className="buttonTest" onClick={update}>
                Salvar
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};
