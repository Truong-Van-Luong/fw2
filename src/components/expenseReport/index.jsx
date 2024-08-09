import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Paper, Grid } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { fetchMonthlyReport } from "../../redux/slices/expenseReportSlice";

const ExpenseReport = () => {
  const dispatch = useDispatch();
  const {
    data: categorySummary,
    error,
    status,
  } = useSelector((state) => state.report);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchMonthlyReport(token));
    } else {
      setErrorMessage("Bạn phải đăng nhập để xem báo cáo chi tiêu.");
    }
  }, [dispatch]);

  if (status === "loading") {
    return (
      <Typography align="center" variant="h6">
        Đang tải...
      </Typography>
    );
  }

  if (status === "failed") {
    return (
      <Typography align="center" color="error" variant="h6">
        {error}
      </Typography>
    );
  }

  if (errorMessage) {
    return (
      <Typography align="center" color="error" variant="h6">
        {errorMessage}
      </Typography>
    );
  }

  const data = Object.keys(categorySummary).map((category) => ({
    name: category,
    value: categorySummary[category],
  }));

  const COLORS = ["#4caf50", "#2196f3", "#ff5722", "#ffeb3b", "#9c27b0"];

  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        sx={{
          mt: 6,
          mb: 4,
          color: "#1976d2",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Báo Cáo Chi Tiêu Hàng Tháng
      </Typography>
      <Paper sx={{ p: 3, bgcolor: "#f5f5f5", borderRadius: 2, boxShadow: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={8}>
            <PieChart width={800} height={400}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                wrapperStyle={{
                  fontSize: "14px",
                  color: "#333",
                  padding: "10px",
                }}
              />
            </PieChart>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ExpenseReport;
