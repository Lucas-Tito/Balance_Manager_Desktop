import React, { useContext, useEffect, useState } from "react";
import { Chart, RadialLinearScale, ArcElement, Title, Tooltip } from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { TransactionsContext } from "../../TransactionContext";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
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

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "#",
        data: [],
        backgroundColor: [],
        borderWidth: 0,
      },
    ],
  });
  const [data2, setData2] = useState({
    labels: [],
    datasets: [
      {
        label: "#",
        data: [],
        backgroundColor: [],
        borderWidth: 0,
      },
    ],
  });

  useEffect(() => {
    fetch(`http://localhost:3000/api/transactions/user/${userid}`)
      .then((response) => response.json())
      .then((data) => {
        const expenseData = data.filter((item) => item.type === "expenses");
        const newData = {
          labels: expenseData.map((item) => item.description),
          datasets: [
            {
              label: "#",
              data: expenseData.map((item) => item.value),
              backgroundColor: "rgba(244, 67, 54, 0.85)",
              borderWidth: 0,
            },
          ],
        };

        setData(newData);
      })
      .catch((error) => {
        console.error("Erro ao obter transações:", error);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:3000/api/transactions/user/${userid}`)
      .then((response) => response.json())
      .then((data) => {
        const expenseData = data.filter((item) => item.type === "income");

        const newData2 = {
          labels: expenseData.map((item) => item.description),
          datasets: [
            {
              label: "#",
              data: expenseData.map((item) => item.value),
              backgroundColor: "rgba(68, 138, 255, 0.85)",
              borderWidth: 0,
            },
          ],
        };

        setData2(newData2);
      })
      .catch((error) => {
        console.error("Erro ao obter transações:", error);
      });
  }, []);
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
  const [categorias, setCategorias] = useState(); //É o array de custom categories
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

  const converterMesParaNumero = (nomeDoMes) => {
    const index = meses.indexOf(nomeDoMes);
    // Adicione +1 porque os meses em JavaScript começam do zero (janeiro é 0, fevereiro é 1, etc.)
    return index !== -1 ? index + 1 : null;
  };

  //preenche o filtro
  useEffect(() => {
    if (!categorias) {
      // Verifica se categorias é undefined
      fetch(`http://localhost:3000/api/users/categories/${userid}`)
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
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const handleChangeMes = (event) => {
    setMesSelecionado(event.target.value);
    let mes = converterMesParaNumero(event.target.value);
    setShouldRender(false);
    fetch(
      `http://localhost:3000/api/transactions/searchByMonth/${userid}?monthYear=2023-${mes}`
    )
      .then((response) => response.json())
      .then((data) => {
        const uniqueLabelsSet = new Set(
          data.map((item) => format(new Date(item.createdAt), "yyyy-MMMM"))
        );

        // Convertendo o conjunto de volta para uma matriz
        const uniqueLabels = Array.from(uniqueLabelsSet);
        const newData = {
          labels: uniqueLabels,
          datasets: [
            {
              label: "#",
              data: data.map((item) => item.value),
              backgroundColor: data.map((item) =>
                item.type === "income"
                  ? "rgba(68, 138, 255, 0.85)"
                  : "rgba(244, 67, 54, 0.85)"
              ),
              borderWidth: 0,
            },
          ],
        };
        setData(newData);
        setCategoriaSelecionada("");
      })
      .catch((error) => {
        console.error("Erro ao obter categorias:", error);
      });
  };
  //muda o grafico para a categoria selecionada
  const handleChangeCategoria = (event) => {
    setCategoriaSelecionada(event.target.value);
    setShouldRender(true);
    fetch(
      `http://localhost:3000/api/transactions/searchByCate/${userid}?cate=${event.target.value}`
    )
      .then((response) => response.json())
      .then((data) => {
        const allMonths = Array.from(
          new Set(
            data.map((item) => format(new Date(item.createdAt), "yyyy-MMMM"))
          )
        );

        const sumOfValues = allMonths.map((month) => {
          const valuesForMonth = data
            .filter(
              (item) =>
                format(new Date(item.createdAt), "yyyy-MMMM") === month &&
                item.type === "expenses"
            )
            .map((item) => item.value);

          return valuesForMonth.length > 0
            ? valuesForMonth.reduce((acc, value) => acc + value)
            : 0;
        });

        const newData = {
          labels: allMonths,
          datasets: [
            {
              label: "#",
              data: sumOfValues,
              backgroundColor: "rgba(244, 67, 54, 0.85)",
              borderWidth: 0,
            },
          ],
        };
        setData(newData);
        setMesSelecionado("");
      })
      .catch((error) => {
        console.error("Erro ao obter categorias:", error);
      });
    fetch(
      `http://localhost:3000/api/transactions/searchByCate/${userid}?cate=${event.target.value}`
    )
      .then((response) => response.json())
      .then((data) => {
        const allMonths = Array.from(
          new Set(
            data.map((item) => format(new Date(item.createdAt), "yyyy-MMMM"))
          )
        );

        const sumOfValues = allMonths.map((month) => {
          const valuesForMonth = data
            .filter(
              (item) =>
                format(new Date(item.createdAt), "yyyy-MMMM") === month &&
                item.type === "income"
            )
            .map((item) => item.value);

          return valuesForMonth.length > 0
            ? valuesForMonth.reduce((acc, value) => acc + value)
            : 0;
        });

        const newData2 = {
          labels: allMonths,
          datasets: [
            {
              label: "#",
              data: sumOfValues,
              backgroundColor: "rgba(68, 138, 255, 0.85)",
              borderWidth: 0,
            },
          ],
        };
        setData2(newData2);
        setMesSelecionado("");
      })
      .catch((error) => {
        console.error("Erro ao obter categorias:", error);
      });
  };
  function handleOpenNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(true);
  }
  function handleCloseNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(false);
  }
  const handleClose = () => {
    handleCloseNewTransactionModalOpen();
  };
  const [shouldRender, setShouldRender] = useState(true);
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
            <select
              id="categoria"
              value={categoriaSelecionada}
              onChange={handleChangeCategoria}
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
            {categoriaSelecionada && (
              <div className="resultado-filtro">
                <p>Exibindo dados para {categoriaSelecionada}</p>
                {/* Adicione aqui a lógica para exibir os dados filtrados */}
              </div>
            )}
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
            <button type="button" className="buttonTest" onClick={handleClose}>
              Salvar
            </button>
          </form>
        </div>
      </Modal>
      <div style={{ display: "flex", width: 750, height: 750 }}>
        <PolarArea data={data} options={options} />
        {shouldRender ? <PolarArea data={data2} options={options} /> : null}
      </div>
    </>
  );
};

export default Charts;
