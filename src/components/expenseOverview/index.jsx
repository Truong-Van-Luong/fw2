import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function ExpenseOverview() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>TỔNG QUAN CHI PHÍ</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Tóm tắt</Typography>
            <Typography>Tổng chi tiêu: $100</Typography>
            <Typography>Ngân sách còn lại: $200</Typography>
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
                    <TableCell align="right">Ngân sách</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow >
                      <TableCell>Phương tiện</TableCell>
                      <TableCell align="right">$1000</TableCell>
                      <TableCell align="right">$2000</TableCell>
                    </TableRow>

                    <TableRow >
                      <TableCell>Phương tiện</TableCell>
                      <TableCell align="right">$1000</TableCell>
                      <TableCell align="right">$2000</TableCell>
                    </TableRow>

                    <TableRow >
                      <TableCell>Phương tiện</TableCell>
                      <TableCell align="right">$1000</TableCell>
                      <TableCell align="right">$2000</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Xu hướng chi phí theo thời gian</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart >
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
