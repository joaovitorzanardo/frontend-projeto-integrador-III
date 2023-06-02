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

const columns = ['id', 'Nome Cliente', 'Cpf Cliente', 'Data Entrega', 'Status', 'Detalhes']

type Tarefa = {
  taskId: string
  client: {
    first_name: string
    last_name: string
    cpf: string
  } 
  deadline: string
  taskType: {
    description: string
  }
  description: string
  price: string
}

export const TarefaTable = () => {

  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const [page, setPage] = useState(0)

  const [rowsPerPage, setRowsPerPage] = useState(5)

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
          deadline: new Date(t.deadline).toDateString(),
          taskType: {
            description: t.taskType ? t.taskType.description : ''
          },
          description: t.description,
          price: t.price
        })
      })
      setTarefas(tar);
    }).catch(function (err) {
      console.log(err)
    });
  }, []);

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
                  return (
                    <TableRow>
                      <TableCell>{data.taskId}</TableCell>
                      <TableCell>{`${data.client.first_name} ${data.client.last_name}`}</TableCell>
                      <TableCell>{data.client.cpf}</TableCell>
                      <TableCell>{data.deadline}</TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <IconButton>
                          <MoreHorizIcon fontSize='small'/>
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
    </Paper>
  )
}
