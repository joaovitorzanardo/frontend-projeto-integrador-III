import React from 'react'

import { CrudButtons } from '../shared/components/CrudButtons';

import { Template } from '../shared/layouts/Template';
import { CustomTable } from '../shared/components/CustomTable';

export const Clientes = () => {
  return (
    <Template title='Clientes'>
      <CrudButtons />
      <CustomTable />
    </Template>
  )
}


