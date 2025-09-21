

import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import DashboardIcon from '@mui/icons-material/Dashboard'
import TableChartIcon from '@mui/icons-material/TableChart'
import MapIcon from '@mui/icons-material/Map'
import InfoIcon from '@mui/icons-material/Info'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar, toggleTheme, closeSidebar } from '../../store/actions'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function AppShell({ children }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { sidebarOpen, themeMode } = useSelector(s=>s.ui)

  const navItems = [
    { label: 'Overview', icon: <DashboardIcon />, to: '/overview' },
    { label: 'EV Data', icon: <TableChartIcon />, to: '/ev-data' },
    { label: 'Map', icon: <MapIcon />, to: '/map' },
    { label: 'About', icon: <InfoIcon />, to: '/about' },
  ]

  return (
    <Box sx={{ display:'flex', minHeight:'100vh', width: '100%' }}>
      <AppBar position="fixed" color="primary" elevation={1}>
        <Toolbar>
          <IconButton color="inherit" onClick={()=>dispatch(toggleSidebar())} edge="start" sx={{ mr:1 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight:700, letterSpacing:0.3, mr:'auto' }}>
            AutoToll IQ
          </Typography>
          <IconButton color="inherit" title="Toggle theme" onClick={()=>dispatch(toggleTheme())}>
            {themeMode==='light' ? <DarkModeIcon/> : <LightModeIcon/>}
          </IconButton>
          <IconButton color="inherit" aria-label="notifications">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="profile">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={sidebarOpen} onClose={()=>dispatch(closeSidebar())}>
        <Box sx={{ width: 280 }} role="presentation" onClick={()=>dispatch(closeSidebar())}>
          <Typography variant="h6" sx={{ px:2.5, py:2, fontWeight:700 }}>Navigation</Typography>
          <Divider />
          <List>
            {navItems.map((item)=> (
              <ListItemButton key={item.to} selected={location.pathname===item.to} onClick={()=>navigate(item.to)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flex:1, pt: 10 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  )
}
