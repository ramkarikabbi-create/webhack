import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import Expense from "./pages/Expense";
import Goals from "./pages/Goals";
import ExpenseHistory from "./pages/ExpenseHistory";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/history" element={<ExpenseHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;