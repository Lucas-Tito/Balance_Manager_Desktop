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

export const SimpleHeader = () => {
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
    </>
  );
};
