import React from 'react'

import { 
    TextField, 
    Grid
} from '@mui/material'

import { useState, useEffect } from 'react'

import { Form } from '../../../shared/components/Form'

import { Button } from '@mui/material'
import { Api } from '../../../shared/services/api/ApiConfig'

type TipoTarefa = {
  taskTypeId: string  
  description: string
}

const initialValues = {
    descricao: '',
}

type Props = {
    onClose: () => void,
    rowId: string
}

export const TipoTarefaForm = ({onClose, rowId}: Props) => {

    const [taskDescription, setTaskDescription] = useState('')

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskDescription(e.target.value)
    }

   const handleSubmit = async () => {
        if (rowId === '') {
            try{
                const reponse = await Api.post('/task-type',
                    {description: taskDescription}
                )
            } catch (err) {
                console.log(err)
            }
            onClose();
        } else {
            try{
                const reponse = await Api.put(`/task-type?taskTypeId=${rowId}`,
                    {description: taskDescription}
                )
            } catch (err) {
                console.log(err)
            }
            onClose();
        }
   }

   useEffect(() => {
        console.log(rowId)
        if (rowId !== '') {
            Api.get(`/task-type?taskTypeId=${rowId}`).then(function (response) {
                setTaskDescription(response.data.description);
            }).catch(err => {
                console.log(err)
            }) 
        }
        
   }, [])

  return (
    <Form>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label='Descrição'
                    name='descricao'
                    value={taskDescription}
                    onChange={handleDescriptionChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant='outlined'onClick={handleSubmit} color='success' sx={{mr: '20px'}}>Salvar</Button>
                <Button variant='outlined' onClick={onClose}>Cancelar</Button>
            </Grid>
        </Grid>
    </Form>
  )
}
