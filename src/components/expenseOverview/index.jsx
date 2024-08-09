import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchOverviewData } from "../../redux/slices/expenseOverviewSlice";

function ExpenseOverview() {
  const dispatch = useDispatch();
  const {
    data: overviewData,
    error,
    status,
  } = useSelector((state) => state.overview);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchOverviewData(token));
    }
  }, [dispatch]);

  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <Typography color="error" align="center" variant="h6">
        Bạn phải đăng nhập để xem tổng quan chi phí.
      </Typography>
    );
  }

  if (status === "loading") {
    return (
      <Typography align="center" variant="h6">
        Đang tải...
      </Typography>
    );
  }

  if (status === "failed") {
    return (
      <Typography color="error" align="center" variant="h6">
        {error}
      </Typography>
    );
  }

  if (!overviewData) {
    return null;
  }

  const { totalSpending, categorySummary, userExpenses } = overviewData;

  return (
    <Container maxWidth="lg">
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
        TỔNG QUAN CHI PHÍ
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              bgcolor: "#ffffff",
              borderRadius: 2,
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: "#1976d2" }}>
              Tóm tắt
            </Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              Tổng chi tiêu:{" "}
              <span style={{ color: "#d32f2f" }}>${totalSpending}</span>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              bgcolor: "#e3f2fd",
              borderRadius: 2,
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: "#0288d1" }}>
              Phân tích theo danh mục
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                      Danh mục
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: "bold", color: "#555" }}
                    >
                      Chi tiêu
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(categorySummary).map(([category, data]) => (
                    <TableRow
                      key={category}
                      sx={{ "&:nth-of-type(odd)": { bgcolor: "#f9f9f9" } }}
                    >
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
          <Paper
            sx={{
              p: 3,
              bgcolor: "#fff8e1",
              borderRadius: 2,
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: "#fbc02d" }}>
              Xu hướng chi phí theo thời gian
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={userExpenses}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="date" stroke="#555" />
                <YAxis stroke="#555" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#42a5f5"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ExpenseOverview;
