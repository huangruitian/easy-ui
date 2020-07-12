//封装react组件，要更语义化，更像HTML标签的解决方案；
/**
  <Menu
    mode="vertical"
    defaultIndex={"0"}
    onSelect={(index) => {
      console.log(index);
    }}
  >
    <Menu.Item>第一项</Menu.Item>
    <Menu.SubMenu title="subMenu">
      <Menu.Item>subMenu</Menu.Item>
      <Menu.Item>subMenu2</Menu.Item>
    </Menu.SubMenu>
    <Menu.Item>第三项</Menu.Item>
  </Menu>
 */
import React, { FC, useState, createContext, CSSProperties } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './MenuItem'

type MenuMode = 'horizontal' | 'vertical'
export interface MenuProps {
  /**默认 active 的菜单项的索引值 */
  defaultIndex?: string;
  className?: string;
  /**菜单类型 横向或者纵向 */
  mode?: MenuMode;
  style?: CSSProperties;
  /**点击菜单项触发的回掉函数 */
  onSelect?: (selectedIndex: string) => void;
  /**设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[];
}

interface MenuContext {
  index: string;
  onSelect?: (selectedIndex: string) => void;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];  
}

export const MenuContext = createContext<MenuContext>({index: '0'})

export const Menu: FC<MenuProps> = (props) => {
  const { 
    className, 
    mode, 
    style, 
    children, 
    defaultIndex, 
    onSelect, 
    defaultOpenSubMenus 
  } = props

  const [ currentActive, setActive ] = useState(defaultIndex)

  const classes = classNames('esay-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })

  const handleClick = (index: string) => {
    setActive(index)
    if(onSelect) {
      onSelect(index)
    }
  }
  // 透传给子组件
  const passedContext: MenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }

  const renderChildren = () => {
    // children 是一个不明确的数据结构，一般是数组；
    return React.Children.map(children, (child, index) => {
      // 注意是 FunctionComponentElement 实例
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // 克隆一个组件
        return React.cloneElement(childElement, {
          // 位于父组件的第几个？然后和currentActive对比就知道没有选中。
          index: index.toString()
        })
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}
Menu.displayName = 'Menu'
export default Menu;