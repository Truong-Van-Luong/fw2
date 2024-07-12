import '@fontsource/inter';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './components/auth/login/login';
import Register from './components/auth/register/register';
import CreateExpense from './components/expenses/create-ex';
import Budget from './components/budget';
import ExpenseOverview from './components/expenseOverview';
import ExpenseReport from './components/expense-report';
import Header from './components/layouts/header';

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex' }}>
        <Header />
        <main style={{ flexGrow: 1, padding: '1rem', marginTop: '64px' }}> 
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create' element={<CreateExpense />} />
            <Route path='/budget' element={<Budget />} />
            <Route path='/expenses' element={<ExpenseOverview />} />
            <Route path='/expense-report' element={<ExpenseReport />} />
          </Routes>
        </main>dscds
      </div>
    
    </Router>
  );
}

export default App;
