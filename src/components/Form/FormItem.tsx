import React, { FC, forwardRef } from "react";
import Input from "../Input/Input";

interface rulesType {
  required?: string
  pattern?: RegExp,
  validate?: Function,
  maxLength?: number,
  minLength?: number,
  max?: number,
  min?: number,
}

interface errorType {
  type:string,
  message:string
}

export interface ItemProps {
  name: string;
  label?: React.ReactNode;
  ref?: any;
  rules?:rulesType,
  errorObj?:errorType,
}

const FormItem: FC<ItemProps> = forwardRef((props, ref: any) => {
  const { name, label, children, rules, errorObj } = props;
  // 拿到不一样的 children 创建不一样的组件；总体思路是 ref 
  // 产生组件的函数。。。。
  return (
    <div>
      <div style={{ display: "flex" }}>
        {label && <div style={{ whiteSpace: "nowrap" }}>{label}：</div>}
        {/* 用ref转发解决问题 */}
        <Input style={{ display: "inline-block" }} name={name} ref={ref} />
      </div>
      {errorObj?.type && <div style={{color:'red'}}>{errorObj.message || `${name} 输入错误`}</div>}
    </div>
  );
});

FormItem.displayName = "FormItem";

export default FormItem;
