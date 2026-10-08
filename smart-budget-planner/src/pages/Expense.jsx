import { useState } from "react";
import { supabase } from "../supabase";

function Expense() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  async function addExpense() {
    if (!description || !amount || !date) {
      alert("Please fill all details");
      return;
    }

    const { error } = await supabase
      .from("expenses")
      .insert({
        description: description,
        amount: Number(amount),
        category: category,
        date: date
      });

    if (error) {
      console.error("Supabase error:", error);
      alert("Failed to add expense: " + error.message);
      return;
    }

    alert("Expense added successfully!");

    setDescription("");
    setAmount("");
    setCategory("Food");
    setDate("");
  }

  return (
    <main className="page">

      <div className="center-heading">
        <span className="small-title">
          TRACK SPENDING
        </span>

        <h1>Add New Expense</h1>

        <p>
          Record where your money is going.
        </p>
      </div>

      <div className="form-card">

        <div className="form-section-title">
          <span>💳</span>

          <div>
            <h2>Expense Details</h2>
            <p>Enter information about your expense.</p>
          </div>
        </div>

        <label>Description</label>

        <input
          type="text"
          placeholder="Example: Lunch"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Amount</label>

        <div className="input-money">
          <span>₹</span>

          <input
            type="number"
            placeholder="500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <label>Category</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Education</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>

        <label>Date</label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          className="primary-btn save-btn"
          onClick={addExpense}
        >
          Add Expense
        </button>

      </div>

    </main>
  );
}

export default Expense;