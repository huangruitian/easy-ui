import React from 'react'
import { storiesOf } from '@storybook/react'

import Pagination from './Pagination'
const defaultPagination = () => (
  <Pagination
     current={1}
     pageSize={10}
     total={100}
  />
)

storiesOf('Pagination', module)
  .add('Pagination', defaultPagination)