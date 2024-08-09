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
  CircularProgress,
} from "@mui/material";
import {
  fetchUsers,
  selectUsers,
  selectError,
  selectStatus,
} from "../../../redux/slices/admins/userManagementSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUsers(token));
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

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        sx={{ mt: 4, mb: 4, textAlign: "center", color: "#333" }}
      >
        Quản Lý Người Dùng
      </Typography>
      {error && (
        <Typography color="error" align="center" variant="h6">
          {error}
        </Typography>
      )}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Tên người dùng
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Vai trò
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserManagement;
