import { Container, Box, Typography, Grid, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            mb: 4,
            color: "#1976d2",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Trang Chủ
        </Typography>
        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                bgcolor: "#e3f2fd",
                borderRadius: 3,
                boxShadow: 3,
                width: "100%",
                height: "200px",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#0277bd", fontWeight: "bold" }}
              >
                Đăng Nhập Tài Khoản
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginTop: 1.5, color: "#555" }}
              >
                Đăng nhập để quản lý chi phí dễ dàng hơn.
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/login"
                sx={{
                  mt: 2.7,
                  bgcolor: "#4fc3f7",
                  "&:hover": { bgcolor: "#29b6f6" },
                  fontWeight: "bold",
                  width: "150px",
                  height: "40px",
                  borderRadius: "20px",
                  fontSize: "0.875rem",
                  transition: "background-color 0.3s",
                }}
              >
                Đăng Nhập
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                bgcolor: "#fce4ec",
                borderRadius: 3,
                boxShadow: 3,
                width: "100%",
                height: "200px",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#d81b60", fontWeight: "bold" }}
              >
                Thêm Chi Phí
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginTop: 1.5, color: "#555" }}
              >
                Thêm chi phí vào ngày hôm nay.
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/expense-create"
                sx={{
                  mt: 5,
                  bgcolor: "#f48fb1",
                  "&:hover": { bgcolor: "#f06292" },
                  fontWeight: "bold",
                  width: "150px",
                  height: "40px",
                  borderRadius: "20px",
                  fontSize: "0.875rem",
                  transition: "background-color 0.3s",
                }}
              >
                Thêm Chi Phí
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                bgcolor: "#e8f5e9",
                borderRadius: 3,
                boxShadow: 3,
                width: "100%",
                height: "200px",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#388e3c", fontWeight: "bold" }}
              >
                Báo Cáo Chi Tiêu
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginTop: 1.5, color: "#555" }}
              >
                Xem và tính toán chi phí của bạn.
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/expense-report"
                sx={{
                  mt: 5,
                  bgcolor: "#81c784",
                  "&:hover": { bgcolor: "#66bb6a" },
                  fontWeight: "bold",
                  width: "150px",
                  height: "40px",
                  borderRadius: "20px",
                  fontSize: "0.875rem",
                  transition: "background-color 0.3s",
                }}
              >
                Báo Cáo
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                bgcolor: "#fffde7",
                borderRadius: 3,
                boxShadow: 3,
                width: "100%",
                height: "200px",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#fbc02d", fontWeight: "bold" }}
              >
                Tổng Quan Chi Phí
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginTop: 1.5, color: "#555" }}
              >
                Thêm và quản lý các tổng quan chi phí của bạn.
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/expenses"
                sx={{
                  mt: 2.5,
                  bgcolor: "#fdd835",
                  "&:hover": { bgcolor: "#fbc02d" },
                  fontWeight: "bold",
                  width: "150px",
                  height: "40px",
                  borderRadius: "20px",
                  fontSize: "0.875rem",
                  transition: "background-color 0.3s",
                }}
              >
                Tổng Quan
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
