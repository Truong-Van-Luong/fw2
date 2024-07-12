import { useState } from 'react';
import { TextField, Button, Container, Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

function Budget() {
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const lol = {category, budget}

    console.log(lol);
   
    setBudget('');
    setCategory('');
  };


  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>CÀI ĐẶT NGÂN SÁCH</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel>Danh mục</InputLabel>
          <Select
            value={category}
            onChange={handleCategoryChange}
            label="Danh mục"
            required
          >
            <MenuItem value="">
              <em>Chọn danh mục</em>
            </MenuItem>
            <MenuItem value="Food">Thực phẩm</MenuItem>
            <MenuItem value="Entertainment">Giải trí</MenuItem>
            <MenuItem value="Education">Giáo dục</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Ngân sách"
          type="number"
          fullWidth
          variant="outlined"
          margin="normal"
          value={budget}
          onChange={handleBudgetChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Đặt ngân sách
        </Button>
      </Box>

    </Container>
  );
}

export default Budget;
