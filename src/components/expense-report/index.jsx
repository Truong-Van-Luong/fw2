import { useState } from 'react';
import { Container, Box, Typography, FormControl, InputLabel, Select, MenuItem, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';



function ExpenseReport() {
  const [reportPeriod, setReportPeriod] = useState('');

  const handleGenerateReport = () => {
    
  }


  const handlePeriodChange = (event) => {
    setReportPeriod(event.target.value);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>BÁO CÁO CHI TIÊU</Typography>
      <Box sx={{ mb: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Chọn khoảng thời gian</InputLabel>
          <Select
            value={reportPeriod}
            onChange={handlePeriodChange}
            label="Chọn khoảng thời gian"
          >
            <MenuItem value="monthly">Hàng tháng</MenuItem>
            <MenuItem value="yearly">Hàng năm</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleGenerateReport} sx={{ ml: 2 }}>
          Tạo báo cáo
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Báo cáo chi tiêu chi tiết</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Danh mục</TableCell>
                    <TableCell align="right">Tổng chi tiêu</TableCell>
                    <TableCell align="right">Số lượng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow >
                      <TableCell>Chi tiết</TableCell>
                      <TableCell align="right">$1000</TableCell>
                      <TableCell align="right">2000</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ExpenseReport;
