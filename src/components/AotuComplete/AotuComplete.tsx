import React, { FC, ChangeEvent, useState, ReactElement, useEffect } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/Input'
import Icon from '../Icon/Icon'
import useDebounce from '../../hooks/useDebounce'

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
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (debounceValue) {
            const result = fetchSuggestions(debounceValue)
            if (result instanceof Promise) {
                setSuggestions([])
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
    }, [debounceValue])

    const cnames = classNames('viking-input-wrapper', {

    })
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value.trim()
        // 设置初始值
        setInitValue(keyword)
    }

    // 选择 item
    const handleSelect = (item: DataSourceType) => {
        setInitValue(item.value)
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }

    const renderDropdown = () => (
        <ul style={{
            listStyle: 'none'
        }}>
            {suggestions.map((item, index) => (
                <li key={index} onClick={() => handleSelect(item)}>
                    {renderTemplate(item)}
                </li>
            ))}
        </ul>
    )

    return (
        <>
            <div className={cnames}>
                <Input
                    value={initValue}
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