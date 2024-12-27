"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ModeSwitch from "./ModeSwitch";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  const isMobile = useMediaQuery("(max-width: 820px)");

  if (isMobile) {
    return <MobileNavbar />;
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Carbon Footprint Calculator
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link href="/housing" passHref>
            <Button color="inherit">Housing</Button>
          </Link>
          <Link href="/transportation" passHref>
            <Button color="inherit">Transportation</Button>
          </Link>
          <ModeSwitch />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
