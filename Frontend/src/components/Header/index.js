import totalIcon from "../../assets/totalIcon.png";
import menu_icon from "../../assets/menu_icon.svg"
import "./../Header/style.css";
import Modal from "react-modal";

export const Header = ({ openModal}) => {
  return (
    <div className="container">
      <img src={menu_icon} alt="logo" className="menu_icon"/>
      <div className="content">
        <img src={totalIcon} alt="logo" />
        <button className="btn1" onClick={openModal}>
          Nova transação
        </button>
      </div>
    </div>
  );
};
