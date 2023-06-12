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
import { ProdutoDialog } from './ProdutoDialog';

const columns = ['id', 'Tipo Produto', 'Cpf Cliente', 'Nome Cliente', 'Editar', 'Excluir']

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

type Props = {
  openDialog: boolean
}

export const ProdutoTable = ({openDialog}: Props) => {

  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [editRow, setEditRow] = useState('')
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0)

  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
  }

  const handleClose = () => {
    setOpen(false);
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
  }, [openDialog, open]);

  const handleOpen = (productId: string) =>  {
    setEditRow(productId)
    setOpen(true);
  }

  const handleDelete = async (productId: string) => {
    try {
      await Api.delete(`/product?productId=${productId}`)
    } catch (err) {
      console.log(err)
    }
  }

  const formatarCpf = (cpf: string) => {
    const parte1 = cpf.substring(0, 3);
    const parte2 = cpf.substring(3, 6);
    const parte3 = cpf.substring(6, 9);
    const parte4 = cpf.substring(9, 11);
    return `${parte1}.${parte2}.${parte3}-${parte4}`
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
                produtos.map((data: Produto) => {
                  return (
                    <TableRow>
                      <TableCell>{data.productId}</TableCell>
                      <TableCell>{data.productType.description}</TableCell>
                      <TableCell>{formatarCpf(data.client.cpf)}</TableCell>
                      <TableCell>{`${data.client.first_name} ${data.client.last_name}`}</TableCell>
                      <TableCell>
                        <IconButton>
                          <CreateIcon onClick={() => handleOpen(data.productId)}/>
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton>
                          <DeleteIcon onClick={() => handleDelete(data.productId)}/>
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
      <ProdutoDialog open={open} onClose={handleClose}
        rowId={editRow}/>
    </Paper>
  )
}
