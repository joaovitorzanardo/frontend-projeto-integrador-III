import React from 'react'

import { 
    TextField, 
    Grid
} from '@mui/material'

import { useState, useEffect } from 'react'

import { Form } from '../../../shared/components/Form'

import { Button } from '@mui/material'
import { Api } from '../../../shared/services/api/ApiConfig'

type TipoProduto = {
  descricao: string
}

const initialValues = {
    descricao: '',
}

type Props = {
    onClose: () => void,
    rowId: string
}

export const TipoProdutoForm = ({onClose, rowId}: Props) => {

    const [productDescription, setproductDescription] = useState('')

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setproductDescription(e.target.value)
    }

   const handleSubmit = async () => {
    if (rowId === '') {
        try{
            const reponse = await Api.post('/product-type',
                {description: productDescription}
            )
        } catch (err) {
            console.log(err)
        }
        onClose();
    } else {
        try{
            const reponse = await Api.put(`/product-type?productTypeId=${rowId}`,
                {description: productDescription}
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
        Api.get(`/product-type?productTypeId=${rowId}`).then(function (response) {
            setproductDescription(response.data.description);
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
                    value={productDescription}
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
