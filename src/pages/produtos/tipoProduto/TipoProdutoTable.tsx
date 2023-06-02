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

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

import { Api } from '../../../shared/services/api/ApiConfig';
import { TipoProdutoDialog } from './TipoProdutoDialog';

const columns = ['id', 'Descrição', 'Excluir', 'Editar']

type TipoProduto = {
  productTypeId: string  
  description: string,
}

type Props = {
  openDialog: boolean
}

export const TipoProdutoTable = ({openDialog}: Props) => {

  const [tipoProduto, seTipoProduto] = useState<TipoProduto[]>([]);

  const [page, setPage] = useState(0)

  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [editRow, setEditRow] = useState('')

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
  }

  const [open, setOpen] = useState(false);
  
  const handleOpen = (productTypeId: string) =>  {
      setEditRow(productTypeId)
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
  }

  useEffect(() => {
    Api.get('/product-type').then(function (response) {
      const tipos: TipoProduto[] = []
      response.data.forEach((tp: TipoProduto) => {
        tipos.push({
          productTypeId: tp.productTypeId,      
          description: tp.description
        })
      })
      seTipoProduto(tipos);
    }).catch(function (err) {
      console.log(err)
    });
  }, [openDialog, open]);

  const handleDelete = async (productTypeId: string) => {
    try {
      await Api.delete(`/product-type?productTypeId=${productTypeId}`)
    } catch (err) {
      console.log(err)
    }
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
                tipoProduto.map((data: TipoProduto) => {
                  return (
                    <TableRow>
                      <TableCell>{data.productTypeId}</TableCell>
                      <TableCell>{data.description}</TableCell>
                      <TableCell>
                        <IconButton>
                          <DeleteIcon onClick={() => handleDelete(data.productTypeId)}/>
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton>
                          <CreateIcon onClick={() => handleOpen(data.productTypeId)}/>
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
      <TipoProdutoDialog open={open} onClose={handleClose}
        rowId={editRow}/>
    </Paper>
  )
}
