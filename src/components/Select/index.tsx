import { FC } from 'react'
import Select, { ISelectProps } from './Select'
import Option, { IOptionProps } from './Option'

type SelectComponent = FC<ISelectProps> & {
    Option: FC<IOptionProps>
}
const TransSelect = Select as SelectComponent
TransSelect.Option = Option

export default TransSelect