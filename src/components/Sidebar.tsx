"use client";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button, ListItemButton } from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

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

  const { data: session, status, update } = useSession();
  console.log(status, session);

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
        <Box
          sx={{
            mt: "auto",
            mb: "50px",
            p: "10px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {status === "authenticated" ? (
            <div className="flex ">
              <p className="text-white flex-1 mr-5 items-center">
                Welcome back, <strong>{session?.user?.name}</strong>!
              </p>

              <Button
                variant="contained"
                onClick={() => signOut()}
                sx={{ p: "4px 8px" }}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button variant="contained" component={Link} href="/login">
                Login
              </Button>
              <Button variant="contained" component={Link} href="/signUp">
                SignUp
              </Button>
            </div>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
