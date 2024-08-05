import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchOverviewData } from '../../redux/slices/expenseOverviewSlice';

function ExpenseOverview() {
  const dispatch = useDispatch();
  const { data: overviewData, error, status } = useSelector(state => state.overview);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchOverviewData(token));
    }
  }, [dispatch]);

  const token = localStorage.getItem('token');
  if (!token) {
    return <Typography color="error">Bạn phải đăng nhập để xem tổng quan chi phí.</Typography>;
  }

  if (status === 'loading') {
    return <Typography>Đang tải...</Typography>;
  }

  if (status === 'failed') {
    return <Typography color="error">{error}</Typography>;
  }

  if (!overviewData) {
    return null;
  }

  const { totalSpending, categorySummary, userExpenses } = overviewData;

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>TỔNG QUAN CHI PHÍ</Typography>
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
