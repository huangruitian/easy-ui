import { FC } from 'react'
import Tab, { ITabsProps } from './Tabs'
import TabItem, { ITabItemProps } from './TabItem'

// 函数组件有个子组件 TabItem
export type ITabsComponent = FC<ITabsProps> & {
    TabItem: FC<ITabItemProps>,
}
const Tabs = Tab as ITabsComponent

Tabs.TabItem = TabItem

export default Tabs