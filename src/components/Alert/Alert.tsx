import React, { FC, ReactNode, useState } from "react";
import classNames from "classnames";
import Icon from "../Icon/Icon";
import Transition from "../Transition";

// 1.点击 关闭按钮 整个元素消失
// 2.支持四种主题颜色
// 3.可以包含标题和内容，解释更详细的警告
// 4.右侧是否显示关闭按钮可配置
export type AlertType = 'success' | 'default' | 'danger' | 'wraning'
export interface IAlertProps {
    /** 警告提示内容 */
    message: ReactNode;
    /** 默认不显示关闭按钮 */
    closable?: boolean;
    /** 关闭按钮文字 */
    closeText?: ReactNode;
    /** 标题下的描述, 如果没传，会渲染 children */
    description?: ReactNode;
    /** 类型 AlertType */
    type?: AlertType;
    /** <Alert> 自定义内容 </Alert> */
    children?: ReactNode;
    /** <Alert> 样式 */
    className?: string;
    /** 关闭后的回调 */
    onClose?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
/**
 * 
 * <Alert> 自定义内容 </Alert>
 */
export const Alert: FC<IAlertProps> = (props) => {
    const {
        message,
        closable,
        closeText,
        description,
        type,
        children,
        onClose,
        className
    } = props
    const [status, setStatus] = useState(true)

    const classes = classNames('alert', className, {
        [`alert-${type}`]: type,
    })

    return (
        <Transition
            in={status}
            timeout={300}
            animation="zoom-in-top"
        >
            <div className={classes}>
                <div className="alert-title-box">
                    <span>标题：{message}</span>
                    {closable ? <a
                        className="alert-link"
                        onClick={(e) => {
                            setStatus(false)
                            if (onClose) {
                                onClose(e)
                            }
                        }}><Icon icon="ban" size='lg'>{closeText}</Icon></a> : null}
                </div>
                <div className="alert-content-box">
                    {description != undefined ? description : children}
                </div>
            </div>
        </Transition>
    )
}

Alert.defaultProps = {
    /** 默认不显示关闭按钮 */
    closable: false,
    /** 关闭按钮文字 */
    closeText: "关闭",
    /** 类型 AlertType */
    type: "default",
    /** 默认渲染 description */
    children: null,
}
export default Alert;