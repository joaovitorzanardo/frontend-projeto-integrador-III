import React from 'react'

import { 
  Box, 
  Divider, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography
  } from '@mui/material'

import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartIcon from '@mui/icons-material/BarChart';

export const CustomSideMenu = () => {
  return (
    <Box sx={{width: '250px', bgcolor: '#121212', color: '#ffffff', height: '100vh'}}>
      <Typography align='center' variant='h5' sx={{py: '25px'}}>Sistema</Typography>
      <Divider light/>
      <List>
          <ListItemButton href='/'>
            <ListItemIcon>
              <BarChartIcon sx={{color: '#ffffff'}}/>
            </ListItemIcon>
            <ListItemText primary='Dashboard'/>
          </ListItemButton>
        <ListItemButton href='/clientes'>
          <ListItemIcon>
            <PersonIcon sx={{color: '#ffffff'}}/>
            </ListItemIcon>
            <ListItemText primary='Clientes'/>
          </ListItemButton>
        <ListItemButton href='/produtos'>
          <ListItemIcon>
            <InventoryIcon sx={{color: '#ffffff'}}/>
          </ListItemIcon>
          <ListItemText primary='Produtos'/>
        </ListItemButton>
        <ListItemButton href='/tarefas'>
          <ListItemIcon>
            <AssignmentIcon sx={{color: '#ffffff'}}/>
          </ListItemIcon>
          <ListItemText primary='Tarefas'/>
        </ListItemButton>
        <ListItemButton href='/usuarios'>
          <ListItemIcon>
            <AccountCircleIcon sx={{color: '#ffffff'}}/>
          </ListItemIcon>
          <ListItemText primary='Usuários'/>
        </ListItemButton>  
        <ListItemButton href='/equipes'> 
          <ListItemIcon>
            <GroupIcon sx={{color: '#ffffff'}}/>
          </ListItemIcon>
          <ListItemText primary='Equipes'/>
        </ListItemButton>
      </List>      
    </Box>  
  )
}
