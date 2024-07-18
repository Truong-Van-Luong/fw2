import  { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Box, Typography } from '@mui/material';

function CreateExpense() {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const expense = { description, date, amount, category };
    console.log(expense);

    setDescription('');
    setDate('');
    setAmount('');
    setCategory('');
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>THÊM CHI PHÍ</Typography>
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
            <MenuItem value="Rent">Tiền thuê nhà</MenuItem>
            <MenuItem value="Groceries">Cửa hàng tạp hóa</MenuItem>
            <MenuItem value="Transport">Phương tiện đi lại</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Thêm chi phí
        </Button>
      </Box>
      <Outlet/>
    </Container>
  );
}

export default CreateExpense;
