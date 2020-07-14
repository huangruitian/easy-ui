import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Table, { ColumnProps } from './Table'

let dataSource:any = [];

for (let i = 0; i < 50; i++) {
  dataSource.push({
    key: i,
    name: { n: `666小白${i}` },
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

const defaultTable = () => (
  <Table dataSource={dataSource} columns={columns}/>
)

storiesOf('Table', module)
  .add('Table', defaultTable)
