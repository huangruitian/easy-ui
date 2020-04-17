import React, { FC, ReactNode, useState, CSSProperties, createContext } from "react";
import classNames from "classnames";
import { ITabItemProps } from "./TabItem";

type TabsType = 'line' | 'card'
type onSelectCallBack = (selectedIndex: string) => void;
export interface ITabsProps {
    /** 卡片类型，默认是line */
    type?: TabsType;
    /** <Tabs> 自定义内容 </Tabs> */
    children?: ReactNode;
    /** <Tabs> 自定义类名 */
    className?: string;
    /** 默认选择的 tab 项目，不传默认第一项 */
    defaultIndex?: string;
    /** 选择卡片后的回调 */
    onSelect?: onSelectCallBack;
    /** 卡片的样式 */
    style?: CSSProperties,
}

export interface ITabsContext {
    index: string,
    /**点击菜单项触发的回掉函数 */
    onSelect?: onSelectCallBack;
    /** 卡片类型，默认是line */ 
    type?: TabsType;
}
export const TabsContext = createContext<ITabsContext>({ index: '0' })

export const Tabs: FC<ITabsProps> = (props) => {
    const {
        type,
        children,
        className,
        defaultIndex,
        onSelect,
        style
    } = props
    const [curActive, setCurActive] = useState(defaultIndex)
    // 点击选择卡片
    const handleClick = (index: string) => {
        setCurActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    // 透传给子组件的 context
    const context: ITabsContext = {
        index: curActive ? curActive : "0",
        onSelect: handleClick,
        type,
    }
    // 混合样式
    const classes = classNames('tabs', className, {
        'tabs-line': type === "line",
        'tabs-card': type !== "card",
    })
    // 渲染子节点
    const renderChildren = () => {
        return React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<ITabItemProps>
            // 巧妙的利用 displayName 静态属性还创建 reactElement
            const { displayName } = childElement.type
            if (displayName === 'TabItem') {
                return React.cloneElement(childElement, {
                    index: i.toString()
                })
            } else {
                console.error('the children copmonent not a TabItem!')
            }
        })
    }

    return (
        <ul style={style} className={classes}>
            <TabsContext.Provider value={context}>
                {renderChildren()}
            </TabsContext.Provider>
        </ul>
    )
}

Tabs.defaultProps = {
    type: "line",
    defaultIndex: '0',
}

export default Tabs;