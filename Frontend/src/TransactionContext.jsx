import { createContext, useEffect, useState } from "react";
export const TransactionsContext = createContext({});
export const userContext = createContext("");

export function TransactionsProvider({ children, user }) {
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false)

  /**
   * doesn't matter wheter refresh is true or not
   * it only act as an trigger
   */
  const refreshTransaction = () =>{
    setRefresh(!refresh)
  }

  const changeTransactions = (newTransactions) => {
    setTransactions(newTransactions);
  };

  /**
   * get all user transactions
   * it's triggered the fisrt time the user enters the app
   * and can be triggered by the refresh attribute
   */
  useEffect(() => {
    fetch(`http://localhost:3000/api/transactions/user/${user}`)
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, [refresh]);

  return (
    <TransactionsContext.Provider value={{transactions, changeTransactions, refreshTransaction}}>
      <userContext.Provider value={user}>{children}</userContext.Provider>
    </TransactionsContext.Provider>
  );
}
