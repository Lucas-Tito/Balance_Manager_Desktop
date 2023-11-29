import React, { useEffect, useState } from "react";
import "../Dashboard/TransactionsTable/style.css";

export const SearchTable = () => {
  const [tableData, setTableData] = useState([])

  return (
      <>
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
                      {tableData.map((test, key) => {
                          return (
                              <tr key={key}>
                                  <td>{test.description}</td>
                                  {test.type === "expenses" ? (
                                      <td className={test.type}>
                                          -
                                          {new Intl.NumberFormat("pt-BR", {
                                              style: "currency",
                                              currency: "BRL",
                                          }).format(test.value)}
                                      </td>
                                  ) : (
                                      <td className={test.type}>
                                          {new Intl.NumberFormat("pt-BR", {
                                              style: "currency",
                                              currency: "BRL",
                                          }).format(test.value)}
                                      </td>
                                  )}
                                  <td>{test.category}</td>
                                  <td>
                                      {" "}
                                      {new Intl.DateTimeFormat("pt-BR").format(
                                          new Date(test.createdAt)
                                      )}
                                  </td>
                              </tr>
                          );
                      })}
                  </tbody>
              </table>


          </div>
      </>
  );
};
