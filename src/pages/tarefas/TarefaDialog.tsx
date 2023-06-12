import React from 'react'

import { Dialog, DialogTitle, DialogContent, Divider } from '@mui/material'
import { TarefaForm } from './TarefaForm'

type Props = {
    open: boolean,
    onClose: () => void
    rowId: string
}

export const TarefaDialog = ({ open, onClose, rowId }: Props) => {

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Cadastro Tarefa</DialogTitle>
        <Divider />
        <DialogContent>
          <TarefaForm onClose={onClose} rowId={rowId}/>
        </DialogContent>
    </Dialog>
  )
}
