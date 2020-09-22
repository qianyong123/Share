import React, { PureComponent } from 'react'
import { Input, Select, Button, Form } from 'antd'

const { Option } = Select
const FormItem = Form.Item




function Filter(props) {

  const {
    onSearch,
    resetForm,
    classList
  } = props
  const [form] = Form.useForm();

  const handleReset = () => {

    form.resetFields()
    resetForm()
  }


  const onFinish = values => {
    onSearch(values)
    console.log(values);
  };


  const formItemLayout = {
    layout: 'inline',
    labelAlign: 'left',
  }


  return (
    <div>
      <Form onFinish={onFinish} form={form} {...formItemLayout}>
        <Form.Item name="title">
          <Input allowClear placeholder="输入标题关键字" />
        </Form.Item>
        <Form.Item name="classify">
          <Select style={{width:150}} placeholder="请选择技术分类" allowClear>
            {
              classList.map(v => <Option key={v.id} value={v.name}>{v.name}</Option>)
            }
          </Select>
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
