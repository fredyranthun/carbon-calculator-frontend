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
import { usePathname } from "next/navigation";

export default function Navbar() {
  const isMobile = useMediaQuery("(max-width: 820px)");
  const pathname = usePathname();

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
          {links.map((link) => (
            <Button
              key={link.name}
              disabled={pathname === link.href}
              color="inherit"
              href={link.href}
              LinkComponent={Link}
            >
              {link.name}
            </Button>
          ))}
          <ModeSwitch />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
