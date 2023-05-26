import React from 'react'

import { Box, Button } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

export const CrudButtons = () => {
  return (
    <Box sx={{py: '20px'}}>
        <Button
            variant='contained' 
            sx={{bgcolor: '#3700B3', mr: '15px'}}
            startIcon={<AddIcon/>}
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
  )
}
