import React, { FC, InputHTMLAttributes, ChangeEvent, useState, useRef } from 'react'
import classNames from 'classnames'
import Button from '../Button/Button'

type InputSize = 'large' | 'middle' | 'small'
export interface InputProps extends
    Omit<InputHTMLAttributes<HTMLElement>, 'size' | 'onChange'> {
    /** 默认值 */
    defaultValue?: number;
    /** 是否被禁用，默认是 false */
    disabled?: boolean;
    /** 指定输入框展示值的格式 */
    formatter?: (value: number | string) => string
    /** 最大值 */
    max?: number;
    /** 最小值 */
    min?: number;
    /** 尺寸 */
    size?: InputSize;
    /** 每次改变的次数 */
    step?: number
    /** 数值精度 */
    precision?: number
    /** 变化的回调 */
    onChange?: (value: number | string) => void
}

const InputNumber: FC<Partial<InputProps>> = (props) => {
    const {
        defaultValue,
        disabled,
        formatter,
        max,
        min,
        size,
        step,
        precision = 0,
        onChange,
        ...restProps
    } = props
    const tempValRef = useRef<number | string>(defaultValue || 0)
    const [value, setValue] = useState<number | string>(defaultValue || '')
    const cnames = classNames('input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
    })

    /**
     * 精度处理
     */
    const formatFloat = (num1: number, num2: number, operator: '+' | '-') => {
        const num1Digits = (num1.toString().split('.')[1] || '').length;
        const num2Digits = (num2.toString().split('.')[1] || '').length;
        const dig = Math.max(num1Digits, num2Digits)
        const baseNum = Math.pow(10, dig);
        let result;
        if (operator === '+') {
            result = (num1 * baseNum + num2 * baseNum) / baseNum;
        } else {
            result = (num1 * baseNum - num2 * baseNum) / baseNum;
        }
        return result.toFixed(precision)
    }

    const compute = (step: number, operator: '+' | '-') => {
        let curVal: string;
        if (operator === '+') {
            curVal = formatFloat(+value, step, operator)
            if (max && max < +curVal) {
                return
            }
        } else {
            curVal = formatFloat(+value, step, operator)
            if (min && min > +curVal) {
                return
            }
        }
        console.log('compute', curVal)
        setValue(_ => {
            if (onChange) {
                onChange(curVal)
            }
            return curVal
        })
    }

    const handleAdd = () => {
        if (step) {
            compute(step, "+")
        } else {
            compute(1, "+")
        }
    }

    const handleSub = () => {
        if (step) {
            compute(step, "-")
        } else {
            compute(1, "-")
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value
        setValue(val)
    }
    // 聚焦只执行一次，先保存之前的值
    const handleFocus = () => {
        tempValRef.current = value
    }
    // 校验数字，仅可以输入数字和有效范围, 无效恢复之前的值
    const handleBlur = () => {
        // 怎么保存之前的值呢？
        const tempVal = tempValRef.current
        if (Number.isNaN(+value)) {
            // 恢复之前的值
            setValue(tempVal)
            return
        }
        if ((min && min > +value) || (max && max < +value)) {
            // 恢复之前的值
            setValue(tempVal)
            return
        }
    }
    return (
        <div className={cnames}>
            <input
                value={value}
                onFocus={handleFocus}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
                {...restProps}
            />
            <span>
                <Button btnType="primary" onClick={handleAdd}>+</Button>
                <Button btnType="danger" onClick={handleSub}>-</Button>
            </span>
        </div>
    )
}

InputNumber.displayName = 'InputNumber'

InputNumber.defaultProps = {
    size: "middle",
    disabled: false,
    type: 'text'
}

export default InputNumber