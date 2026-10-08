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
    if (!income) {
      alert("Please enter your income");
      return;
    }

    const { error } = await supabase
      .from("budgets")
      .insert({
        income: Number(income),
        food: Number(food) || 0,
        transport: Number(transport) || 0,
        shopping: Number(shopping) || 0,
        bills: Number(bills) || 0,
        education: Number(education) || 0
      });

    if (error) {
      console.error("Supabase error:", error);
      alert("Failed to save budget: " + error.message);
      return;
    }

    alert("Budget saved successfully!");

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

        <h1>Create Monthly Budget</h1>

        <p>
          Set spending limits for your monthly expenses.
        </p>
      </div>

      <div className="form-card">

        <div className="form-section-title">
          <span>💰</span>

          <div>
            <h2>Income</h2>
            <p>How much do you earn every month?</p>
          </div>
        </div>

        <label>Monthly Income</label>

        <div className="input-money">
          <span>₹</span>

          <input
            type="number"
            placeholder="50000"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </div>

        <div className="form-section-title category-title">

          <span>📊</span>

          <div>
            <h2>Spending Limits</h2>
            <p>Set a limit for each category.</p>
          </div>

        </div>

        <div className="input-grid">

          <div>
            <label>🍔 Food Budget</label>

            <input
              type="number"
              placeholder="15000"
              value={food}
              onChange={(e) => setFood(e.target.value)}
            />
          </div>

          <div>
            <label>🚗 Transport Budget</label>

            <input
              type="number"
              placeholder="10000"
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
            />
          </div>

          <div>
            <label>🛍️ Shopping Budget</label>

            <input
              type="number"
              placeholder="10000"
              value={shopping}
              onChange={(e) => setShopping(e.target.value)}
            />
          </div>

          <div>
            <label>🏠 Bills Budget</label>

            <input
              type="number"
              placeholder="20000"
              value={bills}
              onChange={(e) => setBills(e.target.value)}
            />
          </div>

          <div>
            <label>📚 Education Budget</label>

            <input
              type="number"
              placeholder="20000"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </div>

        </div>

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