import React from 'react'

import { Box } from '@mui/material'

import { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';

import { Api } from '../services/api/ApiConfig';

const columns = ['id', 'Nome', 'CPF', 'Telefone', 'UF', 'Cidade', 'CEP', 'Rua', 'Bairro', 'Número']

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

export const CustomTable = () => {

  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [page, setPage] = useState(0)

  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
  }

  useEffect(() => {
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
                clientes.map((data: Cliente) => {
                  return (
                    <TableRow>
                      <TableCell>{data.clientId}</TableCell>
                      <TableCell>{`${data.first_name} ${data.last_name}`}</TableCell>
                      <TableCell>{data.cpf}</TableCell>
                      <TableCell>{data.phone_number}</TableCell>
                      <TableCell>{data.address.uf}</TableCell>
                      <TableCell>{data.address.city}</TableCell>
                      <TableCell>{data.address.cep}</TableCell>
                      <TableCell>{data.address.street}</TableCell>
                      <TableCell>{data.address.district}</TableCell>
                      <TableCell>{data.address.number}</TableCell>
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
    </Paper>
  )
}
