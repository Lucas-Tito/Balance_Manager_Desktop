import React from "react";
import Modal from "react-modal";
import "./style.css";
export const NewTransactionModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <div className="containerModal">
        <h2>Cadastrar transação</h2>
        <form className="form">
          <input className="input" placeholder="Titulo" />
          <input className="input" placeholder="Valor" />
          <input className="input" placeholder="Categoria" />
          <input className="input" placeholder="Quantidade" />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </Modal>
  );
};
