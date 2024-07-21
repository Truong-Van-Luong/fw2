import { Container, Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User' },
];

function UserManagement() {
  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
        Quản lý user
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 4, mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default UserManagement;
