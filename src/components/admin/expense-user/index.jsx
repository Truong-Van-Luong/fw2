import { Container, Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const mockExpenses = [
  { id: 1, description: 'Rent', amount: '$1000', date: '2023-07-01', category: 'Housing' },
  { id: 2, description: 'Groceries', amount: '$200', date: '2023-07-05', category: 'Food' },
  { id: 3, description: 'Internet', amount: '$50', date: '2023-07-10', category: 'Utilities' },
];

function ExpenseManagement() {
  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Chi Tiêu của người dùng
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 4, mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.id}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default ExpenseManagement;
