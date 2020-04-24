import React, { FC } from 'react'



export interface ItemProps {
   label: React.ReactNode
   name:string
}

const FormItem: FC<ItemProps> = (props) => {
    const { children } = props
    
    return (
        <div>
           FormItem
        </div>
    )
}

FormItem.displayName = 'Form'


export default FormItem