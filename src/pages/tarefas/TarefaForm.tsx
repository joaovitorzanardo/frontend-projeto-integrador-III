import React from 'react'

import { 
    Select,
    InputLabel, 
    Grid,
    FormControl,
    SelectChangeEvent,
    MenuItem,
    Typography,
    IconButton,
    Divider,
    TextField
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add';

import { useState, useEffect } from 'react'

import { Form } from '../../shared/components/Form'

import { Button } from '@mui/material'
import { Api } from '../../shared/services/api/ApiConfig'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

type Produto = {
    productId: string
    productType: TipoProduto
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

type TipoTarefa = {
    taskTypeId: string
    description: string
}

type TipoProduto = {
    productTypeId: string
    description: string
}

type Tarefa = {
    taskId: string
    clientId: string
    deadline: string
    teamMemberId: string
    taskTypeId: string
}

const status = [
    {statusId: 1, descricao: 'Não Iniciado'}, 
    {statusId: 2, descricao: 'Executando'}, 
    {statusId: 3, descricao: 'Aguardando Retirada'}, 
    {statusId: 4, descricao: 'Finalizado'}, 
    {statusId: 5, descricao: 'Cancelado'}
]

export const TarefaForm = ({onClose}: Props) => {

  const [clientes, setClientes] = useState<Cliente[]>([]);  
  const [tipoTarefas, setTipoTarefas] = useState<TipoTarefa[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])

  const [selectedClient, setSelectedClient] = useState('')
  const [selectedProdutctType, setSelectedProductType] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [deadline, setDeadLine] = useState<Dayjs | null>(dayjs())
  const [stat, setStat] = useState('')
  const [price, setPrice] = useState('')

  const [ errors, setErros ] = useState(initialValues)

  useEffect(() => {
    let cli: Cliente[] = []
    Api.get('/client').then((response) => {
        console.log(response.data)
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
    Api.get('/task-type').then((response) => {
        let pts: TipoTarefa[] = []
        response.data.forEach((tp: TipoTarefa) => {
            pts.push({
                taskTypeId: tp.taskTypeId,
                description: tp.description
            })
        })
        setTipoTarefas(pts)
    }).catch((err) => {
        console.log(err)
    })
  }, [])

  useEffect(() => {
    Api.get('/product').then((response) => {
        const prod: Produto[] = []
        response.data.forEach((p: Produto) => {
            prod.push({
                productId: p.productId,
                productType: {
                    productTypeId: p.productType.productTypeId,
                    description: p.productType.description
                }
            })
        })
        setProdutos(prod)
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

  const handleOnChangeProduct = (e: SelectChangeEvent) => {
    setSelectedProduct(e.target.value)
  }

  const handleOnChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value)
  }

  const handleOnChangeStat = (e: SelectChangeEvent) => {
    setStat(e.target.value)
  }

  const handleOnChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value)
  }

   const handleSubmit = async () => {
        if (deadline != null) {
            try {
                const reponse = await Api.post('/task', {
                    clientId: selectedClient,
                    deadline: `${deadline.day()}/${deadline.month()}/${deadline.year()}`,
                    taskTypeId: selectedProdutctType,
                    productId: selectedProduct,
                    status: stat,
                    description: taskDescription,
                    price: price 
                })
            } catch (err) {
                console.log(err)
            }
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label='Prazo' value={deadline} onChange={(newValue) => setDeadLine(newValue)} format='DD/MM/YYYY'/>
                        </DemoContainer>
                    </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel id='tipo-tarefa-id'>Tipo Tarefa</InputLabel>
                    <Select 
                        labelId='tipo-tarefa-id'
                        value={selectedProdutctType}
                        label='Tipo Tarefa'
                        onChange={handleOnChangeProductType}
                        
                    >
                    {
                        tipoTarefas.map((tp: TipoTarefa) => {
                            return <MenuItem value={tp.taskTypeId}>{tp.description}</MenuItem>        
                        })
                    }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel id='produto-id'>Produto</InputLabel>
                    <Select 
                        labelId='produto-id'
                        value={selectedProduct}
                        label='Produto'
                        onChange={handleOnChangeProduct}
                        
                    >
                    {
                        produtos.map((p: Produto) => {
                            return <MenuItem value={p.productId}>{`${p.productType.description} ${p.productId}`}</MenuItem>        
                        })
                    }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    fullWidth
                    label='Descrição'
                    name='taskDescription'
                    value={taskDescription}
                    onChange={handleOnChangeDescription}
                />
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel id='produto-id'>Status</InputLabel>
                    <Select 
                            labelId='produto-id'
                            value={stat}
                            label='Produto'
                            onChange={handleOnChangeStat}
                            
                        >
                        {
                            status.map((status) => {
                                return <MenuItem value={status.statusId}>{status.descricao}</MenuItem>        
                            })
                        }
                    </Select>
                </FormControl>    
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    fullWidth
                    label='Preço'
                    name='price'
                    value={price}
                    onChange={handleOnChangePrice}
                />
            </Grid>
            <Grid item xs={6}>
                <Button variant='outlined'onClick={handleSubmit} color='success' sx={{mr: '20px'}}>Salvar</Button>
                <Button variant='outlined' onClick={onClose}>Cancelar</Button>
            </Grid>
        </Grid>
    </Form>
  )
}
