import totalIcon from "../../assets/totalIcon.png";
import "./../Header/style.css";
import Modal from "react-modal";

export const Header = ({ openModal}) => {
  return (
    <div className="container">
      <div className="content">
        <img src={totalIcon} alt="logo" />
        <button className="btn1" onClick={openModal}>
          Nova transação
        </button>
      </div>
    </div>
  );
};
