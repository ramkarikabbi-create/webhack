import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Goals() {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // --------------------------------
  // Load goals from Supabase
  // --------------------------------
  async function getGoals() {
    setLoading(true);

    const { data, error } = await supabase
      .from("goals")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Load goals error:", error);
      alert("Failed to load goals");
      setLoading(false);
      return;
    }

    setGoals(data || []);
    setLoading(false);
  }

  useEffect(() => {
    getGoals();
  }, []);

  // --------------------------------
  // Save goal
  // --------------------------------
  async function saveGoal() {
    if (!name || !target || !saved) {
      alert("Please fill all details");
      return;
    }

    const targetAmount = Number(target);
    const savedAmount = Number(saved);

    if (targetAmount <= 0) {
      alert("Target amount must be greater than 0");
      return;
    }

    if (savedAmount < 0) {
      alert("Amount saved cannot be negative");
      return;
    }

    if (savedAmount > targetAmount) {
      alert("Amount saved cannot be greater than the target amount");
      return;
    }

    const goal = {
      goal_name: name,
      target_amount: targetAmount,
      saved_amount: savedAmount
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

    // Add the new goal immediately to the page
    if (data && data.length > 0) {
      setGoals((currentGoals) => [
        data[0],
        ...currentGoals
      ]);
    }

    alert("Goal saved successfully!");

    setName("");
    setTarget("");
    setSaved("");
  }

  // --------------------------------
  // Delete goal
  // --------------------------------
  async function deleteGoal(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this goal?"
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    const { data, error } = await supabase
      .from("goals")
      .delete()
      .eq("id", id)
      .select("id");

    if (error) {
      console.error("SUPABASE DELETE GOAL ERROR:", error);

      alert(
        "Failed to delete goal:\n\n" +
        error.message
      );

      setDeletingId(null);
      return;
    }

    // Check whether Supabase actually deleted a row
    if (!data || data.length === 0) {
      console.error(
        "No goal was deleted. Check the DELETE policy in Supabase."
      );

      alert(
        "Goal was not deleted.\n\n" +
        "Please check the DELETE policy for the goals table."
      );

      setDeletingId(null);
      return;
    }

    // Remove goal from screen
    setGoals((currentGoals) =>
      currentGoals.filter(
        (goal) => goal.id !== id
      )
    );

    setDeletingId(null);
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

      {/* =========================
          CREATE GOAL
      ========================== */}

      <div className="form-card">

        <div className="form-section-title">
          <span>🎯</span>

          <div>
            <h2>Create a Goal</h2>

            <p>
              Enter your savings goal details.
            </p>
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
            onChange={(e) =>
              setTarget(e.target.value)
            }
          />
        </div>

        <label>Amount Saved</label>

        <div className="input-money">
          <span>₹</span>

          <input
            type="number"
            placeholder="25000"
            value={saved}
            onChange={(e) =>
              setSaved(e.target.value)
            }
          />
        </div>

        <button
          type="button"
          className="primary-btn save-btn"
          onClick={saveGoal}
        >
          🎯 Save Goal
        </button>

      </div>

      {/* =========================
          SAVINGS GOALS
      ========================== */}

      <div className="card goals-list">

        <h2>🎯 Your Savings Goals</h2>

        {loading ? (
          <p>Loading goals...</p>
        ) : goals.length === 0 ? (
          <div>
            <h3>No goals found.</h3>

            <p>
              Create your first savings goal above.
            </p>
          </div>
        ) : (
          goals.map((goal) => {

            const targetAmount =
              Number(goal.target_amount || 0);

            const savedAmount =
              Number(goal.saved_amount || 0);

            const remainingAmount =
              Math.max(
                targetAmount - savedAmount,
                0
              );

            const percentage =
              targetAmount > 0
                ? Math.min(
                    (savedAmount / targetAmount) * 100,
                    100
                  )
                : 0;

            return (
              <div
                className="goal-card"
                key={goal.id}
              >

                <div className="goal-card-header">

                  <div>
                    <h3>
                      🎯 {goal.goal_name}
                    </h3>

                    <p>
                      ₹
                      {savedAmount.toLocaleString("en-IN")}
                      {" / "}
                      ₹
                      {targetAmount.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <strong>
                    {Math.round(percentage)}%
                  </strong>

                </div>

                {/* Progress bar */}

                <div className="goal-progress">
                  <div
                    className="goal-progress-fill"
                    style={{
                      width: `${percentage}%`
                    }}
                  />
                </div>

                <div className="goal-bottom">

                  <span>
                    Remaining: ₹
                    {remainingAmount.toLocaleString("en-IN")}
                  </span>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() =>
                      deleteGoal(goal.id)
                    }
                    disabled={
                      deletingId === goal.id
                    }
                  >
                    {deletingId === goal.id
                      ? "Deleting..."
                      : "Delete"}
                  </button>

                </div>

              </div>
            );
          })
        )}

      </div>

    </main>
  );
}

export default Goals;