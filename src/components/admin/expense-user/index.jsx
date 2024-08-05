import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchExpenses, selectExpenses, selectError, selectStatus } from '../../../redux/slices/admins/expenseManagementSlice';

const ExpenseManagement = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenses);
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchExpenses(token));
    }
  }, [dispatch]);

  if (status === 'loading') {
    return <Typography>Đang tải...</Typography>;
  }

  if (status === 'failed') {
    return <Typography color="error">{error}</Typography>;
  }

  const groupByUser = (expenses) => {
    if (!Array.isArray(expenses)) {
      return {};
    }
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
