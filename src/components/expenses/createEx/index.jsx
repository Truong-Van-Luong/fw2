import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Box, Typography } from '@mui/material';
import { addExpense } from '../../../redux/slices/expenseSlice';

function CreateExpense() {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      setError('Bạn phải đăng nhập trước khi thêm chi phí');
      setSuccess('');
      return;
    }

    const expense = { description, date, amount, category };

    try {
      await dispatch(addExpense({ expense, token })).unwrap();
      setSuccess('Chi phí được thêm thành công');
      setError('');
      setDescription('');
      setDate('');
      setAmount('');
      setCategory('');
    } catch (error) {
      setError('Thêm chi phí thất bại');
      setSuccess('');
    }
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>THÊM CHI PHÍ</Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success">{success}</Typography>}
        <TextField
          label="Mô tả"
          fullWidth
          variant="outlined"
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
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
          required
        />
        <TextField
          label="Số tiền"
          type="number"
          fullWidth
          variant="outlined"
          margin="normal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel>Danh mục</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Danh mục"
            required
          >
            <MenuItem value="">
              <em>Chọn danh mục</em>
            </MenuItem>
            <MenuItem value="Tiền thuê nhà">Tiền thuê nhà</MenuItem>
            <MenuItem value="Mua sắm">Cửa hàng tạp hóa</MenuItem>
            <MenuItem value="Phương tiện">Phương tiện đi lại</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: '#33ab9f', '&:hover': { bgcolor: '#2a9587' } }}>
          Thêm chi phí
        </Button>
      </Box>
    </Container>
  );
}

export default CreateExpense;
