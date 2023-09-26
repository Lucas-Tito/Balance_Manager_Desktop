import React, { useEffect, useState } from "react";
import "../TransactionsTable/style.css";

export const TransactionsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/transactions")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [data]);

  return (
    <div className="containerTable">
      <table className="table">
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Quantidade</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {data.map((test, key) => {
            return (
              <tr key={key}>
                <td>{test.title}</td>
                {test.type === "withdraw" ? (
                  <td className={test.type}>-R${test.amount}</td>
                ) : (
                  <td className={test.type}>R${test.amount}</td>
                )}
                <td>{test.category}</td>
                <td>{test.quantity}</td>
                <td>21/09/23</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};