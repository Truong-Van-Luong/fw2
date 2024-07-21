import { Link } from 'react-router-dom';
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
import { useState } from 'react';

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const menuItems = [
    { text: 'Trang chủ', icon: <HomeIcon />, path: '/' },
    { text: 'Đăng nhập', icon: <AccountCircleIcon />, path: '/login' },
    { text: 'Đăng ký', icon: <AppRegistrationIcon />, path: '/register' },
    { text: 'Thêm chi phí', icon: <CreateIcon />, path: '/create' },
    { text: 'Tổng quan chi phí', icon: <OverviewIcon />, path: '/expenses' },
    { text: 'Báo cáo chi tiêu', icon: <ReportIcon />, path: '/expense-report' },
  ];

  const adminItems = [
    { text: 'User Management', path: '/admin/users' },
    { text: 'Expense Management', path: '/admin/expenses' },
  ];

  const [anchorEl, setAnchorEl] = useState(null);

  const handleAdminMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setAnchorEl(null);
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
    </Box>
  );
}
