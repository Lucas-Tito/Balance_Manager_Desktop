import "./../Header/style.css";
import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import incomeIcon from "../../assets/incomeIcon.png";
import expensesIcon from "../../assets/expensesIcon.png";
import closeIcon from "../../assets/closeIcon.svg";
import { TransactionsContext } from "../../TransactionContext";
import Modal from "react-modal";

export const SearchModal = ({ user, isSearchOpen, handleIsSearchOpen }) => {
  const [searchDescription, setSearchDescription] = useState("");
  const [searchValue, setSearchValue] = useState(null);
  const [searchType, setSearchType] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { changeTransactions } = useContext(TransactionsContext);

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

  function aa() {
    setEndDate(new Date());
  }
  function handleSearch(e) {
    e.preventDefault();

    const data = {
      searchDescription,
      searchValue,
      searchCategory,
      searchType,
      startDate,
      endDate,
    };

    console.log(data);
    fetch(`http://localhost:3000/api/transactions/complexSearch/${user}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setSearchDescription("");
        setSearchCategory("");
        setSearchType("");
        setSearchValue(null);
        setStartDate("");
        setEndDate("");
        handleIsSearchOpen(false);

        console.log(data);
        //function that change the table transaction
        //it changes the transactionContext that the table consumes
        changeTransactions(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Modal
        isOpen={isSearchOpen}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button onClick={handleIsSearchOpen} className="react-modal-close">
          <img src={closeIcon} />
        </button>
        <div className="containerModal">
          <h2>Search</h2>
          <form className="form">
            <input
              className="input"
              placeholder="Titulo"
              value={searchDescription}
              onChange={(event) => setSearchDescription(event.target.value)}
            />
            <input
              className="input"
              placeholder="Valor"
              value={searchValue}
              onChange={(event) => setSearchValue(Number(event.target.value))}
            />
            <div className="TransactionTypeCotainer">
              <button
                type="button"
                onClick={() => setSearchType("income")}
                className={searchType === "income" ? "active1" : ""}
              >
                <img src={incomeIcon} alt="income" />
                <span>Entrada</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchType("expenses")}
                className={searchType === "expenses" ? "active2" : ""}
              >
                <img src={expensesIcon} alt="expenses" />
                <span>Saída</span>
              </button>
            </div>
            <select
              className="input custom-select"
              value={searchCategory}
              onChange={(event) => setSearchCategory(event.target.value)}
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
            <span className="date_span">Data de Início</span>
            <input
              type="date"
              className="input"
              placeholder="Valor"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />

            <span className="date_span">Data Final</span>
            <input
              type="date"
              className="input"
              placeholder="Valor"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
            <button type="submit" onClick={handleSearch}>
              Pesquisar
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};
