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
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
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

import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const menuItems = [
    { text: 'Trang chủ', icon: <HomeIcon />, path: '/' },
    // { text: 'Đăng nhập', icon: <AccountCircleIcon />, path: '/login' },
    // { text: 'Đăng ký', icon: <AppRegistrationIcon />, path: '/register' },
    { text: 'Thêm chi phí', icon: <CreateIcon />, path: '/expense-create' },
    { text: 'Danh sách', icon: <ChecklistIcon />, path: '/expense-list' },
    { text: 'Tổng quan chi phí', icon: <OverviewIcon />, path: '/expenses' },
    { text: 'Báo cáo chi tiêu', icon: <ReportIcon />, path: '/expense-report' },
  ];

  const adminItems = [
    { text: 'Quản lý người dùng', path: '/admin/users' },
    { text: 'Quản lý chi tiêu người dùng', path: '/admin/expenses' },
  ];

  const [anchorElAdmin, setAnchorElAdmin] = useState(null);
  const [anchorElAccount, setAnchorElAccount] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleAdminMenuClick = (event) => {
    setAnchorElAdmin(event.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setAnchorElAdmin(null);
  };

  const handleAccountMenuClick = (event) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorElAccount(null);
  };

  const handleLogout = () => {
    const token = localStorage.getItem('token');
  
    if (token) {
      localStorage.removeItem('token');
      setSnackbarMessage('Bạn đã đăng xuất');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
  
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1000);
  
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setSnackbarMessage('Bạn chưa đăng nhập');
      setSnackbarSeverity('info');
      setOpenSnackbar(true);
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
              anchorEl={anchorElAdmin}
              open={Boolean(anchorElAdmin)}
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
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleAccountMenuClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={anchorElAccount ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={anchorElAccount ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>L</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElAccount}
              id="account-menu"
              open={Boolean(anchorElAccount)}
              onClose={handleAccountMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleAccountMenuClose}>
                <Avatar fontSize="small" /> Tài khoản của tôi
              </MenuItem>
              <MenuItem component={Link} to="/login" onClick={handleAccountMenuClose}>
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                Đăng nhập
              </MenuItem>
              <MenuItem component={Link} to="/register" onClick={handleAccountMenuClose}>
                <ListItemIcon>
                  <HowToRegIcon fontSize="small" />
                </ListItemIcon>
                Đăng ký
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Đăng xuất
              </MenuItem>
            </Menu>
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
