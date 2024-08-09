import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Snackbar,
  Alert,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/slices/authSlice";
import "./register.scss"; // Ensure you have this SCSS file for additional styling

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(registerUser(data));
      if (registerUser.fulfilled.match(resultAction)) {
        setSnackbarMessage("Bạn đã đăng ký thành công");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setSnackbarMessage(resultAction.payload || "Đăng ký thất bại");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Đã xảy ra lỗi trong quá trình đăng ký");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Paper
        elevation={10}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          borderRadius: 4,
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          sx={{ color: "#1976d2", fontWeight: "bold", mb: 3 }}
        >
          Đăng Ký
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Tên"
            placeholder="Nhập tên"
            autoComplete="username"
            {...register("username", { required: "Tên là bắt buộc" })}
            error={!!errors.username}
            helperText={errors.username ? errors.username.message : ""}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#2196f3",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
              },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            placeholder="Nhập email"
            autoComplete="email"
            {...register("email", {
              required: "Email là bắt buộc",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email không hợp lệ",
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#2196f3",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
              },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
            label="Mật khẩu"
            type="password"
            placeholder="Nhập mật khẩu"
            autoComplete="new-password"
            {...register("password", {
              required: "Mật khẩu là bắt buộc",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự",
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#2196f3",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
              },
            }}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked color="primary" />}
            label="Tôi đã đọc và đồng ý với điều khoản"
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              mb: 1,
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#1565c0" },
              transition: "background-color 0.3s, transform 0.2s",
              "&:active": { transform: "scale(0.98)" },
            }}
          >
            Đăng Ký
          </Button>
        </form>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: 2 }} // Add some margin to position the Snackbar better
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            bgcolor: snackbarSeverity === "success" ? "#4caf50" : "#f44336", // Match colors with CreateExpense
            color: "#fff",
            "& .MuiAlert-icon": {
              color: "#fff", // Icon color
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Register;
