import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./components/layouts/userLayout";
import AdminLayout from "./components/layouts/adminLayout";
import Home from "./pages/home";
import Login from "./components/auth/login/login";
import Register from "./components/auth/register/register";
import CreateExpense from "./components/expenses/createEx";
import ExpenseList from "./components/expenses/expenseList";
import ExpenseOverview from "./components/expenseOverview";
import ExpenseReport from "./components/expenseReport";
import UserManagement from "./components/admin/list-user";
import ExpenseManagement from "./components/admin/expense-user";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="expense-list" element={<ExpenseList />} />
          <Route path="expense-create" element={<CreateExpense />} />
          <Route path="expenses" element={<ExpenseOverview />} />
          <Route path="expense-report" element={<ExpenseReport />} />
        </Route>
        <Route path="admin/" element={<AdminLayout />}>
          <Route path="users" element={<UserManagement />} />
          <Route path="expenses" element={<ExpenseManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
