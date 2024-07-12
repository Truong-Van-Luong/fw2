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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import OverviewIcon from '@mui/icons-material/Assessment';
import ReportIcon from '@mui/icons-material/Report';

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const menuItems = [
    { text: 'Trang chủ', icon: <HomeIcon />, path: '/' },
    { text: 'Đăng nhập', icon: <AccountCircleIcon />, path: '/login' },
    { text: 'Đăng ký', icon: <AppRegistrationIcon />, path: '/register' },
    { text: 'Thêm chi phí', icon: <CreateIcon />, path: '/create' },
    { text: 'Cài đặt ngân sách', icon: <AttachMoneyIcon />, path: '/budget' },
    { text: 'Tổng quan chi phí', icon: <OverviewIcon />, path: '/expenses' },
    { text: 'Báo cáo chi tiêu', icon: <ReportIcon />, path: '/expense-report' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
           QUẢN LÝ CHI TIÊU
          </Typography>
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
                <ListItemIcon>{item.icon}</ListItemIcon>
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
