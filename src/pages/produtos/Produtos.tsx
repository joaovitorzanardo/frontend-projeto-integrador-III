import React from 'react'

import { useState } from 'react' 
import { Box, Button } from '@mui/material';

import { Template } from '../../shared/layouts/Template';

import AddIcon from '@mui/icons-material/Add';
import { ProdutoTable } from './ProdutoTable';
import { ProdutoDialog } from './ProdutoDialog';

export const Produtos = () => {

  const [open, setOpen] = useState(false);  

  const handleOpen = () =>  {
     setOpen(true);
  } 

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Template title='Produtos'>
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
      <ProdutoDialog open={open} onClose={handleClose} rowId=''/>
      <ProdutoTable openDialog={open}/>
    </Template>
  )
}
