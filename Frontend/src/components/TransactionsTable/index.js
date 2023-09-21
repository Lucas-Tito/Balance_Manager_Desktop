import React from "react";
import "../TransactionsTable/style.css";
export const TransactionsTable = () => {
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
          <tr>
            <td>Venda de livros</td>
            <td className="deposit">R$200,00</td>
            <td>Comida</td>
            <td>null</td>
            <td>21/09/23</td>
          </tr>
          <tr>
            <td>Aluguel</td>
            <td className="withdraw">-R$300,00</td>
            <td>Comida</td>
            <td>null</td>
            <td>10/09/23</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
