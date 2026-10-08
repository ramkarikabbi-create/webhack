import { useState } from "react";
import { supabase } from "../supabase";

function Budget() {
  const [income, setIncome] = useState("");
  const [food, setFood] = useState("");
  const [transport, setTransport] = useState("");
  const [shopping, setShopping] = useState("");
  const [bills, setBills] = useState("");
  const [education, setEducation] = useState("");

  async function saveBudget() {
    // Income is required
    if (!income || Number(income) <= 0) {
      alert("Please enter a valid income");
      return;
    }

    const budget = {
      income: Number(income),
      food: Number(food) || 0,
      transport: Number(transport) || 0,
      shopping: Number(shopping) || 0,
      bills: Number(bills) || 0,
      education: Number(education) || 0
    };

    // Save budget to Supabase
    const { error } = await supabase
      .from("budgets")
      .insert([budget]);

    if (error) {
      console.error("Budget error:", error);
      alert("Failed to save budget");
      return;
    }

    // Save budget locally so Dashboard can use it
    localStorage.setItem("budget", JSON.stringify(budget));

    alert("Budget saved successfully!");

    // Clear form
    setIncome("");
    setFood("");
    setTransport("");
    setShopping("");
    setBills("");
    setEducation("");
  }

  return (
    <main className="page">

      <div className="center-heading">
        <span className="small-title">
          PLAN YOUR MONEY
        </span>

        <h1>Set Your Budget</h1>

        <p>
          Set your income and spending limits for the month.
        </p>
      </div>

      <div className="form-card">

        <label>Monthly Income</label>

        <input
          type="number"
          placeholder="Example: 20000"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />

        <label>Food Budget</label>

        <input
          type="number"
          placeholder="Example: 4000"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />

        <label>Transport Budget</label>

        <input
          type="number"
          placeholder="Example: 2000"
          value={transport}
          onChange={(e) => setTransport(e.target.value)}
        />

        <label>Shopping Budget</label>

        <input
          type="number"
          placeholder="Example: 3000"
          value={shopping}
          onChange={(e) => setShopping(e.target.value)}
        />

        <label>Bills Budget</label>

        <input
          type="number"
          placeholder="Example: 2000"
          value={bills}
          onChange={(e) => setBills(e.target.value)}
        />

        <label>Education Budget</label>

        <input
          type="number"
          placeholder="Example: 3000"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        />

        <button
          className="primary-btn save-btn"
          onClick={saveBudget}
        >
          Save Budget
        </button>

      </div>

    </main>
  );
}

export default Budget;