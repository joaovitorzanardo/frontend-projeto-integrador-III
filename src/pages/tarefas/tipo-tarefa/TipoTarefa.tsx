import React from 'react'
import { Template } from '../../../shared/layouts/Template'
import { Box, Button } from '@mui/material'

import { useState } from 'react'

import AddIcon from '@mui/icons-material/Add';
import { TipoTarefaDialog } from './TipoTarefaDialog';
import { TipoTarefaTable } from './TipoTarefaTable';

export const TipoTarefa = () => {

  const [open, setOpen] = useState(false);
  
  const handleOpen = () =>  {
     setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Template title='Tipo Tarefa'>
      <Box sx={{py: '20px'}}>
        <Button
            onClick={handleOpen}
            variant='contained' 
            sx={{bgcolor: '#3700B3', mr: '15px'}}
            startIcon={<AddIcon />}
        >
            Criar
        </Button>
        <TipoTarefaDialog open={open} onClose={handleClose} rowId=''/>
      </Box>
      <TipoTarefaTable openDialog={open}/>
    </Template>
  )
}
