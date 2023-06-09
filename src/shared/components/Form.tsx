import React from 'react'

type Props = {
    children: React.ReactNode
}

export const Form = ({children}: Props) => {
  return (
    <form>
        {children}
    </form>
  )
}
