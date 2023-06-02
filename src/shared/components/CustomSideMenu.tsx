import React from 'react'

import { useState } from 'react'

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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const CustomSideMenu = () => {

  const [subNavProd, setShowSubNavProd] = useState(false);
  const [subNavTar, setShowSubNavTar] = useState(false);

  const showSubNavProd = () => {
    setShowSubNavProd(!subNavProd);
  }

  const showSubNavTar = () => {
    setShowSubNavTar(!subNavTar);
  }


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
        <ListItemButton onClick={showSubNavProd}>
          <ListItemIcon>
            <InventoryIcon sx={{color: '#ffffff'}}/>
          </ListItemIcon>
          <ListItemText primary='Produtos'/>
          <ArrowDropDownIcon />
        </ListItemButton>
        {
          subNavProd && 
          <>
            <ListItemButton href='/produtos'>
              <ListItemText primary='Produtos' sx={{pl: '25px'}}/>
            </ListItemButton>
            <ListItemButton href='/tipo-produto'>
              <ListItemText primary='Tipo Produto' sx={{pl: '25px'}}/>
            </ListItemButton>
          </> 
        } 
        <ListItemButton onClick={showSubNavTar}>
          <ListItemIcon>
            <AssignmentIcon sx={{color: '#ffffff'}}/>
          </ListItemIcon>
          <ListItemText primary='Tarefas'/>
          <ArrowDropDownIcon />
        </ListItemButton>
        {
          subNavTar && 
          <>
            <ListItemButton href='/tarefas'>
              <ListItemText primary='Tarefas' sx={{pl: '25px'}}/>
            </ListItemButton>
            <ListItemButton href='/tipo-tarefa'>
              <ListItemText primary='Tipo Tarefa' sx={{pl: '25px'}}/>
            </ListItemButton>
          </> 
        } 
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
