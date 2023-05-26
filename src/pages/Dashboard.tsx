import { Box, Typography } from '@mui/material'
import React from 'react'

export const Dashboard = () => {
  return (
    <Box sx={{bgcolor: '#212121', color: '#ffffff', flexGrow: '1'}}>
      <Typography sx={{pl: '20px', pt: '20px'}} variant='h4'>Dashboard</Typography>
    </Box>
  )
}
