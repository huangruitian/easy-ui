import React, { FC, useState, CSSProperties, createContext } from "react";
import classNames from "classnames";

type onSelectCallBack = (selectedIndex: string) => void;
type MenuMode = 'horizontal' | 'vertical'
export interface IMenuProps {
    /**默认 active 的菜单项的索引值 */
    defaultIndex?: string;
    className?: string;
    /**菜单类型 横向或者纵向 */
    mode?: MenuMode;
    style?: CSSProperties;
    /**点击菜单项触发的回掉函数 */
    onSelect?: onSelectCallBack;
    /**设置子菜单的默认打开 只在纵向模式下生效 */
    defaultOpenSubMenus?: string[];
}

export interface IMenuContext {
    index: string,
    /**点击菜单项触发的回掉函数 */
    onSelect?: onSelectCallBack;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export const MenuContext = createContext<IMenuContext>({ index: '0' })

export const Menu: FC<IMenuProps> = (props) => {
    const {
        defaultIndex,
        className,
        mode,
        style,
        onSelect,
        defaultOpenSubMenus,
        children
    } = props
    const [curIndex, setCurIndex] = useState(defaultIndex)
    const classes = classNames('menu', className, {
        'menu-vertical': mode === "vertical",
        'menu-horizontal': mode === "horizontal",
    })
    // 设置 Menu 当前点点击了哪一个
    const handleClick = (index: string) => {
        setCurIndex(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    // context 透传给 MenuItem
    const context: IMenuContext = {
        index: curIndex ? curIndex : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus,
    }
    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={context}>
                {children}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: [],
}

export default Menu;