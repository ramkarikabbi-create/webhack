import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function ExpenseHistory() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getExpenses() {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error(error);
      alert("Failed to load expenses");
      return;
    }

    setExpenses(data);
    setLoading(false);
  }

  useEffect(() => {
    getExpenses();
  }, []);

  async function deleteExpense(id) {
    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to delete expense");
      return;
    }

    setExpenses(
      expenses.filter((expense) => expense.id !== id)
    );
  }

  if (loading) {
    return (
      <main className="page">
        <h1>Loading expenses...</h1>
      </main>
    );
  }

  return (
    <main className="page">
      <h1>📜 Expense History</h1>

      {expenses.length === 0 ? (
        <div className="card">
          <h3>No expenses found.</h3>
          <p>Add your first expense from the Expense page.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.date}</td>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>₹{expense.amount}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteExpense(expense.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default ExpenseHistory;