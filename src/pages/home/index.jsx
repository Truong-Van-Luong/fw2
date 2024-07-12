import { Container, Box, Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
          TRANG CHỦ
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5">Quản lý chi phí</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Thêm, chỉnh sửa và phân loại chi phí của bạn.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/create"
                sx={{ mt: 2 }}
              >
                Đi tới Quản lý chi phí
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5">Cài đặt ngân sách</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Đặt và điều chỉnh ngân sách hàng tháng cho các loại chi phí.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/budget"
                sx={{ mt: 2 }}
              >
                Đi tới Cài đặt ngân sách
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5">Báo cáo chi tiêu</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Tạo báo cáo chi phí chi tiết trong khoảng thời gian cụ thể.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/expense-report"
                sx={{ mt: 2 }}
              >
                Đi tới Báo cáo chi tiêu
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5">Chi phí định kỳ</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Thêm và quản lý các chi phí định kỳ của bạn.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/expenses"
                sx={{ mt: 2 }}
              >
                Đi tới Chi phí định kỳ
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
