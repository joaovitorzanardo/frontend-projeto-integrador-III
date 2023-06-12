import React, { useState } from 'react'

import { Box, Button } from '@mui/material'

import AddIcon from '@mui/icons-material/Add';

import { Template } from '../../shared/layouts/Template';
import { ClienteDialog } from './ClienteDialog';
import { ClienteTable } from './ClienteTable';

export const Clientes = () => {

  const [open, setOpen] = useState(false);  

  const handleOpen = () =>  {
     setOpen(true);
  } 

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Template title='Clientes'>
      <Box sx={{py: '20px'}}>
        <Button
            onClick={handleOpen}
            variant='contained' 
            sx={{bgcolor: '#3700B3', mr: '15px'}}
            startIcon={<AddIcon />}
        >
            Criar
        </Button>
      </Box>
      <ClienteDialog open={open} onClose={handleClose} rowId=''/>
      <ClienteTable openDialog={open}/>
    </Template>
  )
}


