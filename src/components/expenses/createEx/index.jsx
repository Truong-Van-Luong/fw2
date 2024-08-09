import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Box,
  Typography,
  IconButton,
  Snackbar,
} from "@mui/material";
import { addExpense } from "../../../redux/slices/expenseSlice";
import { CheckCircle, Error } from "@mui/icons-material";

function CreateExpense() {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setSnackbarMessage("Bạn phải đăng nhập trước khi thêm chi phí");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const expense = { description, date, amount, category };

    try {
      await dispatch(addExpense({ expense, token })).unwrap();
      setSnackbarMessage("Chi phí được thêm thành công");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setDescription("");
      setDate("");
      setAmount("");
      setCategory("");
    } catch (error) {
      setSnackbarMessage("Thêm chi phí thất bại");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 2,
          boxShadow: 5,
          backgroundColor: "#ffffff",
          transition: "box-shadow 0.3s, transform 0.3s",
          "&:hover": {
            boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 4, color: "#1976d2", fontWeight: "bold" }}
        >
          Thêm Chi Phí
        </Typography>
        <TextField
          label="Mô tả"
          fullWidth
          variant="outlined"
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          sx={{
            bgcolor: "#f0f0f0",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#2196f3" },
              "&:hover fieldset": { borderColor: "#1976d2" },
            },
          }}
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
          required
          sx={{
            bgcolor: "#f0f0f0",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#2196f3" },
              "&:hover fieldset": { borderColor: "#1976d2" },
            },
          }}
        />
        <TextField
          label="Số tiền"
          type="number"
          fullWidth
          variant="outlined"
          margin="normal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          sx={{
            bgcolor: "#f0f0f0",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#2196f3" },
              "&:hover fieldset": { borderColor: "#1976d2" },
            },
          }}
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
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: "#1976d2",
            "&:hover": { bgcolor: "#1565c0" },
            transition: "background-color 0.3s, transform 0.3s",
            "&:active": { transform: "scale(0.98)" },
          }}
        >
          Thêm Chi Phí
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setOpenSnackbar(false)}
          >
            {snackbarSeverity === "success" ? (
              <CheckCircle color="success" />
            ) : (
              <Error color="error" />
            )}
          </IconButton>
        }
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor:
              snackbarSeverity === "success" ? "#4caf50" : "#f44336",
            color: "#fff",
          },
        }}
      />
    </Container>
  );
}

export default CreateExpense;
