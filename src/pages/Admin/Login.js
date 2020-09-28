import React, { useEffect } from 'react'
import {
  Button,
  Form,
  Input,
  Modal,
  Select
} from 'antd'


const { Option } = Select;
const { TextArea } = Input

function FormComp(props) {

  const [form] = Form.useForm();

  const {
    title,
    modalLogin,
    onCancelClick,
    submitForm,
    item,
  } = props

  useEffect(() => {
   
  }, [])

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  }



  const handSubmit = async () => {
    try {
      const values = await form.validateFields();
      submitForm(({...values }))
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const cancel = () => {
    onCancelClick()
  }

  return (
    <Modal
      destroyOnClose
      footer={
        [
          <Button type="primary" onClick={handSubmit}>
            提交
          </Button>,
          <Button onClick={cancel} style={{ marginLeft: '16px' }}>
            取消
            </Button>]
      }
      title={title}
      visible={modalLogin}
      onCancel={cancel}
      maskClosable={false}
      width="500px"
    >

      <Form
        form={form}
        {...layout}
        name="basic"
        initialValues={{}}
      >
    
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '用户名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '密码' }]}
        >
          <Input.Password />
        </Form.Item>
  
      </Form>

    </Modal>
  )

}

export default FormComp
