import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import FormItem, { ItemProps } from "./FormItem";

export interface FormProps {
  onSubmit: (data: any) => void;
}
type FC = React.FC<FormProps> & { useForm:any }

const Form: FC = (props) => {
  const { children } = props;
  const { register, handleSubmit, errors, ...restProps } = useForm();
  const submit = (data: any) => {
    console.log("data：", data);
  };
  console.log("errors：", errors);
  
  const createFormItem = (element:any, props?:object) => {
    return React.cloneElement(element, {
        ...props
      });
  }

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      const childElement = child as React.FunctionComponentElement<ItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "FormItem") {
        return createFormItem(childElement, {
            ref:register({ required: true })
        });
      } else if (displayName === "Button") {
        return createFormItem(childElement);
      } else {
        console.error(
          "Warning: Form has a child which is not a FormItem or Button component"
        );
      }
    });
  };
  console.log('renderChildren()', renderChildren())
  return <form onSubmit={handleSubmit(submit)}>{renderChildren()}</form>;
};

Form.displayName = "Form";
Form.useForm = useForm

export default Form;
