import { Outlet, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const DrawerStyled = styled(Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "#0D47A1",
    color: "#fff",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#1565C0",
    },
  },
}));

const ListItemButtonStyled = styled(ListItemButton)(() => ({
  "&:hover": {
    backgroundColor: "#1976D2",
  },
  transition: "background-color 0.3s",
}));

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleBackToUser = () => {
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBarStyled position="fixed">
        <Toolbar
          sx={{
            bgcolor: "#0D47A1",
            display: "flex",
            justifyContent: "space-between",
            transition: "background-color 0.3s",
          }}
        >
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleBackToUser}
            sx={{ "&:hover": { color: "#90CAF9" }, transition: "color 0.3s" }} // Add hover effect
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            ADMIN
          </Typography>
        </Toolbar>
      </AppBarStyled>
      <DrawerStyled variant="permanent">
        <List sx={{ mt: 10 }}>
          <ListItem>
            <ListItemButtonStyled component={Link} to="/admin/users">
              <ListItemText primary="Quản lý người dùng" />
            </ListItemButtonStyled>
          </ListItem>
          <ListItem>
            <ListItemButtonStyled component={Link} to="/admin/expenses">
              <ListItemText primary="Quản lý chi tiêu" />
            </ListItemButtonStyled>
          </ListItem>
        </List>
      </DrawerStyled>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
