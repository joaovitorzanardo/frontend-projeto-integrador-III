import React from 'react'

import { useState } from 'react' 

import { Template } from '../../shared/layouts/Template';

import { Box, Button } from '@mui/material'

import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

export const Usuarios = () => {

  const [open, setOpen] = useState(false);  

   const handleOpen = () =>  {
      setOpen(true);
   } 

   const handleClose = () => {
        setOpen(false);
   }

  return (
    <Template title='Usuários'>
      <Box sx={{py: '20px'}}>
        <Button
            onClick={handleOpen}
            variant='contained' 
            sx={{bgcolor: '#3700B3', mr: '15px'}}
            startIcon={<AddIcon/>}
        >
            Criar
        </Button>
      </Box>
    </Template>
  )
}
