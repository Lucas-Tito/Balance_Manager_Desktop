import totalIcon from "../../assets/totalIcon.png";
import menu_icon from "../../assets/menu_icon.svg";
import "./../Header/style.css";
import Modal from "react-modal";
import searchIcon from "../../assets/search.png";

export const Header = ({ openModal }) => {
  return (
    <>
      <div className="container">
        <input className="search" placeholder="search"></input>
        <button type="button" style={{ cursor: "pointer" }}>
          <img
            src={searchIcon}
            width="34px"
            height="34px"
            className="img-search"
          />
        </button>
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
