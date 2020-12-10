import React, { PureComponent } from 'react'
import { Input, Select, Button, Form, Menu } from 'antd'
import {
  Link,
  
} from "react-router-dom";

const { SubMenu } = Menu;
const { Option } = Select
const FormItem = Form.Item




function Filter(props) {
  const [form] = Form.useForm();

  const {
    onSearch,
    resetForm,
    classList,
    onLogin,
    username,
    removeLogin
  } = props

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

  const handleClick = e => {
    console.log('click ', e);
  };

  return (
    <div>
      <div className="menuDiv">
        {
          username
            ?
            <p style={{ marginBottom: 10 }}>
              <span> {username}</span>
              <span onClick={removeLogin} style={{ marginLeft: 20, color: "#f77c7c", cursor: 'pointer' }}>退出登录</span>
            </p>
            :
            <Button
              type="primary"
              style={{ marginBottom: 10 }}
              onClick={onLogin}
            >
              登录
        </Button>
        }

        {/* <Menu onClick={handleClick} mode="horizontal">
          <SubMenu
            key="SubMenu"
            title="地图页面"
          >       
            <Menu.Item key="1">
              <Link to='/note'>高德地图行政区域</Link>
            </Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </SubMenu>
        </Menu> */}
      </div>

      <Form onFinish={onFinish} form={form} {...formItemLayout}>
        <Form.Item name="title">
          <Input allowClear placeholder="输入标题关键字" />
        </Form.Item>
        <Form.Item name="classify">
          <Select style={{ width: 150 }} placeholder="请选择技术分类" allowClear>
            {
              classList.map(v => <Option key={v.id} value={v.name}>{v.label}</Option>)
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
