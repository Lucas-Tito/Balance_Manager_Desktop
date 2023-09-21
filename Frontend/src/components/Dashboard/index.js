import React from "react";
import "./style.css";
import { Sumary } from "../Sumary";
import { TransactionsTable } from "../TransactionsTable";

export const Dashboard = () => {
  return (
    <>
      <div className="containerDash">
        <Sumary />
        <TransactionsTable />
      </div>
    </>
  );
};
