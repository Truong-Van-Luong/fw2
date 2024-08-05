import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import { fetchUsers, selectUsers, selectError, selectStatus } from '../../../redux/slices/admins/userManagementSlice';

const UserManagement = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUsers(token));
    }
  }, [dispatch]);

  if (status === 'loading') {
    return <Typography>Đang tải...</Typography>;
  }

  if (status === 'failed') {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>Quản Lý Người Dùng</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên người dùng</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Vai trò</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
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
