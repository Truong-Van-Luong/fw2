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
              <Typography variant="h5">Đăng nhập tài khoản</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Đăng nhập để quản lý chi phí dễ dàng hơn.
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/login"
                sx={{ mt: 2, bgcolor: '#33ab9f', '&:hover': { bgcolor: '#2a9587' } }}
              >
                Đi tới đăng nhập
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5">Thêm chi phí</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Thêm chi phí vào ngày hôm nay.
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/create"
                sx={{ mt: 2, bgcolor: '#33ab9f', '&:hover': { bgcolor: '#2a9587' } }}
              >
                Đi tới thêm chi phí
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5">Báo cáo chi tiêu</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Xem và tính toán chi phí của bạn.
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/expense-report"
                sx={{ mt: 2, bgcolor: '#33ab9f', '&:hover': { bgcolor: '#2a9587' } }}
              >
                Đi tới Báo cáo chi tiêu
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5">Tổng quan chi phí</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Thêm và quản lý các Tổng quan chi phí của bạn.
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/expenses"
                sx={{ mt: 2, bgcolor: '#33ab9f', '&:hover': { bgcolor: '#2a9587' } }}
              >
                Đi tới Tổng quan chi phí
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
