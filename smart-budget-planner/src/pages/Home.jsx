import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            ✨ Take control of your money
          </div>

          <h1>
            Plan Better.
            <br />
            <span>Save Smarter.</span>
          </h1>

          <p>
            SmartBudget helps you manage your income, control your
            spending and achieve your financial goals.
          </p>

          <div className="hero-buttons">
            <Link to="/dashboard">
              <button className="primary-btn">
                View Dashboard →
              </button>
            </Link>

            <Link to="/budget">
              <button className="secondary-btn">
                Create Budget
              </button>
            </Link>
          </div>

        </div>

        <div className="hero-card">

          <div className="mini-card-header">
            <span>Monthly Overview</span>
            <span>•••</span>
          </div>

          <h2>₹30,000</h2>
          <p className="muted">Available balance</p>

          <div className="mini-stats">

            <div>
              <span className="green-dot"></span>
              <div>
                <small>Income</small>
                <strong>₹45,000</strong>
              </div>
            </div>

            <div>
              <span className="red-dot"></span>
              <div>
                <small>Expenses</small>
                <strong>₹15,000</strong>
              </div>
            </div>

          </div>

          <div className="mini-progress">
            <div>
              <span>Budget used</span>
              <span>50%</span>
            </div>

            <progress value="50" max="100"></progress>
          </div>

        </div>

      </section>

      <section className="features-section">

        <div className="section-heading">
          <span>FEATURES</span>
          <h2>Everything you need to manage your money</h2>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon purple">📊</div>
            <h3>Track Expenses</h3>
            <p>
              Record your expenses and understand where your
              money is going.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon blue">💰</div>
            <h3>Manage Budget</h3>
            <p>
              Create monthly budgets and keep your spending
              under control.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon orange">🎯</div>
            <h3>Financial Goals</h3>
            <p>
              Set savings goals and track your progress
              towards achieving them.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;