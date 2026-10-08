import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span>💰</span>
        SmartBudget
      </div>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/budget">Budget</NavLink>
        <NavLink to="/expense">Expense</NavLink>
        <NavLink to="/goals">Goals</NavLink>
        <NavLink to="/history">History</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;