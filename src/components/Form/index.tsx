import { FC } from 'react'
import Form, { FormProps } from './Form'
import FormItem, { ItemProps } from './FormItem'

export type FormComponent = FC<FormProps> & {
  Item: FC<ItemProps>,
  useForm:() => any
}
const TransForm = Form as FormComponent

TransForm.Item = FormItem

export default TransForm