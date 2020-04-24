import React, { FC } from 'react'

// 1.默认值
// 2.submit 表单提交
// 3.包含了Item, name, label
// 4.form.xxx 提供一系列的方法
// 5.const [form] = Form.useFrom() 静态方法创建form实例
interface formMethods {
    
}

export interface FormProps {
    form: formMethods
}

const Form: FC<FormProps> = (props) => {
    const { children } = props
    return (
        <div>
            Form
              FormItem
        </div>
    )
}

Form.displayName = 'Form'

export default Form