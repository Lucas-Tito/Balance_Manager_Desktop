import totalIcon from "../../assets/totalIcon.png";
import menu_icon from "../../assets/menu_icon.svg";
import closeIcon from "../../assets/closeIcon.svg";
import "./../Header/style.css";
import searchIcon from "../../assets/search.png";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../TransactionContext";
import Modal from "react-modal";

export const Header = ({ openModal }) => {
  const navigate = useNavigate();
  const user = useContext(userContext);

  return (
    <>
      <div className="container">
        <div className="dropdown">
          <button class="dropbtn">
            <img src={menu_icon} alt="logo" className="menu_icon" />
            <i className="fa fa-caret-down"></i>
          </button>

          <div className="dropdown-content">
            {
              <>
                <button
                  onClick={() =>
                    navigate("/chart", { state: { userid: user } })
                  }
                >
                  Relatório
                </button>
                <button onClick={() => navigate("/")}>Sair</button>
              </>
            }
          </div>
        </div>

        <div className="content">
          <img src={totalIcon} alt="logo" />

          <div className="searchContainer">
            <input className="searchInput" placeholder="search"></input>

            <img
              style={{ cursor: "pointer" }}
              src={searchIcon}
              width="34px"
              height="34px"
              className="searchBtn"
            />
          </div>

          <button className="btn1" onClick={openModal}>
            Nova transação
          </button>
        </div>
      </div>
    </>
  );
};
