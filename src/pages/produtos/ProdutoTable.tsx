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

import { Api } from '../../shared/services/api/ApiConfig';

const columns = ['id', 'Tipo Produto', 'Cpf Cliente', 'Nome Cliente']

type Produto = {
  productId: string
  client: {
    first_name: string
    last_name: string
    cpf: string
  } 
  productType: {
    description: string
  }
}

export const ProdutoTable = () => {

  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [page, setPage] = useState(0)

  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
  }

  useEffect(() => {
    Api.get('/product').then(function (response) {
      const prod: Produto[] = []
      response.data.forEach((p: Produto) => {
        prod.push({
          productId: p.productId,
          client: {
            first_name: p.client.first_name,
            last_name: p.client.last_name,
            cpf: p.client.cpf
          },
          productType: {
            description: p.productType.description  
          }
        })
      })
      setProdutos(prod);
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
                produtos.map((data: Produto) => {
                  return (
                    <TableRow>
                      <TableCell>{data.productId}</TableCell>
                      <TableCell>{data.productType.description}</TableCell>
                      <TableCell>{data.client.cpf}</TableCell>
                      <TableCell>{`${data.client.first_name} ${data.client.last_name}`}</TableCell>
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
