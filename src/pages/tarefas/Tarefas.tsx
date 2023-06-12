import React from 'react'

import { useState } from 'react' 
import { Box, Button, TextField, IconButton } from '@mui/material';

import { Template } from '../../shared/layouts/Template';

import AddIcon from '@mui/icons-material/Add';
import { TarefaDialog } from './TarefaDialog';
import { TarefaTable } from './TarefaTable';

import SearchIcon from '@mui/icons-material/Search';
import { Api } from '../../shared/services/api/ApiConfig';
import dayjs, { Dayjs } from 'dayjs';

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

export const Tarefas = () => {

  const [open, setOpen] = useState(false);  

  const [cpfCliente, setCpfCliente] = useState('');

  const [search, setSearch] = useState<Tarefa>({
    taskId: '',
        client: {
          first_name: '',
          last_name: '',
          cpf: ''
        }, 
        deadline: dayjs(),
        taskType: {
          description: ''
        },
        taskStatus: '',
        description: '',
        price: ''
  });

  const handleOpen = () =>  {
     setOpen(true);
  } 

  const handleClose = () => {
    setOpen(false);
  }

  const handleCpfClienteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpfCliente(e.target.value)
  }

  const handleSearchClientByCpf = async () => {
    if (cpfCliente !== '') {
      try {
        const response = await Api.get(`/task?clientCpf=${cpfCliente}`)
        const tarefa: Tarefa = {
          taskId: response.data.taskId,
          client: {
            first_name: response.data.client.first_name,
            last_name: response.data.client.last_name,
            cpf: response.data.client.cpf
          }, 
          deadline: dayjs(response.data.deadline),
          taskType: {
            description: response.data.taskType ? response.data.taskType.description : ''
          },
          taskStatus: response.data.taskStatus,
          description: response.data.description,
          price: response.data.price
        }
        setSearch(tarefa)
      } catch (err) {
        console.log(err)
      }
    } 
  }

  return (
    <Template title='Tarefas'>
      <Box sx={{px: '20px', mt: '10px', py: '10px', display: 'flex', justifyContent: 'space-between', bgcolor: '#ffffff', mb: '30px'}}>
        <Button
            onClick={handleOpen}
            variant='contained' 
            sx={{bgcolor: '#3700B3', mr: '15px'}}
            startIcon={<AddIcon/>}
        >
            Criar
        </Button>
        <Box>
          <TextField value={cpfCliente} onChange={handleCpfClienteChange} variant='outlined' size='small' label='Cpf Cliente'/>
          <IconButton sx={{ml: '10px'}}>
            <SearchIcon onClick={handleSearchClientByCpf}/>
          </IconButton>
        </Box>
      </Box>
      <TarefaDialog open={open} onClose={handleClose} rowId=''/>
      <TarefaTable openDialog={open} search={search}/>
    </Template>
  )
}
