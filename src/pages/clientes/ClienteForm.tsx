import React from 'react'

import { 
    TextField, 
    Typography,
    Divider, 
    Grid
} from '@mui/material'

import { useState } from 'react'

import { Form } from '../../shared/components/Form'

import { Button } from '@mui/material'
import { Api } from '../../shared/services/api/ApiConfig'

type Cliente = {
    nome: string,
    sobrenome: string,
    cpf: string,
    telefone: string,
    endereco: {
        uf: string,
        cidade: string,
        cep: string,
        rua: string,
        bairro: string,
        numero: string,
        complemento: string
    }
}

const initialValues = {
    nome: '',
    sobrenome: '',
    cpf: '',
    telefone: '',
    endereco: {
        uf: '',
        cidade: '',
        cep: '',
        rua: '',
        bairro: '',
        numero: '',
        complemento: ''
    }
}

type Props = {
    onClose: () => void
}

export const ClienteForm = ({onClose}: Props) => {

    const validate = (fieldValues = values) => {
        let temp = {
            nome: fieldValues.nome ? "" : "Esse campo é obrigatório.",
            sobrenome: fieldValues.sobrenome ? "" : "Esse campo é obrigatório.",
            cpf: fieldValues.cpf.length === 11 ? "" : "O cpf deve ter 11 dígitos.",
            telefone: fieldValues.telefone.length === 11 ? "" : "O número de telefone deve ter 11 dígitos.",
            endereco: {
                uf: fieldValues.endereco.uf.length === 2 ? "" : "Esse campo é obrigatório.",
                cidade: fieldValues.endereco.cidade ? "" : "Esse campo é obrigatório.",
                cep: fieldValues.endereco.cep.length === 8 ? "" : "O cep deve ter 8 dígitos.",
                rua: fieldValues.endereco.rua ? "" : "Esse campo é obrigatório.",
                bairro: fieldValues.endereco.bairro ? "" : "Esse campo é obrigatório.",
                numero: fieldValues.endereco.numero ? "" : "Esse campo é obrigatório.",
                complemento: "",
            }
        };
        setErros({
            ...temp
        })
        let valido = true;
        Object.entries(temp)
        .forEach(([key, value]) => {
            if (key === 'endereco') {
                let endereco = value;
                Object.entries(endereco).forEach(([key1, value1]) => {
                    if (value1 !== "")
                        valido = false
                })
            } else {
                if (value !== "")
                    valido = false     
            }
        })

        return valido;
    }  

  const [ values, setValues ] = useState<Cliente>(initialValues);  
  const [ errors, setErros ] = useState(initialValues)

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name.startsWith('endereco')) {
            setValues({
                ...values,
                endereco: {
                    ...values.endereco, [name.substring(name.indexOf('.') + 1, name.length)]: value
                }
            })
        } else {
            setValues({
                ...values,
                [name]: value
            })
        }
             
   }

   const handleSubmit = async () => {
        if (validate()) {
            try{
                const reponse = await Api.post('/client', {
                    firstName: values.nome,
                    lastName: values.sobrenome,
                    cpf: values.cpf,
                    phoneNumber: values.telefone,
                    address: {
                        uf: values.endereco.uf,
                        city: values.endereco.cidade,
                        cep: values.endereco.cep,
                        street: values.endereco.rua,
                        district: values.endereco.bairro,
                        number: values.endereco.numero,
                        reference: values.endereco.complemento
                    }
                })
            } catch (err) {
                console.log(err)
            }
        } 
        console.log(errors)
   }

  return (
    <Form>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    label='Nome'
                    name='nome'
                    value={values.nome}
                    onChange={handleInputChange}
                    {...(errors.nome && {error: true, helperText: errors.nome})}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label='Sobrenome'
                    name='sobrenome'
                    value={values.sobrenome}
                    onChange={handleInputChange}
                    {...(errors.sobrenome && {error: true, helperText: errors.sobrenome})}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    type='text'
                    label='Cpf'
                    name='cpf'
                    value={values.cpf}
                    onChange={handleInputChange}
                    inputProps={{ minLength: 9 , maxLenght: 9 }}
                    {...(errors.cpf && {error: true, helperText: errors.cpf})}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label='Telefone'
                    name='telefone'
                    value={values.telefone}
                    onChange={handleInputChange}
                    inputProps={{ minLength: 12 , maxLenght: 12 }}
                    {...(errors.telefone && {error: true, helperText: errors.telefone})}
                />
            </Grid>
        </Grid>
        
        <Typography variant='h6' sx={{mt: '20px'}}>Endereço</Typography>
        <Divider sx={{mb: '20px', mt: '5px'}}/>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    label='UF'
                    name='endereco.uf'
                    value={values.endereco.uf}
                    onChange={handleInputChange}
                    {...(errors.endereco.uf && {error: true, helperText: errors.endereco.uf})}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label='Cidade'
                    name='endereco.cidade'
                    value={values.endereco.cidade}
                    onChange={handleInputChange}
                    {...(errors.endereco.cidade && {error: true, helperText: errors.endereco.cidade})}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label='CEP'
                    name='endereco.cep'
                    value={values.endereco.cep}
                    onChange={handleInputChange}
                    inputProps={{ minLength: 8 , maxLenght: 8 }}
                    {...(errors.endereco.cep && {error: true, helperText: errors.endereco.cep})}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label='Rua'
                    name='endereco.rua'
                    value={values.endereco.rua}
                    onChange={handleInputChange}
                    {...(errors.endereco.rua && {error: true, helperText: errors.endereco.rua})}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label='Bairro'
                    name='endereco.bairro'
                    value={values.endereco.bairro}
                    onChange={handleInputChange}
                    {...(errors.endereco.bairro && {error: true, helperText: errors.endereco.bairro})}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label='Número'
                    name='endereco.numero'
                    value={values.endereco.numero}
                    onChange={handleInputChange}
                    {...(errors.endereco.numero && {error: true, helperText: errors.endereco.numero})}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label='Complemento'
                    name='endereco.complemento'
                    value={values.endereco.complemento}
                    onChange={handleInputChange}
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
