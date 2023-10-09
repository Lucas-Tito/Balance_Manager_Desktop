import { createContext, useEffect, useState } from "react";
export const TransactionsContext = createContext({});

export function TransactionsProvider({ children,test }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/transactions/user/65209e354d0e12e478ac7b90")
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, [transactions]);

  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  );
}
