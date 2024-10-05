import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  ListItemIcon,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import EstimateIcon from "@mui/icons-material/Receipt";
import { NavLink, useNavigate } from "react-router-dom";
import routes from "../Routes/Routes";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: `${routes.DASHBOARD}` },
    { text: "Projects", icon: <FolderIcon />, path: `${routes.PROJECTS}` },
    {
      text: "Estimates",
      icon: <EstimateIcon />,
      path: `${routes.ESTIMATIONS}`,
    },
  ];
  const handleLogout = () => {
    dispatch(logout());
    navigate(routes.SIGNIN);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250, margin: 0 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        Menu
      </Typography>
      <List>
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            style={{ textDecoration: "none" }}
            key={index}
          >
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ ml: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Sidebar;
