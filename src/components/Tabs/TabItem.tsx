import React, { FC, ReactNode, CSSProperties, useContext } from "react";
import classNames from "classnames";
import { TabsContext, ITabsContext } from "./Tabs";
import Transition from "../Transition";

export interface ITabItemProps {
    /** 是否禁止选项不可点击 */
    disabled?: boolean;
    /** tabItem 自定义标题内容 */
    tab: ReactNode;
    /** <TabItem> 自定义内容 </TabItem> */
    children?: ReactNode;
    /** <TabItem> 自定义类名 */
    className?: string;
    /** tabs 索引 */
    index?: string;
    style?: CSSProperties
}

export const TabItem: FC<ITabItemProps> = (props) => {
    const {
        /** 是否禁止选项，'card' 模式下有效 */
        disabled,
        /** tabItem 自定义内容 */
        tab,
        /** <Alert> 自定义内容 </Alert> */
        children,
        className,
        /** tabs 索引 */
        index,
        style,
    } = props
    // 拿到父节点的 TabsContext
    const context: ITabsContext = useContext(TabsContext)

    const classes = classNames('tabs-item', className, {
        'is-active': context.index === index,
        'is-disabled': disabled,
    })

    // 不等于当前索引就隐藏
    const classes2 = classNames('tabs-item-context', '', {
        'is-hide': context.index !== index,
    })

    // 运行父组件的select 方法
    const handleClick = () => {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index)
        }
    }

    return (
        <>
            <li style={style} className={classes} onClick={handleClick}>
                {tab}
            </li>
            <div className={classes2}>
                <Transition
                    in={context.index === index}
                    animation="zoom-in-top"
                    timeout={300}
                >
                    <div>{children}</div>
                </Transition>
            </div>
        </>
    )
}

TabItem.displayName = 'TabItem'

TabItem.defaultProps = {
    disabled: false,
}
export default TabItem;