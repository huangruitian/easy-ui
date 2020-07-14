import React, { FC } from "react";
import { ValidationOptions, FormContextValues } from "react-hook-form";
import { ItemProps } from "./FormItem";

export interface FormProps {
  form:FormContextValues<any>;
  onSubmit?: (erros: object, data: object) => void;
}

const Form: FC<FormProps> = (props) => {
  const { children, onSubmit, form } = props;
  const { register, handleSubmit, errors, ...restProps } = form;

  const createFormItem = (element: any, props?: object) => {
    return React.cloneElement(element, {
      ...props
    });
  }

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      const childElement = child as React.FunctionComponentElement<ItemProps>;
      const { displayName } = childElement.type;
      const rules = (childElement.props.rules || {}) as ValidationOptions
      const name = childElement.props.name
      const errorObj = errors[name] || {}

      if (displayName === "FormItem") {
        return createFormItem(childElement, {
          ref: register(rules),
          errorObj,
        });
      } else if (displayName === "Button") {
        return createFormItem(childElement);
      } else {
        console.warn(
          "Warning: Form has a child which is not a FormItem or Button component"
        );
        // return createFormItem(childElement);
      }
    });
  };

  const submit = (data: object) => {
    if (onSubmit) {
      onSubmit(errors, data)
    }
  };

  return <form onSubmit={handleSubmit(submit)}>{renderChildren()}</form>;
};

Form.displayName = "Form";

export default Form;
