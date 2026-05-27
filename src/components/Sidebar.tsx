"use client";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { ListItemButton } from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  CreditCard,
  Plane,
  Settings,
  Info,
} from "lucide-react";
import {
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
export default function Sidebar() {
  const drawerWidth = 240;

  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "Expenses", path: "/expenses", icon: CreditCard },
    { label: "Trips", path: "/trips", icon: Plane },
    { label: "Settings", path: "/settings", icon: Settings },
    { label: "About", path: "/about", icon: Info },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
            backgroundColor: "primary.dark",
          },
        }}
      >
        <Typography
          variant="h1"
          component="h2"
          sx={{
            mt: 2,
            p: 2,
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: 1,
            borderColor: "#808080",
            color: "primary.light",
          }}
        >
          Expense<span style={{ color: "#1D9E75" }}>Tracker</span>
        </Typography>
        <Toolbar />
        <List>
          {navItems.map((item) => (
            <ListItem
              key={item.label}
              sx={{
                color: "primary.light",
                borderLeft:
                  pathname === item.path ? "3px solid #1D9E75" : "none",
              }}
            >
              <ListItemButton component={Link} href={item.path}>
                <item.icon size={20} />
                <ListItemText primary={item.label} sx={{ ml: "20px" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
