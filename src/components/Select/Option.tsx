import React, { FC, useContext } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/Icon'
import { SelectContext } from './Select'

export interface IOptionProps {
  disabled?: boolean
  value: string
  index?: number
}

{/* 
  <Select>
    <Select.Option value="lucy">lucy</Select.Option>
  </Select> 
*/}

const Option: FC<IOptionProps> = (props) => {
  const {
    disabled,
    value,
    index = -1,
    children,
  } = props
  const context = useContext(SelectContext)
  
  // option 点击
  const hanleClick = (e: React.MouseEvent) => {
    if(context.onSelect && index != undefined){
      console.log('option clicked')
       context.onSelect(index)
     }
  }
  // 样式控制不能点击
  const classes = classNames('option-item', {
    'is-disabled': disabled,
    'is-active': context.index.includes(index)
  })

  return (
    <li onClick={hanleClick} className={classes} style={{border:'1px solid #ccc', flex:1}}>
      {children}
    </li>
  )
}

Option.displayName = 'Option'

Option.defaultProps = {
  disabled: false,
}

export default Option