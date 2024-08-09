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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/slices/authSlice";
import "./login.scss";

function Login() {
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
      const resultAction = await dispatch(loginUser(data));
      if (loginUser.fulfilled.match(resultAction)) {
        setSnackbarMessage("Đăng nhập thành công");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        setTimeout(() => {
          navigate("/", { replace: true });
          window.location.reload();
        }, 1000);
      } else {
        setSnackbarMessage(resultAction.payload || "Đăng nhập thất bại");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Đã xảy ra lỗi trong quá trình đăng nhập");
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
        elevation={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          borderRadius: 4,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            boxShadow: "0px 6px 30px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          sx={{ color: "#1976d2", fontWeight: "bold" }}
        >
          Đăng Nhập
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
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
            autoComplete="current-password"
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
            Đăng Nhập
          </Button>
          <Typography variant="body2" color="textSecondary" align="center">
            <a
              href="#!"
              style={{
                textDecoration: "none",
                color: "#1976d2",
                fontWeight: 500,
              }}
            >
              Quên mật khẩu?
            </a>
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mt: 2 }}
          >
            Bạn có tài khoản chưa?{" "}
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "#1976d2",
                fontWeight: 500,
              }}
            >
              Đăng ký ngay
            </Link>
          </Typography>
        </form>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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

export default Login;
