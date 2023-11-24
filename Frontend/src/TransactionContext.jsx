import { createContext, useEffect, useState } from "react";
export const TransactionsContext = createContext({});
export const userContext = createContext("");

export function TransactionsProvider({ children, user }) {
  const [transactions, setTransactions] = useState([]);

  //get all user transactions
  useEffect(() => {
    fetch(`http://localhost:3000/api/transactions/user/${user}`)
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, [transactions]);

  return (
    <TransactionsContext.Provider value={transactions}>
      <userContext.Provider value={user}>{children}</userContext.Provider>
    </TransactionsContext.Provider>
  );
}
