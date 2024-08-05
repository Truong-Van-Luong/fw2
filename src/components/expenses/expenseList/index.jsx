import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchExpenses, selectExpense, clearSelectedExpense, updateExpense, deleteExpense } from '../../../redux/slices/expenseSlice';

function ExpenseList() {
  const dispatch = useDispatch();
  const { items: expenses, selectedExpense, error, status } = useSelector(state => state.expenses);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  const fetchExpensesData = () => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchExpenses(token));
    } else {
      setErrorMessage('Bạn phải đăng nhập để xem danh sách chi phí.');
    }
  };

  const handleOpenDialog = (expense, actionType) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('Bạn phải đăng nhập để thực hiện thao tác này');
      return;
    }

    dispatch(selectExpense(expense));
    setDescription(expense.description);
    setDate(expense.date);
    setAmount(expense.amount);
    setAction(actionType);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDescription('');
    setDate('');
    setAmount('');
    setAction('');
    dispatch(clearSelectedExpense());
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setErrorMessage('Bạn phải đăng nhập để thực hiện thao tác này');
      return;
    }

    if (action === 'edit' && selectedExpense) {
      try {
        await dispatch(updateExpense({ id: selectedExpense.id, updates: { description, date, amount }, token })).unwrap();
        fetchExpensesData();
        handleCloseDialog();
      } catch (error) {
        setErrorMessage('Cập nhật chi phí thất bại');
      }
    } else if (action === 'delete' && selectedExpense) {
      try {
        await dispatch(deleteExpense({ id: selectedExpense.id, token })).unwrap();
        fetchExpensesData();
        handleCloseDialog();
      } catch (error) {
        setErrorMessage('Xóa chi phí thất bại');
      }
    } else {
      setErrorMessage('Không có chi phí nào được chọn');
    }
  };

  useEffect(() => {
    fetchExpensesData();
  }, [dispatch]);

  if (status === 'loading') {
    return <Typography>Đang tải...</Typography>;
  }

  if (status === 'failed') {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>DANH SÁCH CHI PHÍ</Typography>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mô tả</TableCell>
              <TableCell>Ngày tháng</TableCell>
              <TableCell>Số tiền</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map(expense => (
              <TableRow key={expense.id}>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(expense, 'edit')}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDialog(expense, 'delete')}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{action === 'edit' ? 'Cập Nhật Chi Phí' : 'Xóa Chi Phí'}</DialogTitle>
        <DialogContent>
          {action === 'edit' && (
            <>
              <TextField
                label="Mô tả"
                fullWidth
                variant="outlined"
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                label="Ngày tháng"
                type="date"
                fullWidth
                variant="outlined"
                margin="normal"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Số tiền"
                type="number"
                fullWidth
                variant="outlined"
                margin="normal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </>
          )}
          {action === 'delete' && <Typography>Bạn có chắc chắn muốn xóa chi phí này không?</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Hủy</Button>
          <Button onClick={handleSubmit} color="secondary">{action === 'edit' ? 'Cập Nhật' : 'Xóa'}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ExpenseList;
