import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function ExpenseHistory() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Load expenses
  async function getExpenses() {
    setLoading(true);

    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error loading expenses:", error);
      alert("Failed to load expenses");
      setLoading(false);
      return;
    }

    setExpenses(data || []);
    setLoading(false);
  }

  useEffect(() => {
    getExpenses();
  }, []);

  // Delete expense
  async function deleteExpense(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      /*
       * Delete the selected expense.
       *
       * select("id") is intentional:
       * it lets us verify that Supabase actually
       * deleted a row.
       */
      const { data, error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", id)
        .select("id");

      if (error) {
        console.error("Supabase delete error:", error);

        alert(
          "Unable to delete expense.\n\n" +
          error.message
        );

        return;
      }

      /*
       * If data is empty, Supabase did not actually
       * delete the row. This usually means an RLS
       * DELETE policy is missing.
       */
      if (!data || data.length === 0) {
        console.error(
          "No expense was deleted. Check Supabase RLS DELETE policy."
        );

        alert(
          "The expense was not deleted.\n\n" +
          "Please check the DELETE policy for the expenses table in Supabase."
        );

        return;
      }

      // Remove the deleted expense from the page
      setExpenses((currentExpenses) =>
        currentExpenses.filter(
          (expense) => expense.id !== id
        )
      );

    } catch (error) {
      console.error("Unexpected delete error:", error);

      alert("Something went wrong while deleting the expense.");
    } finally {
      setDeletingId(null);
    }
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

          <p>
            Add your first expense from the Expense page.
          </p>
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
                      type="button"
                      className="delete-btn"
                      onClick={() =>
                        deleteExpense(expense.id)
                      }
                      disabled={deletingId === expense.id}
                    >
                      {deletingId === expense.id
                        ? "Deleting..."
                        : "Delete"}
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