import React, { FC, InputHTMLAttributes, ReactNode, ChangeEvent, forwardRef } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/Icon'

type InputSize = 'sm' | 'lg'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size' | 'prefix'> {
    /** 尺寸 */
    size?: InputSize;
    /** 是否被禁用，默认是 false */
    disabled?: boolean;
    /** input 后面的小图标 */
    icon?: IconProp;
    /** 前缀 */
    prefix?: string | ReactNode;
    /** 后缀 */
    suffix?: string | ReactNode;
    /** 类名样式 */
    className?: string;
    /** 行内样式 */
    style?: React.CSSProperties;
    /** 收入后的回调 */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    /** ref 做表单元素时候需要 */
    ref?: any
}

const Input: FC<InputProps> = forwardRef((props, ref: any) => {
    const {
        size,
        disabled,
        icon,
        prefix,
        suffix,
        className,
        style,
        ...restProps
    } = props

    const cnames = classNames('viking-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prefix || suffix,
        'input-group-append': !!suffix,
        'input-group-prepend': !!prefix
    })

    // 修复非受控组件变成受控组件的错误
    const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
            return ''
        }
        return value
    }

    if ('value' in props) {
        // value 为准
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value)
    }

    return (
        <div className={cnames}>
            {prefix && <div className="viking-input-group-prepend">{prefix}</div>}
            {icon && <div className="icon-wrapper">
                <Icon icon={icon} title={`title-${icon}`} />
            </div>}
            <input
                className="viking-input-inner"
                disabled={disabled}
                style={style}
                ref={ref}
                {...restProps}
            />
            {suffix && <div className="viking-input-group-append">{suffix}</div>}
        </div>
    )
})

Input.displayName = 'Input'

Input.defaultProps = {
    size: 'sm',
    disabled: false,
    type: 'text'
}

export default Input;