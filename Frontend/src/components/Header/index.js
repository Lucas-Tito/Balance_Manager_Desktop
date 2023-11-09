import totalIcon from "../../assets/totalIcon.png";
import menu_icon from "../../assets/menu_icon.svg";
import "./../Header/style.css";
import Modal from "react-modal";
import searchIcon from "../../assets/search.png";
import { useNavigate } from "react-router-dom";

export const Header = ({ openModal }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <input className="search" placeholder="search"></input>
        <img
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/chart")}
          src={searchIcon}
          width="34px"
          height="34px"
          className="img-search"
        />
        <img src={menu_icon} alt="logo" className="menu_icon" />
        <div className="content">
          <img src={totalIcon} alt="logo" />
          <button className="btn1" onClick={openModal}>
            Nova transação
          </button>
        </div>
      </div>
    </>
  );
};
