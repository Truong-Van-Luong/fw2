import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpenseManagement = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/expenses', {
        headers: { 'x-access-token': localStorage.getItem('token') }
      });
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
      setError('Không thể tải danh sách chi phí');
    }
  };

  // Nhóm chi phí theo người dùng
  const groupByUser = (expenses) => {
    return expenses.reduce((acc, expense) => {
      if (!acc[expense.user]) {
        acc[expense.user] = [];
      }
      acc[expense.user].push(expense);
      return acc;
    }, {});
  };

  const groupedExpenses = groupByUser(expenses);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>Quản Lý Chi Tiêu</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {Object.keys(groupedExpenses).map(user => (
        <Accordion key={user}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${user}-content`}
            id={`panel-${user}-header`}
          >
            <Typography variant="h6">{user}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mô tả</TableCell>
                    <TableCell>Ngày tháng</TableCell>
                    <TableCell>Số tiền</TableCell>
                    <TableCell>Danh mục</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupedExpenses[user].map(expense => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{expense.amount}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default ExpenseManagement;
