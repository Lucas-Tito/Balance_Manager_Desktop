import React, { useContext } from "react";
import "./style.css";
import incomeIcon from "../../assets/incomeIcon.png";
import expensesIcon from "../../assets/expensesIcon.png";
import totalIcon from "../../assets/totalIcon.png";
import { TransactionsContext } from "../../TransactionContext";
import 'intro.js/introjs.css';
import { Steps } from 'intro.js-react';
import {useState} from 'react';

export const Sumary = () => {
  const transactions = useContext(TransactionsContext);

  const sumary = transactions.reduce(
    (acc, transactions) => {
      if (transactions.type === "income") {
        acc.income += transactions.value;
        acc.total += transactions.value;
      } else {
        acc.expenses += transactions.value;
        acc.total -= transactions.value;
      }
      return acc;
    },
    {
      income: 0,
      expenses: 0,
      total: 0,
    }
  );

  //Onboarding code
  const [enabled, setEnabled] = useState(true)
  const [initialStep, setInitialStep] = useState(0)

  const onExit = () => {};
  const steps = [
    {
      element: '.containerSumary',
      intro: 'Aqui você encontrará a situação atual do seu montante',
      position: 'top',
    },
  ];
  


  return (
    <>

      <div className="containerSumary">
            {/* Onboarding component */}
        <Steps
          enabled={true}
          steps={steps}
          initialStep={0}
          onExit={onExit}
        />

        <div className="box">
          <header className="header">
            <p>Entradas</p>
            <img src={incomeIcon} alt="incomeIcone" />
          </header>
          <strong className="strong">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(sumary.income)}
          </strong>
        </div>
        <div className="box">
          <header className="header">
            <p>Saídas</p>
            <img src={expensesIcon} alt="expenses" />
          </header>
          <strong className="strong">
            {" "}
            -{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(sumary.expenses)}
          </strong>
        </div>
        <div className="boxTotal">
          <header className="header">
            <p>Total</p>
            <img src={totalIcon} alt="total" />
          </header>
          <strong className="strong">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(sumary.total)}
          </strong>
        </div>
      </div>
    </>
  );
};
