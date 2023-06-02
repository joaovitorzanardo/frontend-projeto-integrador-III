import React from 'react'

import { Dialog, DialogTitle, DialogContent, Divider } from '@mui/material'
import { ProdutoForm } from './ProdutoForm'

type Props = {
    open: boolean,
    onClose: () => void
}

export const ProdutoDialog = ({open, onClose }: Props) => {

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Cadastro Produto</DialogTitle>
        <Divider />
        <DialogContent>
          <ProdutoForm onClose={onClose} />
        </DialogContent>
    </Dialog>
  )
}
