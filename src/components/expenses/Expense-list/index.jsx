import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState(''); // 'edit' or 'delete'
  const [error, setError] = useState('');

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Bạn phải đăng nhập để xem chi phí');
        return;
      }
      const response = await axios.get('http://localhost:5000/expenses', {
        headers: {
          'x-access-token': token
        }
      });
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
      setError('Không thể tải danh sách chi phí');
    }
  };

  const handleOpenDialog = (expense, actionType) => {
    setSelectedExpense(expense);
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
    setSelectedExpense(null);
  };

  const handleSubmit = async () => {
    if (!selectedExpense) {
      setError('Không có chi phí nào được chọn');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Bạn phải đăng nhập để thực hiện thao tác này');
        return;
      }

      if (action === 'edit') {
        await axios.put(`http://localhost:5000/expenses/${selectedExpense.id}`, { description, date, amount }, {
          headers: {
            'x-access-token': token
          }
        });
      } else if (action === 'delete') {
        if (!selectedExpense.id) {
          setError('ID chi phí không hợp lệ');
          return;
        }
        await axios.delete(`http://localhost:5000/expenses/${selectedExpense.id}`, {
          headers: {
            'x-access-token': token
          }
        });
      }

      fetchExpenses();
      handleCloseDialog();
    } catch (error) {
      console.error(error);
      setError('Xử lý chi phí thất bại');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>DANH SÁCH CHI PHÍ</Typography>
      {error && <Typography color="error">{error}</Typography>}
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

      {/* Dialog Sửa/Xóa Chi Phí */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{action === 'edit' ? 'Sửa Chi Phí' : 'Xóa Chi Phí'}</DialogTitle>
        <DialogContent>
          {action === 'edit' ? (
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
          ) : (
            <Typography>Bạn có chắc chắn muốn xóa chi phí này không?</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSubmit} color="primary">
            {action === 'edit' ? 'Cập nhật' : 'Xóa'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ExpenseList;
