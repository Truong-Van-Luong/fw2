import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Paper,
  CircularProgress,
  InputLabel,
  FormControl,
  Select,
  MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  fetchExpenses,
  selectExpense,
  clearSelectedExpense,
  updateExpense,
  deleteExpense,
} from "../../../redux/slices/expenseSlice";

function ExpenseList() {
  const dispatch = useDispatch();
  const {
    items: expenses,
    selectedExpense,
    error,
    status,
  } = useSelector((state) => state.expenses);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [action, setAction] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchExpensesData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchExpenses(token));
    } else {
      setErrorMessage("Bạn phải đăng nhập để xem danh sách chi phí.");
    }
  };

  const handleOpenDialog = (expense, actionType) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Bạn phải đăng nhập để thực hiện thao tác này");
      return;
    }

    dispatch(selectExpense(expense));
    setDescription(expense.description);
    setDate(expense.date);
    setAmount(expense.amount);
    setCategory(expense.category);
    setAction(actionType);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDescription("");
    setDate("");
    setAmount("");
    setAction("");
    dispatch(clearSelectedExpense());
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("Bạn phải đăng nhập để thực hiện thao tác này");
      return;
    }

    if (action === "edit" && selectedExpense) {
      try {
        await dispatch(
          updateExpense({
            id: selectedExpense.id,
            updates: { description, date, amount, category },
            token,
          })
        ).unwrap();
        fetchExpensesData();
        handleCloseDialog();
      } catch (error) {
        setErrorMessage("Cập nhật chi phí thất bại");
      }
    } else if (action === "delete" && selectedExpense) {
      try {
        await dispatch(
          deleteExpense({ id: selectedExpense.id, token })
        ).unwrap();
        fetchExpensesData();
        handleCloseDialog();
      } catch (error) {
        setErrorMessage("Xóa chi phí thất bại");
      }
    } else {
      setErrorMessage("Không có chi phí nào được chọn");
    }
  };

  useEffect(() => {
    fetchExpensesData();
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
        <CircularProgress color="primary" />
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
        Danh Sách Chi Phí
      </Typography>
      {errorMessage && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {errorMessage}
        </Typography>
      )}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Mô tả
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Ngày tháng
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Số tiền
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Danh mục
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleOpenDialog(expense, "edit")}
                    sx={{ color: "#4caf50" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenDialog(expense, "delete")}
                    sx={{ color: "#f44336" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle sx={{ backgroundColor: "#1976d2", color: "#fff" }}>
          {action === "edit" ? "Cập Nhật Chi Phí" : "Xóa Chi Phí"}
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#f5f5f5" }}>
          {action === "edit" && (
            <>
              <TextField
                label="Mô tả"
                fullWidth
                variant="outlined"
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ bgcolor: "#fff", mb: 2 }}
              />
              <TextField
                label="Ngày tháng"
                type="date"
                fullWidth
                variant="outlined"
                margin="normal"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ bgcolor: "#fff", mb: 2 }}
              />
              <TextField
                label="Số tiền"
                type="number"
                fullWidth
                variant="outlined"
                margin="normal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{ bgcolor: "#fff", mb: 2 }}
              />
               <FormControl
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{ bgcolor: "#f0f0f0", borderRadius: 1 }}
        >
          <InputLabel>Danh mục</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Danh mục"
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#2196f3" },
                "&:hover fieldset": { borderColor: "#1976d2" },
              },
            }}
          >
            <MenuItem value="">
              <em>Chọn danh mục</em>
            </MenuItem>
            <MenuItem value="Tiền thuê nhà">Tiền thuê nhà</MenuItem>
            <MenuItem value="Cửa hàng tạp hóa">Cửa hàng tạp hóa</MenuItem>
            <MenuItem value="Phương tiện">Phương tiện đi lại</MenuItem>
            <MenuItem value="Chi phí phát sinh">Chi phí khác</MenuItem>
            <MenuItem value="Ăn uống">Ăn uống</MenuItem>
          </Select>
        </FormControl>
            </>
          )}
          {action === "delete" && (
            <Typography>
              Bạn có chắc chắn muốn xóa chi phí này không?
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#f5f5f5" }}>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            {action === "edit" ? "Cập Nhật" : "Xóa"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ExpenseList;
