import React, { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import Form from "./components/Form";

// 用 library 加入图标，需要什么种类的就加什么
library.add(fas);

const App: React.FC = () => {
  // const form = Form.useForm();
 
  return (
    <div>
      <div>
        {/* <Form
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
            <Input type="text" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={{
              required: "password is required",
            }}
          >
            <Input type="text" />
          </Form.Item>
          <Button type="submit">提交</Button>
        </Form> */}
      </div>
    </div>
  );
};

export default App;
