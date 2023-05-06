import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import "./App.css";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import ProductList from "./expense-tracker/components/ProductList";

const connect = () => console.log("Connecting");
const disconnect = () => console.log("Disconnecting");

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // this method return a promise
    // An object that holds the eventual result or failure
    // of an asynchronous operation.

    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(res.data);
      } catch (err) {
        console.log(err);
        setError((err as AxiosError).message);
      }
    };

    fetchUsers();

    /** 
    axios
      // get => promise => resp / err
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        console.log(res.data[0].name);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
    */
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  });

  const [category, setCategory] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [expenses, setExpenses] = useState([
    { id: 1, description: "test1", amount: 10, category: "Utilities" },
    { id: 2, description: "test2", amount: 20, category: "Utilities" },
    { id: 3, description: "test3", amount: 20, category: "Utilities" },
    { id: 4, description: "test4", amount: 20, category: "Utilities" },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <div>
      <h2>Expense App</h2>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>

      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
      <div>
        <select
          className="form-select"
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value=""></option>
          <option value="Clothing">Clothing</option>
          <option value="Household">Household</option>
        </select>
        <ProductList category={category} />
      </div>
      <hr />
      <p>Users</p>
      {error && <p className="text-danger">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
