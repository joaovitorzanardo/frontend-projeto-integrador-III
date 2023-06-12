import React from 'react'

import { Box, IconButton } from '@mui/material'

import { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';

import { Api } from '../../shared/services/api/ApiConfig';

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { ClienteDialog } from './ClienteDialog';

const columns = ['id', 'Nome', 'CPF', 'Telefone', 'UF', 'Cidade', 'CEP', 'Rua', 'Bairro', 'Número', 'Editar', 'Excluir']

type Cliente = {
  clientId: string,
  cpf: string,
  first_name: string,
  last_name: string,
  phone_number: string
  address: Endereco
}

type Endereco = {
  uf: string,
  city: string,
  cep: string,
  street: string,
  district: string, 
  number: string
}

type Props = {
  openDialog: boolean
}

export const ClienteTable = ({openDialog}: Props) => {

  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [page, setPage] = useState(0)

  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [editRow, setEditRow] = useState('')
  const [open, setOpen] = useState(false);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
  }

  useEffect(() => {
    formatarTelefone('54992031028')
    Api.get('/client').then(function (response) {
      const cli: Cliente[] = []
      response.data.forEach((c: Cliente) => {
        cli.push({
          clientId: c.clientId,
          cpf: c.cpf,
          first_name: c.first_name,
          last_name: c.last_name,
          phone_number: c.phone_number,
          address: c.address
        })
      })
      setClientes(cli);
      console.log(cli)
    }).catch(function (err) {
      console.log(err)
    });
  }, [openDialog, open]);

  const handleOpen = (clientId: string) =>  {
    setEditRow(clientId)
    setOpen(true);
  }

  const handleDelete = async (clientId: string) => {
    try {
      await Api.delete(`/client?clientId=${clientId}`)
    } catch (err) {
      console.log(err)
    }
  }

  const handleClose = () => {
    setOpen(false);
  }

  const formatarCpf = (cpf: string) => {
    const parte1 = cpf.substring(0, 3);
    const parte2 = cpf.substring(3, 6);
    const parte3 = cpf.substring(6, 9);
    const parte4 = cpf.substring(9, 11);
    return `${parte1}.${parte2}.${parte3}-${parte4}`
  }

  const formatarTelefone = (telefone: string) => {
    const ddd = telefone.substring(0, 2);
    const parte1 = telefone.substring(2, 7)
    const parte2 = telefone.substring(7, 11)
    return `(${ddd}) ${parte1}-${parte2}`
  }

  const formatarCep = (cep: string) => {
    const parte1 = cep.substring(0, 5)
    const parte2 = cep.substring(5, 8)
    return `${parte1}-${parte2}`
  }

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
                clientes.map((data: Cliente) => {
                  return (
                    <TableRow>
                      <TableCell>{data.clientId}</TableCell>
                      <TableCell>{`${data.first_name} ${data.last_name}`}</TableCell>
                      <TableCell>{formatarCpf(data.cpf)}</TableCell>
                      <TableCell>{formatarTelefone(data.phone_number)}</TableCell>
                      <TableCell>{data.address.uf}</TableCell>
                      <TableCell>{data.address.city}</TableCell>
                      <TableCell>{formatarCep(data.address.cep)}</TableCell>
                      <TableCell>{data.address.street}</TableCell>
                      <TableCell>{data.address.district}</TableCell>
                      <TableCell>{data.address.number}</TableCell>
                      <TableCell>
                        <IconButton>
                          <CreateIcon onClick={() => handleOpen(data.clientId)}/>
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton>
                          <DeleteIcon onClick={() => handleDelete(data.clientId)}/>
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
        <ClienteDialog open={open} onClose={handleClose}
        rowId={editRow}/>
    </Paper>
  )
}
