import React from 'react'

import { Dialog, DialogTitle, DialogContent, Divider } from '@mui/material'
import { ClienteForm } from '../../pages/clientes/ClienteForm';

type Props = {
    open: boolean,
    onClose: () => void
}

export const FormDialog = ({open, onClose }: Props) => {

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Cadastro Cliente</DialogTitle>
        <Divider />
        <DialogContent>
          <ClienteForm onClose={onClose} />
        </DialogContent>
    </Dialog>
  )
}
