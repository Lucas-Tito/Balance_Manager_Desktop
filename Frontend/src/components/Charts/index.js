import React, { useContext, useEffect, useState } from "react";
import {
  Chart,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
} from "chart.js/auto";
import { PolarArea, Doughnut } from "react-chartjs-2";
import { TransactionsContext } from "../../TransactionContext";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import totalIcon from "../../assets/totalIcon.png";
import menu_icon from "../../assets/menu_icon.svg";
import closeIcon from "../../assets/closeIcon.svg";
import Modal from "react-modal";
import DoughnutChart from "./DoughnutChart";
import "./style.css";
import BarChart from "./BarChart";

Chart.register(RadialLinearScale, ArcElement, Title, Tooltip);

const Charts = () => {
  const [transactions, setTransactions] = useState();
  const location = useLocation();
  let userid = "";

  //Month chart will appear when you filter by category
  const [showMonthChart, setShowMonthChart] = useState(false);

  if (location.state) {
    userid = location.state.userid;
  }

  const [expenseData, setExpenseData] = useState({
    //labels that represents each bar from chart
    labels: [],
    datasets: [
      {
        //this label show up when hovering the mouse the bar representing the data
        label: "#",
        //value of each bar
        data: [],
        backgroundColor: [],
        borderWidth: 0,
      },
    ],
  });

  const [incomeData, setIncomeData] = useState({
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

  /**
   * Those two first useEffects are for the initial two charts that appear
   */
  useEffect(() => {
    fetch(
      `http://localhost:3000/api/transactions/sumup/category/${userid}?type=income`
    )
      .then((response) => response.json())
      .then((data) => {
        const incomeData = data;

        const newData = {
          labels: incomeData.map((item) => item.category),
          datasets: [
            {
              label: incomeData.map((item) => item.category),
              data: incomeData.map((item) => item.sum),
              backgroundColor: [
                "rgba(75,192,192,1)",
                "#4CAF50",
                "#3498db",
                "#e67e22",
                "#9b59b6",
              ],
              borderWidth: 0,
            },
          ],
        };

        setIncomeData(newData);
      })
      .catch((error) => {
        console.error("Erro ao obter transações:", error);
      });
  }, []);

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/transactions/sumup/category/${userid}?type=expenses`
    )
      .then((response) => response.json())
      .then((data) => {
        const expenseData = data;

        const newData2 = {
          labels: expenseData.map((item) => item.category),
          datasets: [
            {
              label: expenseData.map((item) => item.category),
              data: expenseData.map((item) => item.sum),
              backgroundColor: [
                "rgba(244, 67, 54, 0.85)",
                "#b00c0c",
                "#630404",
                "#f76868",
                "#cc4949",
              ],
              borderWidth: 0,
            },
          ],
        };

        setExpenseData(newData2);
      })
      .catch((error) => {
        console.error("Erro ao obter transações:", error);
      });
  }, []);

  //options is related to the chart's style
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
    console.log("amongus");

    setShouldRender(false);
    setShowMonthChart(false);

    fetch(
      `http://localhost:3000/api/transactions/searchByMonth/${userid}?monthYear=2023-${mes}`
    )
      .then((response) => response.json())
      .then((data) => {
        const uniqueLabelsSet = new Set(
          data.map((item) => format(new Date(item.createdAt), "yyyy-MMMM"))
        );
        // Filtrar os dados por tipo
        const incomes = data.filter((item) => item.type === "income");
        const expenses = data.filter((item) => item.type === "expenses");

        // Calcular a soma dos valores para cada tipo
        const sumOfIncomes = incomes.reduce((sum, item) => sum + item.value, 0);
        const sumOfExpenses = expenses.reduce(
          (sum, item) => sum + item.value,
          0
        );
        console.log(sumOfIncomes);

        // Convertendo o conjunto de volta para uma matriz
        const uniqueLabels = Array.from(uniqueLabelsSet);
        const newData = {
          labels: uniqueLabels,
          datasets: [
            {
              label: "#",
              data: [sumOfIncomes, sumOfExpenses],
              backgroundColor: [
                "rgba(68, 138, 255, 0.85)",
                "rgba(244, 67, 54, 0.85)",
              ], // Cores para incomes e expenses

              borderWidth: 0,
            },
          ],
        };
        setIncomeData(newData);
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
    setShowMonthChart(true);
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
        console.log(sumOfValues);
        const newData = {
          labels: allMonths,
          datasets: [
            {
              label: allMonths,
              data: sumOfValues,
              backgroundColor: [
                "rgba(244, 67, 54, 0.85)",
                "#b00c0c",
                "#630404",
                "#f76868",
                "#cc4949",
              ],
              borderWidth: 0,
            },
          ],
        };
        setExpenseData(newData);
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
              label: allMonths,
              data: sumOfValues,
              backgroundColor: [
                "rgba(75,192,192,1)",
                "#4CAF50",
                "#3498db",
                "#e67e22",
                "#9b59b6",
              ],
              borderWidth: 0,
            },
          ],
        };
        setIncomeData(newData2);
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
  const handleRefresh = () => {
    window.location.reload();
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
            <select
              className="input custom-select"
              id="mes"
              value={mesSelecionado}
              onChange={handleChangeMes}
            >
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
              className="input custom-select"
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

      {/**CHART SECTION
       * if ShowMonthChart is true, the bar chart of month will be shown
       * else, the doughnut chart will be the one in display
       */}

      {showMonthChart ? (
        <div className="chart_div" style={{ width: 500, height: 500 }}>
          <div className="single_chart">
            <h1>Entrada</h1>
            <BarChart data={incomeData} options={options} />
          </div>
          <div className="single_chart">
            <h1>Saída</h1>
            {shouldRender ? (
              <BarChart data={expenseData} options={options} />
            ) : null}
          </div>
        </div>
      ) : (
        <div className="chart_div" style={{ width: 500, height: 500 }}>
          <div className="single_chart">
            <h1>Entrada</h1>
            <DoughnutChart data={incomeData} options={options} />
          </div>
          <div className="single_chart">
            <h1>Saída</h1>
            {shouldRender ? (
              <DoughnutChart data={expenseData} options={options} />
            ) : null}
          </div>
        </div>
      )}

      <button className="button_refresh" onClick={handleRefresh}>
        Refresh
      </button>
    </>
  );
};

export default Charts;
