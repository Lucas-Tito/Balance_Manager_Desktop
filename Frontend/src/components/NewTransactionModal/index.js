import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import "./style.css";
import incomeIcon from "../../assets/incomeIcon.png";
import expensesIcon from "../../assets/expensesIcon.png";
import closeIcon from "../../assets/closeIcon.svg";
import { TransactionsContext, userContext } from "../../TransactionContext";

export const NewTransactionModal = ({ isOpen, onRequestClose, title, id }) => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(null);
  const [category, setCategory] = useState("");
  const user = useContext(userContext);
<<<<<<< HEAD
  const [categorias, setCategorias] = useState(); //É o array de custom categories

  //preenche o select
  useEffect(() => {
    if (!categorias) {
      // Verifica se categorias é undefined
      fetch(`http://localhost:3000/api/users/categories/${user}`)
        .then((response) => response.json())
        .then((data) => {
          setCategorias(data.custom_categories);
        })
        .catch((error) => {
          console.error("Erro ao obter categorias:", error);
        });
    }
  }, []);
=======
  const {refreshTransaction} = useContext(TransactionsContext);
>>>>>>> 2ed255f2ad74bfddd4984c61feb3fcb1d50b2e9e

  function handleNewTransaction(e) {
    e.preventDefault();
    const data = {
      description,
      value,
      category,
      type,
      user,
    };

    fetch("http://localhost:3000/api/transactions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDescription("");
        setCategory("");
        setType("");
        setValue(null);
        onRequestClose();
        refreshTransaction()
      })
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
        <h2>{title}</h2>
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
          <select
            className="input custom-select"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            {categorias && categorias.length > 0 ? (
              categorias.map((categoria, index) => (
                <option key={index} value={categoria}>
                  {categoria}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Nenhuma categoria encontrada
              </option>
            )}
          </select>
          <button type="submit" onClick={handleNewTransaction}>
            Cadastrar
          </button>
        </form>
      </div>
    </Modal>
  );
};
