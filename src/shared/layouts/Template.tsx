import React from 'react'

import { Box, Typography } from '@mui/material';

type Props = {
    title: string,
    children: React.ReactNode
}

export const Template = ({title, children}: Props) => {
  return (
    <Box sx={{bgcolor: '#212121', 
            color: '#ffffff', 
            flexGrow: '1',
            pl: '50px',
            pt: '30px',
            pr: '50px'
            }}>
        <Typography variant='h4'>{title}</Typography>
        {children}
    </Box>
  )
}
