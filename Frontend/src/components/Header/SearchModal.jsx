import totalIcon from "../../assets/totalIcon.png";
import menu_icon from "../../assets/menu_icon.svg";
import searchIcon from "../../assets/search.png";
import "./../Header/style.css";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../TransactionContext";
import "./style.css";
import incomeIcon from "../../assets/incomeIcon.png";
import expensesIcon from "../../assets/expensesIcon.png";
import closeIcon from "../../assets/closeIcon.svg";
import Modal from "react-modal";


export const SearchModal = ({isSearchOpen, handleIsSearchOpen}) =>{
    
    const [searchDescription, setSearchDescription] = useState("");
    const [searchValue, setSearchValue] = useState(0);
    const [searchType, setSearchType] = useState("");
    const [searchCategory, setSearchCategory] = useState("");

    const user = null

    function handleSearch(e) {
        e.preventDefault();
        const data = {
          searchDescription,
          searchValue,
          searchCategory,
          searchType,
          user
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
            setSearchValue(0);
            handleIsSearchOpen(false);
            console.log("sus");
            console.log(data);
          })
          .catch((err) => console.log(err));
      }


    return(
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
                            onChange={(event) => setSearchDescription(event.target.searchValue)}
                        />
                        <input
                            className="input"
                            placeholder="Valor"
                            value={searchValue}
                            onChange={(event) => setSearchValue(Number(event.target.searchValue))}
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
                        <input
                            className="input"
                            placeholder="Categoria"
                            value={searchCategory}
                            onChange={(event) => setSearchCategory(event.target.searchValue)}
                        />

                        <input
                            type="date"
                            className="input"
                            placeholder="Valor"
                        // value={}
                        // onChange={(event) => setSearchValue(Number(event.target.searchValue))}
                        />
                        <button type="submit" onClick={handleSearch}>
                            Pesquisar
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    )
}