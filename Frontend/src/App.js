import logo from "./logo.svg";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import Modal from "react-modal";
import React, { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import "./index.css";
import {
  TransactionsContext,
  TransactionsProvider,
} from "./TransactionContext";
import { useLocation } from "react-router-dom";

Modal.setAppElement("#root");

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(true);
  }
  function handleCloseNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(false);
  }

  const location = useLocation();
  let userid = "";

  if (location.state) {
    userid = location.state.userid;
  }
  return (
    <TransactionsProvider user={userid}>
      <Header openModal={handleOpenNewTransactionModalOpen} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        title={"Cadastrar transação"}
        onRequestClose={handleCloseNewTransactionModalOpen}
      />
    </TransactionsProvider>
  );
}

export default App;
