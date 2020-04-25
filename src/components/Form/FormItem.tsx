import React, { FC, forwardRef } from "react";
import Input from "../Input/Input";

export interface ItemProps {
  name: string;
  label?: React.ReactNode;
  ref?: any;
  errorMessage?: React.ReactNode;
}

const FormItem: FC<ItemProps> = forwardRef((props, ref: any) => {
  const { name, label, errorMessage } = props;

  return (
    <div>
      <div style={{ display: "flex" }}>
        {label && <div style={{ whiteSpace: "nowrap" }}>{label}：</div>}
        <Input style={{ display: "inline-block" }} name={name} ref={ref} />
      </div>
      {errorMessage && <div style={{color:'red'}}>{errorMessage}</div>}
    </div>
  );
});

FormItem.displayName = "FormItem";

export default FormItem;
