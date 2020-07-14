import React from "react";
import { storiesOf } from "@storybook/react";

import Form from "./index";
import Button from "../Button/Button";
import Input from "../Input/Input";

const defaultForm = () => {
  const form = Form.useForm();
  return (
    <Form
      form={form}
      onSubmit={(err: any, data: any) =>
        console.log("err:any, data: any", err, data)
      }
    >
      <Form.Item
        name="name"
        rules={{
          required: "name1 is required",
          pattern: /[1-9]/,
        }}
      >
        <Input type="text" disabled/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={{
          required: "password is required",
        }}
      >
        <Input type="text" disabled/>
      </Form.Item>
      <Button type="submit">提交</Button>
      {/* <div>说明：storybook报错，组件实际没有报错</div> */}
    </Form>
  );
};

storiesOf("Form", module).add("Form", defaultForm, {info: {text: '基于react-hook-form二次开发：https://www.react-hook-form.com/api'}})

