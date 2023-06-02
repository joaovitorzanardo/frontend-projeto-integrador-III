import React, { useState } from 'react'

import { Box, Button } from '@mui/material'

import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

import { Template } from '../../shared/layouts/Template';
import { CustomTable } from '../../shared/components/CustomTable';
import { FormDialog } from '../../shared/components/FormDialog';

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
        <Button 
            variant='contained' 
            sx={{bgcolor: '#3700B3', mr: '15px'}}
            startIcon={<CreateIcon />}
        >
            Editar 
        </Button>
        <Button 
            variant='contained' 
            sx={{bgcolor: '#3700B3'}}
            endIcon={<DeleteIcon />}
        >
            Excluir
        </Button>
      </Box>
      <FormDialog open={open} onClose={handleClose}/>
      <CustomTable />
    </Template>
  )
}


