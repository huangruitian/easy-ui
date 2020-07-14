import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import InputNumber  from './InputNumber'
const defaultInput = () => (
  <InputNumber
    placeholder="漂亮的 InputNumber"
    onChange={action('changed')}
  />
)

const disabledInput = () => (
  <InputNumber
    placeholder="被禁用的 InputNumber"
    disabled
  />
)

const stepInput = () => (
  <InputNumber
    placeholder="被禁用的 InputNumber"
    step={1.3}
    precision={2}
  />
)


storiesOf('InputNumber', module)
  .add('默认值使用', defaultInput)
  .add('可以被禁用的', disabledInput)
  .add('增加指定值，指定精度', stepInput)