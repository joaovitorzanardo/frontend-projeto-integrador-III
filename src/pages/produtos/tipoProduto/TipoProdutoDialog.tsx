import React from 'react'

import { Dialog, DialogTitle, DialogContent, Divider } from '@mui/material'
import { TipoProdutoForm } from './TipoProdutoForm'

type Props = {
    open: boolean,
    onClose: () => void,
    rowId: string
}

export const TipoProdutoDialog = ({open, onClose, rowId }: Props) => {

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Cadastro Tipo Produto</DialogTitle>
        <Divider />
        <DialogContent>
          <TipoProdutoForm onClose={onClose} rowId={rowId}/>
        </DialogContent>
    </Dialog>
  )
}
