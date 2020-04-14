import React, { FC, ReactNode, useState, useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";

export interface IMenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export const MenuItem: FC<IMenuItemProps> = (props) => {
    const { index, disabled, className, style, children } = props
    const context = useContext(MenuContext)
    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    })
    const handleClick = () => {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index)
        }
    }
    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}
// 外面显示的名字
MenuItem.displayName = 'MenuItem'
export default MenuItem;