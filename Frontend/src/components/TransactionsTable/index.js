import React, { useEffect, useState } from "react";
import "../TransactionsTable/style.css";

export const TransactionsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/transactions")
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
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {data.map((test, key) => {
            return (
              <tr key={key}>
                <td>{test.description}</td>
                {test.type === "expenses" ? (
                  <td className={test.type}>-R${test.value}</td>
                ) : (
                  <td className={test.type}>R${test.value}</td>
                )}
                <td>{test.category}</td>
                <td>{test.createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
