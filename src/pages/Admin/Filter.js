import React, { PureComponent } from 'react'
import { Input, Select, Button, Form } from 'antd'

const { Option } = Select
const FormItem = Form.Item





function Filter(props) {

  const {
    onSearch,
    resetForm,

  } = props
  const [form] = Form.useForm();

  const handleReset = () => {

    form.resetFields()
    resetForm()
  }

 
  const onFinish = values => {
    console.log(values);
  };

 
  const formItemLayout = {
    layout: 'inline',
    labelAlign: 'left',
  }


  return (
    <div>
      <Form onFinish={onFinish} form={form} {...formItemLayout}>
        <Form.Item name="name">
          <Input placeholder="输入标题关键字" />
        </Form.Item>
        <FormItem>
          <Button type="primary" htmlType="submit">
            查询
            </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            重置
            </Button>
        </FormItem>
      </Form>
    </div>
  )
}


export default Filter
