import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            ✨ TAKE CONTROL OF YOUR MONEY
          </div>

          <h1>
            Plan Better.
            <br />
            <span>Save Smarter.</span>
          </h1>

          <p className="hero-description">
            SmartBudget helps you manage your income, control your
            spending, and achieve your financial goals.
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

          {/* Small trust text */}
          <div className="hero-trust">
            <span>✓ Easy to use</span>
            <span>✓ Track expenses</span>
            <span>✓ Set goals</span>
          </div>

        </div>


        {/* RIGHT SIDE FINANCE CARD */}
        <div className="hero-visual">

          <div className="floating-card card-one">
            <span>💰</span>
            <div>
              <small>Monthly Income</small>
              <strong>₹45,000</strong>
            </div>
          </div>


          <div className="money-card">

            <div className="money-card-header">
              <div>
                <span>Monthly Overview</span>
                <h2>₹30,000</h2>
                <p>Available balance</p>
              </div>

              <div className="overview-icon">
                💰
              </div>
            </div>


            <div className="money-stats">

              <div className="money-stat">
                <div className="stat-icon income-icon">
                  ↗
                </div>

                <div>
                  <small>Income</small>
                  <strong>₹45,000</strong>
                </div>
              </div>


              <div className="money-stat">
                <div className="stat-icon expense-icon">
                  ↘
                </div>

                <div>
                  <small>Expenses</small>
                  <strong>₹15,000</strong>
                </div>
              </div>

            </div>


            <div className="budget-progress">

              <div className="progress-header">
                <span>Budget used</span>
                <strong>50%</strong>
              </div>

              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>

            </div>

          </div>


          <div className="floating-card card-two">

            <div className="goal-circle">
              ✓
            </div>

            <div>
              <small>Savings Goal</small>
              <strong>₹20,000</strong>
              <span>75% completed</span>
            </div>

          </div>

        </div>

      </section>


      {/* FEATURES */}
      <section className="features-section">

        <div className="section-heading">

          <span>FEATURES</span>

          <h2>
            Everything you need to manage your money
          </h2>

          <p>
            Simple tools to help you understand, plan and improve
            your financial life.
          </p>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon purple">
              📊
            </div>

            <h3>Track Expenses</h3>

            <p>
              Record your expenses and understand exactly where
              your money is going.
            </p>

            <Link to="/expense">
              Track spending →
            </Link>

          </div>


          <div className="feature-card">

            <div className="feature-icon blue">
              💰
            </div>

            <h3>Manage Budget</h3>

            <p>
              Create monthly budgets and keep your spending
              under control.
            </p>

            <Link to="/budget">
              Create budget →
            </Link>

          </div>


          <div className="feature-card">

            <div className="feature-icon orange">
              🎯
            </div>

            <h3>Financial Goals</h3>

            <p>
              Set savings goals and track your progress towards
              achieving them.
            </p>

            <Link to="/goals">
              Set a goal →
            </Link>

          </div>

        </div>

      </section>


      {/* BOTTOM CTA */}
      <section className="home-cta">

        <div>
          <span>READY TO GET STARTED?</span>

          <h2>
            Take control of your finances today.
          </h2>

          <p>
            Start planning your money smarter with SmartBudget.
          </p>
        </div>

        <Link to="/budget">
          <button className="primary-btn">
            Create Your Budget →
          </button>
        </Link>

      </section>

    </div>
  );
}

export default Home;