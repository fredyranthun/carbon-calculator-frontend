import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import ModeSwitch from "./ModeSwitch";
import Link from "next/link";

export default function MobileNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const links = [
    {
      name: "Housing",
      href: "/housing",
    },
    {
      name: "Transportation",
      href: "/transportation",
    },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Carbon Footprint Calculator
        </Typography>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            {links.map((link) => (
              <ListItem key={link.name}>
                <Link href={link.href} passHref>
                  <ListItemText primary={link.name} />
                </Link>
              </ListItem>
            ))}
          </List>
          <ModeSwitch />
        </Box>
      </Drawer>
    </AppBar>
  );
}
