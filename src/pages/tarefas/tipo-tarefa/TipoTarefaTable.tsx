import React from 'react'

import { Box } from '@mui/material'

import { IconButton } from '@mui/material'

import { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';

import { Api } from '../../../shared/services/api/ApiConfig';

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { TipoTarefaDialog } from './TipoTarefaDialog';

const columns = ['id', 'Descrição', 'Excluir', 'Editar']

type TipoTarefa = {
  taskTypeId: string  
  description: string,
}

type Props = {
  openDialog: boolean
}

export const TipoTarefaTable = ({openDialog}: Props) => {

  const [tipoTarefa, seTipoTarefa] = useState<TipoTarefa[]>([]);

  const [page, setPage] = useState(0)

  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [open, setOpen] = useState(false);
  
  const handleOpen = (taskTypeId: string) =>  {
      setEditRow(taskTypeId)
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
  }

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
  }

  useEffect(() => {
    Api.get('/task-type').then(function (response) {
      const tipos: TipoTarefa[] = []
      response.data.forEach((tp: TipoTarefa) => {
        tipos.push({
          taskTypeId: tp.taskTypeId,      
          description: tp.description
        })
      })
      seTipoTarefa(tipos);
    }).catch(function (err) {
      console.log(err)
    });
  }, [openDialog, open]);

  const handleDelete = async (taskTypeId: string) => {
    try {
      await Api.delete(`/task-type?taskTypeId=${taskTypeId}`)
    } catch (err) {
      console.log(err)
    }
  }

  const [editRow, setEditRow] = useState('')

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {
                columns.map(title => {
                  return <TableCell>{title}</TableCell>
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
              {
                tipoTarefa.map((data: TipoTarefa) => {
                  return (
                    <TableRow>
                      <TableCell>{data.taskTypeId}</TableCell>
                      <TableCell>{data.description}</TableCell>                      
                      <TableCell>
                        <IconButton>
                          <DeleteIcon onClick={() => handleDelete(data.taskTypeId)}/>
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton>
                          <CreateIcon onClick={() => handleOpen(data.taskTypeId)}/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })
              }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination 
        rowsPerPageOptions={[5, 10, 25]}
        page={page} 
        count={2} 
        rowsPerPage={rowsPerPage} 
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
      <TipoTarefaDialog open={open} onClose={handleClose}
        rowId={editRow}/>
    </Paper>
    
  )
}
