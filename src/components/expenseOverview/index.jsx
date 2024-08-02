import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ExpenseOverview() {
  const [overviewData, setOverviewData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (!token) {
          setError('Bạn phải đăng nhập để xem tổng quan chi phí');
          return;
        }

        const response = await axios.get('http://localhost:5000/overview', {
          headers: {
            'x-access-token': token
          }
        });

        setOverviewData(response.data);
        setError('');
      } catch (error) {
        console.error(error);
        setError('Không thể lấy dữ liệu tổng quan chi phí');
      }
    };

    fetchOverviewData();
  }, []);

  if (!overviewData) {
    return <Typography>Đang tải...</Typography>;
  }

  const { totalSpending, categorySummary, userExpenses } = overviewData;

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>TỔNG QUAN CHI PHÍ</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Tóm tắt</Typography>
            <Typography>Tổng chi tiêu: ${totalSpending}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Phân tích theo danh mục</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Danh mục</TableCell>
                    <TableCell align="right">Chi tiêu</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(categorySummary).map(([category, data]) => (
                    <TableRow key={category}>
                      <TableCell>{category}</TableCell>
                      <TableCell align="right">${data.spending}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Xu hướng chi phí theo thời gian</Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={userExpenses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ExpenseOverview;
