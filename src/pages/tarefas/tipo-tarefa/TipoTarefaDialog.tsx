import React from 'react'

import { Dialog, DialogTitle, DialogContent, Divider } from '@mui/material'
import { TipoTarefaForm } from './TipoTarefaForm'

type Props = {
    open: boolean,
    onClose: () => void,
    rowId: string
}

export const TipoTarefaDialog = ({open, onClose, rowId}: Props) => {

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Cadastro Tipo Tarefa</DialogTitle>
        <Divider />
        <DialogContent>
          <TipoTarefaForm onClose={onClose} rowId={rowId}/>
        </DialogContent>
    </Dialog>
  )
}
