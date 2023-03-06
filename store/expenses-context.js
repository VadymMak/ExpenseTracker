import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2022-03-12"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2023-10-02"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 19.99,
    date: new Date("2022-14-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 10.99,
    date: new Date("2022-19-05"),
  },
  {
    id: "e5",
    description: "A took",
    amount: 10.99,
    date: new Date("2023-14-05"),
  },
  {
    id: "e6",
    description: "A look",
    amount: 10.99,
    date: new Date("2022-05-05"),
  },
  {
    id: "e7",
    description: "A sok",
    amount: 10.99,
    date: new Date("2023-11-05"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
    case "UPDATE":
      return state.map((expense) =>
        expense.id !== action.payload.id
          ? { ...expense }
          : {
              id: expense.id,
              ...action.payload.data,
            }
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
