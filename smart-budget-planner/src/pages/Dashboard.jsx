import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Dashboard() {
  const [budget, setBudget] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);

    // =========================
    // LOAD BUDGET
    // =========================
    const savedBudget = localStorage.getItem("budget");

    if (savedBudget) {
      setBudget(JSON.parse(savedBudget));
    }

    // =========================
    // LOAD EXPENSES
    // =========================
    const {
      data: expenseData,
      error: expenseError
    } = await supabase
      .from("expenses")
      .select("*");

    if (expenseError) {
      console.error("Error loading expenses:", expenseError);
    } else {
      setExpenses(expenseData || []);
    }

    // =========================
    // LOAD GOALS
    // =========================
    const {
      data: goalData,
      error: goalError
    } = await supabase
      .from("goals")
      .select("*")
      .order("id", { ascending: false });

    if (goalError) {
      console.error("Error loading goals:", goalError);
    } else {
      setGoals(goalData || []);
    }

    setLoading(false);
  }

  // =========================
  // TOTAL EXPENSES
  // =========================
  const totalExpenses = expenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  // =========================
  // REMAINING MONEY
  // =========================
  const remaining = budget
    ? Number(budget.income || 0) - totalExpenses
    : 0;

  // =========================
  // CATEGORY TOTAL
  // =========================
  function getCategoryTotal(categoryName) {
    return expenses
      .filter(
        (item) =>
          item.category?.toLowerCase() ===
          categoryName.toLowerCase()
      )
      .reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
      );
  }

  // =========================
  // CATEGORIES
  // =========================
  const categories = [
    {
      name: "Food",
      budget: budget ? Number(budget.food || 0) : null,
      spent: getCategoryTotal("Food")
    },
    {
      name: "Transport",
      budget: budget ? Number(budget.transport || 0) : null,
      spent: getCategoryTotal("Transport")
    },
    {
      name: "Shopping",
      budget: budget ? Number(budget.shopping || 0) : null,
      spent: getCategoryTotal("Shopping")
    },
    {
      name: "Bills",
      budget: budget ? Number(budget.bills || 0) : null,
      spent: getCategoryTotal("Bills")
    },
    {
      name: "Education",
      budget: budget ? Number(budget.education || 0) : null,
      spent: getCategoryTotal("Education")
    }
  ];

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <main className="page">
        <div className="loading-card">
          <div className="loading-spinner"></div>
          <h2>Loading Dashboard...</h2>
          <p>Please wait...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page dashboard-page">

      {/* =========================
          PAGE HEADER
      ========================= */}
      <div className="dashboard-header">
        <div>
          <p className="dashboard-small-title">
            SMARTBUDGET
          </p>

          <h1>Dashboard</h1>

          <p className="dashboard-subtitle">
            Track your money, manage your budget and reach your goals.
          </p>
        </div>
      </div>

      {/* =========================
          SUMMARY CARDS
      ========================= */}
      <div className="dashboard-grid">

        <div className="stat-card income">
          <div className="stat-icon">
            💰
          </div>

          <div>
            <h3>Monthly Income</h3>

            <h2>
              {budget
                ? `₹${Number(budget.income || 0).toLocaleString("en-IN")}`
                : "Not Set"}
            </h2>
          </div>
        </div>

        <div className="stat-card expense">
          <div className="stat-icon">
            💸
          </div>

          <div>
            <h3>Total Expenses</h3>

            <h2>
              ₹{totalExpenses.toLocaleString("en-IN")}
            </h2>
          </div>
        </div>

        <div className="stat-card remaining">
          <div className="stat-icon">
            📈
          </div>

          <div>
            <h3>Remaining</h3>

            <h2>
              {budget
                ? `₹${remaining.toLocaleString("en-IN")}`
                : "Set Budget First"}
            </h2>
          </div>
        </div>

      </div>

      {/* =========================
          BUDGET OVERVIEW
      ========================= */}
      <div className="card budget-overview-card">

        <div className="card-title-row">
          <div>
            <h2>Budget Overview</h2>
            <p>Track your spending by category</p>
          </div>

          <span className="card-icon">📊</span>
        </div>

        {!budget ? (
          <div className="empty-budget">
            <div className="empty-icon">💰</div>

            <h3>No budget set</h3>

            <p>
              Go to the Budget page and create your monthly budget.
            </p>
          </div>
        ) : (
          <div className="budget-list">

            {categories.map((item) => {

              const percentage =
                item.budget > 0
                  ? Math.min(
                      (item.spent / item.budget) * 100,
                      100
                    )
                  : 0;

              const limitReached =
                item.budget > 0 &&
                item.spent >= item.budget;

              return (
                <div
                  className="budget-row"
                  key={item.name}
                >

                  <div className="budget-row-top">

                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      ₹{item.spent.toLocaleString("en-IN")}
                      {" / "}
                      ₹{item.budget.toLocaleString("en-IN")}
                    </span>

                  </div>

                  <div className="budget-progress">

                    <div
                      className={`budget-progress-fill ${
                        limitReached
                          ? "budget-danger"
                          : ""
                      }`}
                      style={{
                        width: `${percentage}%`
                      }}
                    />

                  </div>

                  {limitReached && (
                    <div className="limit-reached">
                      ⚠️ Limit Reached
                    </div>
                  )}

                </div>
              );
            })}

          </div>
        )}

      </div>

      {/* =========================
          SAVINGS GOALS
      ========================= */}
      <div className="card goals-dashboard">

        <div className="card-title-row">

          <div>
            <h2>🎯 Savings Goals</h2>

            <p>
              Keep working towards your financial goals
            </p>
          </div>

          <span className="card-icon goal-icon">
            🏆
          </span>

        </div>

        {goals.length === 0 ? (

          <div className="empty-goals">

            <div className="empty-goal-icon">
              🎯
            </div>

            <h3>No savings goals yet</h3>

            <p>
              Create a savings goal to start tracking your progress.
            </p>

          </div>

        ) : (

          <div className="goals-grid">

            {goals.map((goal) => {

              const targetAmount =
                Number(goal.target_amount || 0);

              // IMPORTANT:
              // Your Goals.jsx uses saved_amount
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

              const completed =
                percentage >= 100;

              return (

                <div
                  className={`goal-card ${
                    completed
                      ? "goal-completed"
                      : ""
                  }`}
                  key={goal.id}
                >

                  {/* Goal top */}
                  <div className="goal-card-header">

                    <div className="goal-title-area">

                      <div className="goal-icon-box">
                        🎯
                      </div>

                      <div>
                        <h3>
                          {goal.goal_name}
                        </h3>

                        <span>
                          {completed
                            ? "Goal completed 🎉"
                            : "Savings progress"}
                        </span>
                      </div>

                    </div>

                    <div className="goal-percentage">
                      {Math.round(percentage)}%
                    </div>

                  </div>

                  {/* Progress */}
                  <div className="goal-progress-container">

                    <div className="goal-progress-track">

                      <div
                        className="goal-progress-fill"
                        style={{
                          width: `${percentage}%`
                        }}
                      />

                    </div>

                  </div>

                  {/* Amounts */}
                  <div className="goal-amount-row">

                    <div>
                      <span className="goal-label">
                        Saved
                      </span>

                      <strong>
                        ₹{savedAmount.toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div className="goal-target">

                      <span className="goal-label">
                        Target
                      </span>

                      <strong>
                        ₹{targetAmount.toLocaleString("en-IN")}
                      </strong>

                    </div>

                  </div>

                  {/* Bottom */}
                  <div className="goal-bottom">

                    {completed ? (
                      <span className="goal-success">
                        ✓ Target achieved
                      </span>
                    ) : (
                      <span>
                        ₹{remainingAmount.toLocaleString("en-IN")}
                        {" "}remaining
                      </span>
                    )}

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </div>

    </main>
  );
}

export default Dashboard;