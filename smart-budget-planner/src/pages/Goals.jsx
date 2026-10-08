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

    const { error } = await supabase
      .from("goals")
      .insert([
        {
          goal_name: name,
          target_amount: Number(target),
          saved_amount: Number(saved)
        }
      ]);

    if (error) {
      console.error(error);
      alert("Failed to save goal");
      return;
    }

    alert("Goal saved successfully!");

    setName("");
    setTarget("");
    setSaved("");
  }

  return (
    <main className="page">
      <h1>🎯 Financial Goal</h1>

      <div className="form-card">

        <label>Goal Name</label>

        <input
          type="text"
          placeholder="Example: New Laptop"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Target Amount</label>

        <input
          type="number"
          placeholder="₹60000"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />

        <label>Amount Saved</label>

        <input
          type="number"
          placeholder="₹25000"
          value={saved}
          onChange={(e) => setSaved(e.target.value)}
        />

        <button onClick={saveGoal}>
          Save Goal
        </button>

      </div>
    </main>
  );
}

export default Goals;