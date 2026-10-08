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

    const budget = {
      income: Number(income),
      food: Number(food) || 0,
      transport: Number(transport) || 0,
      shopping: Number(shopping) || 0,
      bills: Number(bills) || 0,
      education: Number(education) || 0
    };

    const { error } = await supabase
      .from("budgets")
      .insert([budget]);

    if (error) {
      console.error(error);
      alert("Failed to save budget");
      return;
    }

    localStorage.setItem("budget", JSON.stringify(budget));

    alert("Budget saved successfully!");

    setIncome("");
    setFood("");
    setTransport("");
    setShopping("");
    setBills("");
    setEducation("");
  }

  return (
    <div className="budget-container">
      <h1>Set Your Budget</h1>

      <input
        type="number"
        placeholder="Income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />

      <input
        type="number"
        placeholder="Food"
        value={food}
        onChange={(e) => setFood(e.target.value)}
      />

      <input
        type="number"
        placeholder="Transport"
        value={transport}
        onChange={(e) => setTransport(e.target.value)}
      />

      <input
        type="number"
        placeholder="Shopping"
        value={shopping}
        onChange={(e) => setShopping(e.target.value)}
      />

      <input
        type="number"
        placeholder="Bills"
        value={bills}
        onChange={(e) => setBills(e.target.value)}
      />

      <input
        type="number"
        placeholder="Education"
        value={education}
        onChange={(e) => setEducation(e.target.value)}
      />

      <button onClick={saveBudget}>
        Save Budget
      </button>
    </div>
  );
}

export default Budget;