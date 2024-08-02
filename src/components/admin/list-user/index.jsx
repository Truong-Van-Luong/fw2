import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/users', {
        headers: { 'x-access-token': localStorage.getItem('token') }
      });
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      setError('Không thể tải danh sách người dùng');
    }
  };

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
