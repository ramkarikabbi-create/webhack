import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Dashboard() {
  const [budget, setBudget] = useState({
    income: 0,
    food: 0,
    transport: 0,
    shopping: 0,
    bills: 0,
    education: 0
  });

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    // Get budget from localStorage
    const savedBudget = JSON.parse(
      localStorage.getItem("budget")
    );

    if (savedBudget) {
      setBudget(savedBudget);
    }

    // Get expenses from Supabase
    const { data, error } = await supabase
      .from("expenses")
      .select("*");

    if (error) {
      console.error("Error loading expenses:", error);
      setLoading(false);
      return;
    }

    setExpenses(data || []);
    setLoading(false);
  }

  // Calculate total expenses
  const totalExpenses = expenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  // Calculate remaining money
  const remaining =
    Number(budget.income || 0) - totalExpenses;

  // Calculate category-wise spending
  const getCategoryTotal = (categoryName) => {
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
  };

  const categories = [
    {
      name: "Food",
      budget: Number(budget.food || 0),
      spent: getCategoryTotal("Food")
    },
    {
      name: "Transport",
      budget: Number(budget.transport || 0),
      spent: getCategoryTotal("Transport")
    },
    {
      name: "Shopping",
      budget: Number(budget.shopping || 0),
      spent: getCategoryTotal("Shopping")
    },
    {
      name: "Bills",
      budget: Number(budget.bills || 0),
      spent: getCategoryTotal("Bills")
    },
    {
      name: "Education",
      budget: Number(budget.education || 0),
      spent: getCategoryTotal("Education")
    }
  ];

  if (loading) {
    return (
      <main className="page">
        <h1>Dashboard</h1>
        <p>Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main className="page">

      <h1>Dashboard</h1>

      <div className="dashboard-grid">

        <div className="stat-card income">
          <h3>Monthly Income</h3>
          <h2>₹{Number(budget.income || 0)}</h2>
        </div>

        <div className="stat-card expense">
          <h3>Total Expenses</h3>
          <h2>₹{totalExpenses}</h2>
        </div>

        <div className="stat-card remaining">
          <h3>Remaining</h3>
          <h2>₹{remaining}</h2>
        </div>

      </div>

      <div className="card">

        <h2>Budget Overview</h2>

        {categories.map((item) => {

          // Calculate percentage
          const percentage =
            item.budget > 0
              ? Math.min(
                  (item.spent / item.budget) * 100,
                  100
                )
              : 0;

          // Check if limit is reached
          const limitReached =
            item.budget > 0 &&
            item.spent >= item.budget;

          return (
            <div
              className="progress-item"
              key={item.name}
            >

              <span>{item.name}</span>

              <progress
                value={percentage}
                max="100"
              ></progress>

              <span>
                ₹{item.spent} / ₹{item.budget}
              </span>

              {limitReached && (
                <strong className="limit-reached">
                  ⚠️ Limit Reached
                </strong>
              )}

            </div>
          );
        })}

      </div>

    </main>
  );
}

export default Dashboard;