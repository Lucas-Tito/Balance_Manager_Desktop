import React, { useContext, useEffect, useState } from "react";
import { Chart, RadialLinearScale, ArcElement, Title, Tooltip } from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { TransactionsContext } from "../../TransactionContext";
import { useLocation, useNavigate } from "react-router-dom";
import { SimpleHeader } from "../Header";
import totalIcon from "../../assets/totalIcon.png";
import menu_icon from "../../assets/menu_icon.svg";
import closeIcon from "../../assets/closeIcon.svg";
import Modal from "react-modal";

Chart.register(RadialLinearScale, ArcElement, Title, Tooltip);

const Charts = () => {
  const [transactions, setTransactions] = useState();
  const location = useLocation();
  let userid = "";

  if (location.state) {
    userid = location.state.userid;
  }

  useEffect(() => {
    fetch(`http://localhost:3000/api/transactions/user/${userid}`)
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, [transactions]);

  let data = {
    labels: transactions?.map((data) => data.description),
    datasets: [
      {
        label: "#",
        data: transactions?.map((data) => data.value),
        backgroundColor: transactions?.map(
          (data) =>
            data.type === "income"
              ? "rgba(68, 138, 255, 0.85)" // Cor para valores positivos
              : "rgba(244, 67, 54, 0.85)" // Cor para valores negativos
        ),
        borderWidth: 0,
      },
    ],
  };
  let options = {
    responsive: true,
    scales: {
      r: {
        suggestedMin: 1,
        suggestedMax: 10,
        grid: {
          display: true,
          color: "#FFFF",
        },
        angleLines: {
          display: true,
          color: "#FFFF",
          lineWidth: 1,
        },
        pointLabels: {
          display: true,
          font: {
            size: 20,
          },
          padding: 0,
          centerPointLabels: true,
        },
        ticks: {
          stepSize: 100,
          font: {
            size: 20,
          },
          color: "#FFFF",
        },
      },
    },
  };
  const navigate = useNavigate();
  //const user = useContext(userContext);
  const [categorias, setCategorias] = useState(); //É o array de custom cateogories
  const [category, setCategory] = useState(""); //É para criar nova custom categorie
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false); // vai fechar e abrir o popup

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

  useEffect(() => {
    if (!categorias) {
      // Verifica se categorias é undefined
      fetch(
        `http://localhost:3000/api/users/categories/65476e639189e58920cdda91`
      )
        .then((response) => response.json())
        .then((data) => {
          setCategorias(data.custom_categories);
        })
        .catch((error) => {
          console.error("Erro ao obter categorias:", error);
        });
    }
  }, []);

  const [mesSelecionado, setMesSelecionado] = useState("");

  const handleChangeMes = (event) => {
    setMesSelecionado(event.target.value);
  };
  const handleChangeCategoria = (event) => {};
  function handleOpenNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(true);
  }
  function handleCloseNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(false);
  }
  const teste = () => {
    console.log(category);
    handleCloseNewTransactionModalOpen();
  };
  return (
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
          <div className="filtro-por-mes">
            <label htmlFor="mes" style={{ color: "white" }}>
              Filtrar por mês:
            </label>
            <select id="mes" value={mesSelecionado} onChange={handleChangeMes}>
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
          <div className="filtro-por-categoria">
            <label htmlFor="categoria" style={{ color: "white" }}>
              Filtrar por categoria:
            </label>
            <select id="categoria" value={""} onChange={handleChangeCategoria}>
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
          </div>
          <button className="btn1" onClick={handleOpenNewTransactionModalOpen}>
            Nova categoria
          </button>
        </div>
      </div>
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
          <h2>Criar categoria</h2>
          <form className="form">
            <input
              className="input"
              placeholder="Categoria"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
            <button type="button" className="buttonTest" onClick={teste}>
              Salvar
            </button>
          </form>
        </div>
      </Modal>
      <div style={{ width: 750, height: 750 }}>
        <PolarArea data={data} options={options} />
      </div>
    </>
  );
};

export default Charts;
