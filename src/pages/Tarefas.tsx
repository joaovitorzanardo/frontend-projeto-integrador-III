import React from 'react'

import { Box, Typography } from '@mui/material';

export const Tarefas = () => {
  return (
    <Box sx={{bgcolor: '#212121', color: '#ffffff', flexGrow: '1'}}>
      <Typography sx={{pl: '20px', pt: '20px'}} variant='h4'>Tarefas</Typography>
    </Box>
  )
}
