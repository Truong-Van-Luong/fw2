import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  fetchExpenses,
  selectExpenses,
  selectError,
  selectStatus,
} from "../../../redux/slices/admins/expenseManagementSlice";

const ExpenseManagement = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenses);
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchExpenses(token));
    }
  }, [dispatch]);

  if (status === "loading") {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (status === "failed") {
    return (
      <Typography color="error" align="center" variant="h6">
        {error}
      </Typography>
    );
  }

  const groupByUser = (expenses) => {
    if (!Array.isArray(expenses)) {
      return {};
    }
    return expenses.reduce((acc, expense) => {
      if (!acc[expense.user]) {
        acc[expense.user] = [];
      }
      acc[expense.user].push(expense);
      return acc;
    }, {});
  };

  const groupedExpenses = groupByUser(expenses);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        sx={{ mt: 4, mb: 4, textAlign: "center", color: "#333" }}
      >
        Quản Lý Chi Tiêu
      </Typography>
      {error && (
        <Typography color="error" align="center" variant="h6">
          {error}
        </Typography>
      )}
      {Object.keys(groupedExpenses).map((user) => (
        <Accordion key={user} sx={{ mb: 2, boxShadow: 3 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${user}-content`}
            id={`panel-${user}-header`}
            sx={{ bgcolor: "#e3f2fd", borderBottom: "1px solid #ccc" }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {user}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer
              component={Paper}
              sx={{ maxHeight: 400, overflow: "auto" }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f1f1f1" }}>
                    <TableCell>Mô tả</TableCell>
                    <TableCell>Ngày tháng</TableCell>
                    <TableCell>Số tiền</TableCell>
                    <TableCell>Danh mục</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupedExpenses[user].map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{expense.amount}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default ExpenseManagement;
