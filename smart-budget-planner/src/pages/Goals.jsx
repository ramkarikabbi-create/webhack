import { useState } from "react";
import { supabase } from "../supabase";

function Goals() {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");

  async function saveGoal() {
    if (!name || !target || !saved) {
      alert("Please fill all details");
      return;
    }

    const goal = {
      goal_name: name,
      target_amount: Number(target),
      saved_amount: Number(saved)
    };

    console.log("Saving goal:", goal);

    const { data, error } = await supabase
      .from("goals")
      .insert([goal])
      .select();

    if (error) {
      console.error("SUPABASE GOAL ERROR:", error);

      alert(
        "Failed to save goal:\n\n" +
        error.message
      );

      return;
    }

    console.log("Goal saved:", data);

    alert("Goal saved successfully!");

    setName("");
    setTarget("");
    setSaved("");
  }

  return (
    <main className="page">

      <div className="center-heading">
        <span className="small-title">
          PLAN YOUR FUTURE
        </span>

        <h1>🎯 Financial Goal</h1>

        <p>
          Set a target and track your savings progress.
        </p>
      </div>

      <div className="form-card">

        <div className="form-section-title">
          <span>🎯</span>

          <div>
            <h2>Create a Goal</h2>
            <p>Enter your savings goal details.</p>
          </div>
        </div>

        <label>Goal Name</label>

        <input
          type="text"
          placeholder="Example: New Laptop"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Target Amount</label>

        <div className="input-money">
          <span>₹</span>

          <input
            type="number"
            placeholder="60000"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>

        <label>Amount Saved</label>

        <div className="input-money">
          <span>₹</span>

          <input
            type="number"
            placeholder="25000"
            value={saved}
            onChange={(e) => setSaved(e.target.value)}
          />
        </div>

        <button
          className="primary-btn save-btn"
          onClick={saveGoal}
        >
          🎯 Save Goal
        </button>

      </div>

    </main>
  );
}

export default Goals;