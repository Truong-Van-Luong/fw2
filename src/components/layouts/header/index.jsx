import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CreateIcon from '@mui/icons-material/Create';
import OverviewIcon from '@mui/icons-material/Assessment';
import ReportIcon from '@mui/icons-material/Report';
import IconButton from '@mui/material/IconButton';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const menuItems = [
    { text: 'Trang chủ', icon: <HomeIcon />, path: '/' },
    { text: 'Đăng nhập', icon: <AccountCircleIcon />, path: '/login' },
    { text: 'Đăng ký', icon: <AppRegistrationIcon />, path: '/register' },
    { text: 'Thêm chi phí', icon: <CreateIcon />, path: '/expense-create' },
    { text: 'Danh sách', icon: <ChecklistIcon />, path: '/expense-list' },
    { text: 'Tổng quan chi phí', icon: <OverviewIcon />, path: '/expenses' },
    { text: 'Báo cáo chi tiêu', icon: <ReportIcon />, path: '/expense-report' },
  ];

  const adminItems = [
    { text: 'Quản lý người dùng', path: '/admin/users' },
    { text: 'Quản lý chi tiêu người dùng', path: '/admin/expenses' },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleAdminMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const token = localStorage.getItem('token'); // Kiểm tra token

    if (token) {
      localStorage.removeItem('token'); // Xóa token
      setSnackbarMessage('Bạn đã đăng xuất');
      setSnackbarSeverity('success');
      setOpenSnackbar(true); // Hiển thị thông báo đăng xuất
      setTimeout(() => navigate('/login'), 1000); // Chuyển hướng sau 1 giây
    } else {
      setSnackbarMessage('Bạn vui lòng đăng nhập');
      setSnackbarSeverity('info');
      setOpenSnackbar(true); // Hiển thị thông báo yêu cầu đăng nhập
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar sx={{ bgcolor: '#33ab9f', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div">
            QUẢN LÝ CHI TIÊU
          </Typography>
          <div>
            <IconButton
              color="inherit"
              onClick={handleAdminMenuClick}
            >
              <AdminPanelSettingsIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleAdminMenuClose}
            >
              {adminItems.map((item) => (
                <MenuItem
                  key={item.text}
                  component={Link}
                  to={item.path}
                  onClick={handleAdminMenuClose}
                >
                  {item.text}
                </MenuItem>
              ))}
            </Menu>
            <IconButton
              color="inherit"
              onClick={handleLogout}
              sx={{ ml: 2 }}
            >
              <AccountCircleIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon sx={{ color: '#33ab9f' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
