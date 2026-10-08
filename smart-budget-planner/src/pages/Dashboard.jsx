import { useState } from "react";

function Dashboard() {
  const income =
    Number(localStorage.getItem("income")) || 30000;

  const expenses =
    Number(localStorage.getItem("totalExpense")) || 14500;

  const remaining = income - expenses;

  const [goal] = useState(
    JSON.parse(localStorage.getItem("goal")) || {
      name: "New Laptop",
      target: 60000,
      saved: 25000
    }
  );

  const goalPercentage =
    goal.target > 0
      ? Math.min((goal.saved / goal.target) * 100, 100)
      : 0;

  return (
    <main className="page-container">

      <div className="page-header">
        <div>
          <span className="page-label">OVERVIEW</span>
          <h1>Dashboard</h1>
          <p>Here's your financial summary.</p>
        </div>
      </div>

      <div className="stats-grid">

        <div className="dashboard-stat income-card">
          <div className="stat-top">
            <div className="stat-icon">💵</div>
            <span className="stat-label">INCOME</span>
          </div>

          <h2>₹{income.toLocaleString()}</h2>

          <p className="positive">
            ↑ Monthly income
          </p>
        </div>

        <div className="dashboard-stat expense-card">
          <div className="stat-top">
            <div className="stat-icon">💸</div>
            <span className="stat-label">EXPENSES</span>
          </div>

          <h2>₹{expenses.toLocaleString()}</h2>

          <p className="negative">
            ↓ Total spending
          </p>
        </div>

        <div className="dashboard-stat balance-card">
          <div className="stat-top">
            <div className="stat-icon">💎</div>
            <span className="stat-label">BALANCE</span>
          </div>

          <h2>₹{remaining.toLocaleString()}</h2>

          <p className="positive">
            ✓ Available balance
          </p>
        </div>

      </div>

      <div className="dashboard-layout">

        <div className="dashboard-panel">

          <div className="panel-header">
            <div>
              <h2>Budget Overview</h2>
              <p>Your spending by category</p>
            </div>
          </div>

          <BudgetBar
            name="Food"
            spent={3000}
            budget={5000}
            color="purple"
          />

          <BudgetBar
            name="Transport"
            spent={2000}
            budget={3000}
            color="blue"
          />

          <BudgetBar
            name="Shopping"
            spent={4000}
            budget={4000}
            color="orange"
          />

          <BudgetBar
            name="Bills"
            spent={5000}
            budget={6000}
            color="green"
          />

        </div>

        <div className="dashboard-panel goal-dashboard">

          <div className="panel-header">
            <div>
              <h2>🎯 Your Goal</h2>
              <p>{goal.name}</p>
            </div>
          </div>

          <div className="goal-circle">
            <strong>{goalPercentage.toFixed(0)}%</strong>
            <span>completed</span>
          </div>

          <div className="goal-numbers">
            <div>
              <small>Saved</small>
              <strong>₹{goal.saved.toLocaleString()}</strong>
            </div>

            <div>
              <small>Target</small>
              <strong>₹{goal.target.toLocaleString()}</strong>
            </div>
          </div>

          <progress
            value={goalPercentage}
            max="100"
            className="goal-progress"
          ></progress>

        </div>

      </div>

    </main>
  );
}

function BudgetBar({ name, spent, budget, color }) {
  const percentage = Math.min((spent / budget) * 100, 100);

  return (
    <div className="budget-row">

      <div className="budget-title">
        <div>
          <strong>{name}</strong>
          <span>
            ₹{spent.toLocaleString()} / ₹{budget.toLocaleString()}
          </span>
        </div>

        <b>{percentage.toFixed(0)}%</b>
      </div>

      <div className="bar-background">
        <div
          className={`bar-fill ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

    </div>
  );
}

export default Dashboard;