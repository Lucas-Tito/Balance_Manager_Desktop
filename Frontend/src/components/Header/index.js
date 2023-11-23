import totalIcon from "../../assets/totalIcon.png";
import menu_icon from "../../assets/menu_icon.svg";
import "./../Header/style.css";
import searchIcon from "../../assets/search.png";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { userContext } from "../../TransactionContext";
import { useHistory } from "react-router-dom";

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
              className="searchBtn"
              style={{ cursor: "pointer" }}
              src={searchIcon}
              width="34px"
              height="34px"
              onClick={() => navigate("/search", { state: { userid: user } })}
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

export const ChartHeader = () => {
  const navigate = useNavigate();
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const [mesSelecionado, setMesSelecionado] = useState("");

  const handleChange = (event) => {
    setMesSelecionado(event.target.value);
  };
  return (
    <>
      <div className="dropdown">
        <button class="dropbtn">
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
          <div className="filtro-por-mes">
            <label htmlFor="mes" style={{ color: "white" }}>
              Filtrar por mês:
            </label>
            <select id="mes" value={mesSelecionado} onChange={handleChange}>
              <option value="">Selecione um mês</option>
              {meses.map((mes, index) => (
                <option key={index} value={mes}>
                  {mes}
                </option>
              ))}
            </select>

            {mesSelecionado && (
              <div className="resultado-filtro">
                <p>Exibindo dados para {mesSelecionado}</p>
                {/* Adicione aqui a lógica para exibir os dados filtrados */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
