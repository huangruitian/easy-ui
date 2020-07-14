import { FC } from 'react'
import { useForm } from 'react-hook-form'
import Form, { FormProps } from './Form'
import FormItem, { ItemProps } from './FormItem';

export type FormComponent = FC<FormProps> & {
  useForm: typeof useForm;
  Item: FC<ItemProps>;
};

const TransForm = Form as FormComponent;

TransForm.Item = FormItem;
TransForm.useForm = useForm;
export default TransForm;