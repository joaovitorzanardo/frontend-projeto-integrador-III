import React from 'react'

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

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Api } from '../../shared/services/api/ApiConfig';
import { TarefaDialog } from './TarefaDialog';
import dayjs, { Dayjs } from 'dayjs';

const columns = ['id', 'Nome Cliente', 'Cpf Cliente', 'Data Entrega', 'Status', 'Preço' ,'Detalhes']

type Tarefa = {
  taskId: string
  client: {
    first_name: string
    last_name: string
    cpf: string
  } 
  deadline: Dayjs
  taskType: {
    description: string
  }
  taskStatus: string
  description: string
  price: string
}

const status: Status[] = [
  {statusId: 1, descricao: 'Não Iniciado'}, 
  {statusId: 2, descricao: 'Executando'}, 
  {statusId: 3, descricao: 'Aguardando Retirada'}, 
  {statusId: 4, descricao: 'Finalizado'}, 
  {statusId: 5, descricao: 'Cancelado'}
]

type Status = {
  statusId: number
  descricao: string
}

type Props = {
  openDialog: boolean
  search: Tarefa
}

export const TarefaTable = ({ openDialog, search }: Props) => {

  const [editRow, setEditRow] = useState('')
  const [open, setOpen] = useState(false);

  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const [page, setPage] = useState(0)

  const [rowsPerPage, setRowsPerPage] = useState(5)

  const formatarCpf = (cpf: string) => {
    const parte1 = cpf.substring(0, 3);
    const parte2 = cpf.substring(3, 6);
    const parte3 = cpf.substring(6, 9);
    const parte4 = cpf.substring(9, 11);
    return `${parte1}.${parte2}.${parte3}-${parte4}`
  }

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
  }

  useEffect(() => {
    Api.get('/task').then(function (response) {
      const tar: Tarefa[] = []
      console.log(response.data)
      response.data.forEach((t: Tarefa) => {
        
        tar.push({
          taskId: t.taskId,
          client: {
            first_name: t.client.first_name,
            last_name: t.client.last_name,
            cpf: t.client.cpf
          }, 
          deadline: dayjs(t.deadline),
          taskType: {
            description: t.taskType ? t.taskType.description : ''
          },
          taskStatus: t.taskStatus,
          description: t.description,
          price: t.price
        })
      })
      setTarefas(tar);
    }).catch(function (err) {
      console.log(err)
    });
  }, [openDialog, open]);

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = (productId: string) =>  {
    setEditRow(productId)
    setOpen(true);
  }

  useEffect(() => {
    setTarefas([search])
  }, [search])

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
                tarefas.map((data: Tarefa) => {
                  const stat: Status | undefined = status.find(e => e.statusId.toString() == data.taskStatus) 
                  return (
                    <TableRow>
                      <TableCell>{data.taskId}</TableCell>
                      <TableCell>{`${data.client.first_name} ${data.client.last_name}`}</TableCell>
                      <TableCell>{formatarCpf(data.client.cpf)}</TableCell>
                      <TableCell>{data.deadline.format('DD/MM/YYYY')}</TableCell>
                      <TableCell>{stat !== undefined ? stat.descricao : 'Não Iniciado'}</TableCell>
                      <TableCell>{data.price}</TableCell>
                      <TableCell>
                        <IconButton>
                          <MoreHorizIcon fontSize='small' onClick={() => handleOpen(data.taskId)}/>
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
        count={1} 
        rowsPerPage={rowsPerPage} 
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
      <TarefaDialog open={open} onClose={handleClose}
        rowId={editRow}/>
    </Paper>
  )
}
