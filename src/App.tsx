import React, { useState, useEffect } from "react";
import Button from "./components/Button/Button";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Menu from "./components/Menu";
import Tabs from "./components/Tabs";
import Alert from "./components/Alert/Alert";
import Input from "./components/Input/Input";
import AotuComplete, {
  DataSourceType,
} from "./components/AotuComplete/AotuComplete";
import Select from "./components/Select/Select";
import Option from "./components/Select/Option";
import axios from "axios";
import Form from "./components/Form";
import Upload from "./components/Upload/Upload";
import InputNumber from "./components/InputNumber/InputNumber";
import Table from "./components/Table/Table";

// 用 library 加入图标，需要什么种类的就加什么
library.add(fas);

interface IUserProps {
  value: string;
  number: number;
}

const App: React.FC = () => {
  const form = Form.useForm();

  const url = "https://jsonplaceholder.typicode.com/posts";
  const [val, setVal] = useState("vaasdasdl");
  const data: IUserProps[] = [
    {
      value: "kw",
      number: 18,
    },
    {
      value: "hrt",
      number: 20,
    },
  ];

  useEffect(() => {
    axios
      .get(`https://api.github.com/search/users?q=a`)
      .then(
        (res) => {
          console.log(res.data.items);
          return res.data.items;
        },
        (reject) => {
          // console.log('reject', reject)
          return reject;
        }
      )
      .then((res) => {
        console.log("res", res);
      });
  }, []);

  const fetchSuggestions1 = (key: string) => {
    return data.filter((item) => item.value.includes(key));
  };

  const fetchSuggestions = (keyword: string) => {
    return fetch(`https://api.github.com/search/users?q=${keyword}`)
      .then((res) => res.json())
      .then(({ items }) => {
        console.log(items);
        const formatItems = items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
        return formatItems;
      });
  };

  const renderOption = (item: DataSourceType) => {
    const itemWithObj = item as DataSourceType<IUserProps>;
    return (
      <>
        <h3>姓名：{itemWithObj.value}</h3>
        <h3>年龄：{itemWithObj.number}</h3>
      </>
    );
  };
  let dataSource = [];

  for (let i = 0; i < 100000; i++) {
    dataSource.push({
      key: i,
      name: { n: `666黑叔${i}` },
      age: i,
      address: `西湖区湖底公园${i}号`,
    });
  }

  const columns = [
    {
      title: "姓名",
      dataIndex: ["name", "n"],
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <div>
      <Button> 显示/隐藏 </Button>
      <Menu
        mode="vertical"
        defaultIndex={"0"}
        onSelect={(index) => {
          console.log(index);
        }}
      >
        <Menu.Item>第一项</Menu.Item>
        <Menu.SubMenu title="subMenu">
          <Menu.Item>subMenu</Menu.Item>
          <Menu.Item>subMenu2</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item>第三项</Menu.Item>
      </Menu>
      <Tabs
        // type="line"
        defaultIndex={"0"}
        onSelect={(index) => {
          console.log(index);
        }}
      >
        <Tabs.TabItem tab="第一项"> 第一项的内容 </Tabs.TabItem>
        <Tabs.TabItem tab="第二项" disabled>
          {" "}
          第二项的内容{" "}
        </Tabs.TabItem>
        <Tabs.TabItem tab="第三项"> 第三项的内容 </Tabs.TabItem>
      </Tabs>
      <Alert message="111" type="default" closable />
      <div>
        <Input
          defaultValue="222"
          value={val}
          onChange={(e) => {
            console.log(e.target.value);
            setVal(e.target.value);
          }}
          prefix="www"
          suffix="com"
          // disabled
          style={{
            width: "100px",
            height: "40px",
          }}
        />
        <div
          style={{
            width: "100px",
          }}
        >
          <AotuComplete
            onSelect={(keyword) => {
              console.log(keyword);
            }}
            fetchSuggestions={fetchSuggestions}
            // renderOption={renderOption}
          />
        </div>
        <p>分割线===========</p>
        <Select
          onVisibleChange={(value, Option) => {
            console.log("onVisibleChange", value, Option);
          }}
          onChange={(value, Option) => {
            console.log("onChange", value, Option);
          }}
          mode="multiple"
          defaultValue={[0, 1, 2]}
        >
          <Option value="kw">kw</Option>
          <Option value="hrt">hrt</Option>
          <Option value="mg">mg</Option>
        </Select>
      </div>
      <Upload
        action={url}
        onRemove={(file) => {
          console.log(file);
        }}
        headers={{ Hrt: "kww" }}
        name="fileName"
        data={{ key: "val" }}
        accept={".docx"}
        withCredentials
        multiple
        drag
      >
        上传文件
      </Upload>
      <InputNumber
        onChange={(value) => {
          console.log(value);
        }}
        defaultValue={10.1}
        max={20}
        min={1}
        step={0.2}
        precision={4}
      />
      <div style={{ width: 1000, margin: "20px" }}>
        <Table dataSource={dataSource} columns={columns}/>
      </div>
      <div style={{ margin: "10px" }}>
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
        </Form>
      </div>
    </div>
  );
};

export default App;
