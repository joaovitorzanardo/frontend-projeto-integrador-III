import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Box } from '@mui/material';

function App() {
  return (
    <Box sx={{display: 'flex'}}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Box> 
  );
}

export default App;
