import React from 'react'
import { Template } from '../../../shared/layouts/Template'
import { Box, Button } from '@mui/material'

import { useState } from 'react'

import AddIcon from '@mui/icons-material/Add';
import { TipoProdutoDialog } from './TipoProdutoDialog';
import { TipoProdutoTable } from './TipoProdutoTable';

export const TipoProduto = () => {

  const [open, setOpen] = useState(false);  

  const handleOpen = () =>  {
     setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Template title='Tipo Produto'>
      <Box sx={{py: '20px'}}>
        <Button
            onClick={handleOpen}
            variant='contained' 
            sx={{bgcolor: '#3700B3', mr: '15px'}}
            startIcon={<AddIcon />}
        >
            Criar
        </Button>
        <TipoProdutoDialog open={open} onClose={handleClose} rowId=''/>
      </Box>
      <TipoProdutoTable openDialog={open}/>
    </Template>
  )
}
