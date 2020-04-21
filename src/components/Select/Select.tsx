import React, { FC, useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/Icon'
import { IOptionProps } from './Option'
import useClickOutSide from '../../hooks/useClickOutSide'


// 1.支持单选多选两种
// 2.ipunt框不能手动输入，点击选项之后自动填入
// 3.多模式下，点击可以添加一项，再次点击可以取消一项 tag 上的X也可以删除
// 4.注意暴露足够多的回调函数，比如onVisibleChange 在下拉菜单，显示、隐藏的时候被调用，
// 还有onChange，在值发生变化的时候被触发，并且参数应该有当前被选的是哪几项
// 5.合理的设计组件结构

type SelectMode = 'multiple' | 'tags'
export interface ISelectProps {
  // 支持单选多选两种
  mode?: SelectMode
  // 大小
  size?: 'large' | 'small' | 'default'
  // 值发生变化时候调用
  onChange?: (values: string[], options: string[]) => void
  // 显示隐藏下拉菜单时候被调用
  onVisibleChange?: (visible: boolean, option: string[]) => void
  // 是否被禁用
  disabled?: boolean
  // 默认值，单选的时候只有一个
  defaultValue?: number[]
}

interface ISelectContext {
  index: number[];
  onSelect?: (selectedIndex: number) => void;
  mode?: SelectMode;
  defaultValue?: number[];
}

export const SelectContext = React.createContext<ISelectContext>({ index: [] })

{/* 
  <Select>
    <Select.Option value="lucy">lucy</Select.Option>
  </Select> 
*/}

const Select: FC<ISelectProps> = (props) => {
  const {
    mode,
    size,
    onChange,
    onVisibleChange,
    disabled,
    defaultValue = [],
    children
  } = props
  if (mode === 'tags') {
    defaultValue.length = 1
  }
  // 拿到当前子节点的值
  const [dataSoure, setDataSoure] = useState<string[]>([])
  // 显示或者隐藏下拉菜单
  const [show, setShow] = useState(false)
  // 当前选择的索引，你选了啥, tag 只能选一个，不是tag 可以选多个
  const [curActive, setCurActive] = useState<number[]>(defaultValue)

  const inputRef = useRef<HTMLInputElement>(null)
  const compRef = useRef<HTMLDivElement>(null)
  useClickOutSide(compRef, (e: MouseEvent) => handleBlur(e))

  // 拿到子元素的所有数据
  useEffect(() => {
    const vaules: string[] = []
    React.Children.map(children, child => {
      const childElement = child as React.FunctionComponentElement<IOptionProps>
      // 拿到所有的 value
      vaules.push(childElement.props.value)
    })
    setDataSoure(vaules)
  }, [])

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<IOptionProps>
      const { displayName } = childElement.type
      if (displayName === 'Option') {
        return React.cloneElement(childElement, {
          index: index,
        })
      } else {
        console.error("Warning: Select has a child which is not a Option component")
      }
    })
  }

  // const handleChangeActiveIndex = (index: number) => {
  //   if (index < 0) {
  //     index = 0
  //   }
  //   if (index >= dataSoure.length) {
  //     index = dataSoure.length - 1
  //   }
  //   setCurActive(index)
  // }
  const getCurrentValus = (indexArr: number[]) => {
    const values: string[] = []
    indexArr.forEach(idx => {
      values.push(dataSoure[idx])
    })
    return values
  }

  // 点击按钮，设置当前的值
  const handleClick = (idx: number) => {
    const indexArr: number[] = selectIndexByDataSoure(idx)
    if (onChange) {
      onChange(getCurrentValus(indexArr), dataSoure)
    }
  }

  // 鼠标聚焦，显示菜单
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setShow((pre) => {
      console.log('handleFocus', pre)
      if (onVisibleChange) {
        onVisibleChange(true, dataSoure)
      }
      inputRef.current?.blur()
      return true
    })
  }

  // 隐藏菜单
  const handleBlur = (e: MouseEvent) => {
    setShow((pre) => {
      // 想类组件一样setState
      console.log('handleBlur', pre)
      if (onVisibleChange) {
        onVisibleChange(false, dataSoure)
      }
      return false
    })
  }

  const selectIndexByDataSoure = (index: number) => {
    let values: number[] = []
    if (mode === 'multiple') {
      if (curActive.includes(index)) {
        // 还不能乱序, 排序呗
        curActive.forEach(idx => {
          if (idx !== index) {
            values.push(idx)
          }
        })
      } else {
        values = [...curActive, index]
      }
      values.sort((a, b) => a - b)
    } else {
      values.push(index)
    }
    setCurActive(values)
    return values
  }

  const passedContext: ISelectContext = {
    index: curActive ? curActive : [],
    onSelect: handleClick,
    mode,
    defaultValue,
  }

  return (
    <>
      <div ref={compRef} style={{ border: '1px solid red' }}>
        <div>
          <input
            type="text"
            value={mode !== 'tags' ? getCurrentValus(curActive) : dataSoure[curActive[0]]}
            onFocus={handleFocus}
            ref={inputRef}
            disabled={disabled} />
        </div>
        {
          show &&
          (
            <ul style={{ listStyle: 'none' }}>
              <SelectContext.Provider value={passedContext}>
                {renderChildren()}
              </SelectContext.Provider>
            </ul>
          )
        }
      </div>
    </>
  )
}

Select.displayName = 'Select'

Select.defaultProps = {
  mode: "tags",
  size: "default",
  disabled: false,
  defaultValue: []
}

export default Select