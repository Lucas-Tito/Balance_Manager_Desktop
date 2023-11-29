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


export const SearchHeader = ({ isOpen, onRequestClose, title, id })=>{
    const navigate = useNavigate();


    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSearchClick = () => {
        //toggle search popup
        setIsSearchOpen(!isSearchOpen)
    }
    


    //FORM FUNCTIONS
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState("");
    
    const user = useContext(userContext);
  
    function handleSearch(e) {
      e.preventDefault();
      const data = {
        description,
        value,
        category,
        type,
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
          setDescription("");
          setCategory("");
          setType("");
          setValue(0);
          onRequestClose();
          console.log("sus");
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
    return(
        <>
            <div className="dropdown">
                <button className="dropbtn">
                    <img src={menu_icon} alt="logo" className="menu_icon" />
                    <i className="fa fa-caret-down"></i>
                </button>

                <div className="dropdown-content">
                    {
                        <>
                            <button onClick={() => navigate(-1)}>Home</button>
                            <button onClick={() => navigate("/")}>Sair</button>
                        </>
                    }
                </div>
            </div>

            <div className="containerSimple">
                <div className="contentSimple">
                    <img src={totalIcon} alt="logo" />
                    
                    <div className="searchContainer">
                        <input className="searchInput" placeholder="search"></input>

                        <img
                            className="searchBtn"
                            style={{ cursor: "pointer" }}
                            src={searchIcon}
                            width="34px"
                            height="34px"
                            onClick={handleSearchClick}
                        />
                    </div>
                </div>
            </div>







            <Modal
                isOpen={isSearchOpen}
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
            >
                <button onClick={handleSearchClick} className="react-modal-close">
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
                        <input
                            className="input"
                            placeholder="Categoria"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                        />

                        <input
                            type="date"
                            className="input"
                            placeholder="Valor"
                            // value={}
                            // onChange={(event) => setValue(Number(event.target.value))}
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