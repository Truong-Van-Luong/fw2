import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import OverviewIcon from "@mui/icons-material/Assessment";
import ReportIcon from "@mui/icons-material/Report";
import IconButton from "@mui/material/IconButton";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ChecklistIcon from "@mui/icons-material/Checklist";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#0D47A1",
  color: "#fff",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  "& .MuiListItemButton-root": {
    transition: "background-color 0.3s, color 0.3s",
    "&:hover": {
      backgroundColor: "#1565C0",
      color: "#fff",
    },
  },
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerStyled = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorElAccount, setAnchorElAccount] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [userRole, setUserRole] = useState(
    localStorage.getItem("token")
      ? JSON.parse(atob(localStorage.getItem("token").split(".")[1])).role
      : null
  );

  const menuItems = [
    { text: "Trang chủ", icon: <HomeIcon />, path: "/" },
    { text: "Đăng ký", icon: <AppRegistrationIcon />, path: "/register" },
    { text: "Đăng nhập", icon: <LoginIcon />, path: "/login" },
    { text: "Thêm chi phí", icon: <CreateIcon />, path: "/expense-create" },
    { text: "Danh sách", icon: <ChecklistIcon />, path: "/expense-list" },
    { text: "Tổng quan chi phí", icon: <OverviewIcon />, path: "/expenses" },
    { text: "Báo cáo chi tiêu", icon: <ReportIcon />, path: "/expense-report" },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAccountMenuClick = (event) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorElAccount(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserRole(null);
    setSnackbarMessage("Bạn đã đăng xuất");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
    setTimeout(() => {
      navigate("/login", { replace: true });
      window.location.reload();
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarStyled position="fixed" open={open}>
        <Toolbar
          sx={{
            bgcolor: "#1976d2",
            display: "flex",
            justifyContent: "space-between",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "#1565C0",
            },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              color: open ? "#fff" : "#0D47A1",
              transition: "color 0.3s",
            }}
          >
            <ArrowCircleRightIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            QUẢN LÝ CHI TIÊU
          </Typography>
          <div>
            {userRole === "admin" && (
              <IconButton
                color="inherit"
                onClick={() => navigate("/admin")}
                sx={{ ml: 2 }}
              >
                <AdminPanelSettingsIcon />
              </IconButton>
            )}
            {userRole && (
              <>
                <Tooltip title="Tài khoản">
                  <IconButton
                    onClick={handleAccountMenuClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={anchorElAccount ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={anchorElAccount ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "#1565C0" }}>
                      <AccountCircleIcon />
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorElAccount}
                  id="account-menu"
                  open={Boolean(anchorElAccount)}
                  onClose={handleAccountMenuClose}
                  onClick={handleAccountMenuClose}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon fontSize="small" />
                    Đăng xuất
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        </Toolbar>
      </AppBarStyled>
      <DrawerStyled variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#1565C0",
                },
              }}
            >
              <ListItemIcon sx={{ color: open ? "#fff" : "#0D47A1" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ color: open ? "#fff" : "#0D47A1" }}
              />
            </ListItem>
          ))}
        </List>
      </DrawerStyled>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          "& .MuiAlert-root": {
            bgcolor: snackbarSeverity === "success" ? "#4caf50" : "#f44336",
            color: "#fff",
          },
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
