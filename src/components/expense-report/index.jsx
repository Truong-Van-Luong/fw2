// src/components/ExpenseReport.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const ExpenseReport = () => {
  const [categorySummary, setCategorySummary] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMonthlyReport();
  }, []);

  const fetchMonthlyReport = async () => {
    try {
      const response = await axios.get('http://localhost:5000/report/monthly', {
        headers: { 'x-access-token': localStorage.getItem('token') }
      });
      setCategorySummary(response.data);
    } catch (error) {
      console.error(error);
      setError('Không thể tải báo cáo chi tiêu');
    }
  };

  const data = Object.keys(categorySummary).map(category => ({
    name: category,
    value: categorySummary[category]
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF7F50'];

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>Báo Cáo Chi Tiêu Hàng Tháng</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Paper sx={{ padding: 2 }}>
        <PieChart width={800} height={400}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Paper>
    </Container>
  );
};

export default ExpenseReport;
