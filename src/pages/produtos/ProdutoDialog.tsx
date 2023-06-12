import React from 'react'

import { Dialog, DialogTitle, DialogContent, Divider } from '@mui/material'
import { ProdutoForm } from './ProdutoForm'

type Props = {
    open: boolean,
    onClose: () => void,
    rowId: string
}

export const ProdutoDialog = ({open, onClose, rowId }: Props) => {

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Cadastro Produto</DialogTitle>
        <Divider />
        <DialogContent>
          <ProdutoForm onClose={onClose} rowId={rowId}/>
        </DialogContent>
    </Dialog>
  )
}
