import React, { FC, ChangeEvent, useState, ReactElement, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/Input'
import Icon from '../Icon/Icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutSide from '../../hooks/useClickOutSide'

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject

export interface IAotuCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** 搜索关键字的回调，这个值一定要给 */
  fetchSuggestions: (keyWord: string) => DataSourceType[] | Promise<DataSourceType[]>
  /** 选择后的回调 */
  onSelect?: (item: DataSourceType) => void
  /** 自定义渲染模版 */
  renderOption?: (item: DataSourceType) => ReactElement
}

const AotuComplete: FC<IAotuCompleteProps> = (props) => {
  const {
    value,
    onSelect,
    fetchSuggestions,
    renderOption,
    ...restProps
  } = props
  const [initValue, setInitValue] = useState(value as string)
  // 加防抖
  const debounceValue = useDebounce(initValue, 300)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [loading, setLoading] = useState(false)
  // 比常见的ref更万能
  const tiggerSearch = useRef(false)
  const compRef = useRef<HTMLDivElement>(null)
  useClickOutSide(compRef, () => { setSuggestions([]) })

  useEffect(() => {
    if (debounceValue && tiggerSearch.current) {
      const result = fetchSuggestions(debounceValue)
      if (result instanceof Promise) {
        // setSuggestions([])
        setLoading(true)
        result.then((res) => {
          setLoading(false)
          // 外面必须用链式调用的then 处理好值
          setSuggestions(res)
        }).catch(() => {
          setLoading(false)
        })
      } else {
        setSuggestions(result)
      }
    } else {
      setSuggestions([])
    }
  }, [debounceValue, fetchSuggestions])

  const cnames = classNames('.viking-auto-complete', {

  })
  
  const handleChangeActiveIndex = (index: number) => {
    if (index < 0) {
      index = 0
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setActiveIndex(index)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions.length) {
          handleSelect(suggestions[activeIndex])
        }
        break;
      case 38:
        handleChangeActiveIndex(activeIndex - 1)
        break;
      case 40:
        handleChangeActiveIndex(activeIndex + 1)
        break;
      case 27:
        setSuggestions([])
        break;
      default:
        break;
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.trim()
    // 设置初始值
    setInitValue(keyword)
    tiggerSearch.current = true
  }

  // 选择 item
  const handleSelect = (item: DataSourceType) => {
    setInitValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    tiggerSearch.current = false
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const renderDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const cnames = classNames('suggestion-item', {
            'is-active': activeIndex === index
          })
          return (<li
            key={index}
            className={cnames}
            onClick={() => handleSelect(item)}
          >
            {renderTemplate(item)}
          </li>)
        })}
      </ul>
    )
  }

  return (
    <>
      <div className={cnames}>
        <Input
          value={initValue}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          {...restProps}
        />
      </div>
      <div>
        {loading && <span><Icon icon="spinner" spin /></span>}
        {suggestions.length > 0 && renderDropdown()}
      </div>
    </>
  )
}

AotuComplete.displayName = 'AotuComplete'

AotuComplete.defaultProps = {

}

export default AotuComplete