import React from 'react'

import { useState } from 'react' 
import { Box, Button } from '@mui/material';

import { Template } from '../../shared/layouts/Template';

import AddIcon from '@mui/icons-material/Add';

export const Equipes = () => {

  const [open, setOpen] = useState(false);  

  const handleOpen = () =>  {
     setOpen(true);
  }

  return (
    <Template title='Equipes'>
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
