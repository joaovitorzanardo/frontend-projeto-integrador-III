import React from 'react'

import { 
    Select,
    InputLabel, 
    Grid,
    FormControl,
    SelectChangeEvent,
    MenuItem
} from '@mui/material'

import { useState, useEffect } from 'react'

import { Form } from '../../shared/components/Form'

import { Button } from '@mui/material'
import { Api } from '../../shared/services/api/ApiConfig'

type Produto = {
    clientId: string
    productTypeId: string
}

const initialValues = {
    clientId: '',
    productTypeId: ''
}

type Props = {
    onClose: () => void
}

type Cliente = {
    clientId: string
    first_name: string
    last_name: string
}

type TipoProduto = {
    productTypeId: string
    description: string
}

export const ProdutoForm = ({onClose}: Props) => {

  const [clientes, setClientes] = useState<Cliente[]>([]);  
  const [selectedClient, setSelectedClient] = useState('')

  const [tipoProdutos, setTipoProdutos] = useState<TipoProduto[]>([])
  const [selectedProdutctType, setSelectedProductType] = useState('')

  const [ values, setValues ] = useState<Produto>(initialValues);  
  const [ errors, setErros ] = useState(initialValues)

  useEffect(() => {
    let cli: Cliente[] = []
    Api.get('/client').then((response) => {
        response.data.forEach((c: Cliente) => {
            cli.push({
                clientId: c.clientId,
                first_name: c.first_name,
                last_name: c.last_name
            })
        })
        setClientes(cli)
    }).catch((err) => {
        console.log(err)
    })
    
  }, [])

  useEffect(() => {
    Api.get('/product-type').then((response) => {
        let pts: TipoProduto[] = []
        response.data.forEach((tp: TipoProduto) => {
            pts.push({
                productTypeId: tp.productTypeId,
                description: tp.description
            })
        })
        setTipoProdutos(pts)
    }).catch((err) => {
        console.log(err)
    })
  }, [])

  const handleOnChangeClient = (e: SelectChangeEvent) => {
    setSelectedClient(e.target.value)
  }

  const handleOnChangeProductType = (e: SelectChangeEvent) => {
    setSelectedProductType(e.target.value)
  }

   const handleSubmit = async () => {
        try {
            const reponse = await Api.post('/product', {
                clientId: selectedClient,
                productTypeId: selectedProdutctType 
            })
        } catch (err) {
            console.log(err)
        }
   }

  return (
    <Form>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel id='client-id'>Cliente</InputLabel>
                    <Select 
                        labelId='client-id'
                        value={selectedClient}
                        label='Cliente'
                        onChange={handleOnChangeClient}
                    >
                    {
                        clientes.map((c: Cliente) => {
                            return <MenuItem value={c.clientId}>{`${c.first_name} ${c.last_name}`}</MenuItem>        
                        })
                    }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth>
                    <InputLabel id='tipo-produto-id'>Tipo Produto</InputLabel>
                    <Select 
                        labelId='tipo-produto-id'
                        value={selectedProdutctType}
                        label='Tipo Produto'
                        onChange={handleOnChangeProductType}
                    >
                    {
                        tipoProdutos.map((tp: TipoProduto) => {
                            return <MenuItem value={tp.productTypeId}>{tp.description}</MenuItem>        
                        })
                    }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Button variant='outlined'onClick={handleSubmit} color='success' sx={{mr: '20px'}}>Salvar</Button>
                <Button variant='outlined' onClick={onClose}>Cancelar</Button>
            </Grid>
        </Grid>
    </Form>
  )
}
