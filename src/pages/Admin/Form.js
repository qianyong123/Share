import React, { PureComponent } from 'react'
import {
  Button,
  Form,
  Input,
  Modal,
  DatePicker,
  Select
} from 'antd'
import UploadFile from '../../components/UploadFile'

const { Option } = Select;

const classList = [
  'HtmlCss',
  'JavaScript',
  'React',
  'Vue',
  'Rest'
]

function FormComp(props) {

  const [form] = Form.useForm();
  const {
    title,
    modalVisible,
    modalType,
    onCancelClick,
    submitForm,
    item
  } = props


  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  }

  const initialValues = {
    ...item
  }

  const handSubmit = async () => {
    const mdUrl = `@/md/`
    try {
      const values = await form.validateFields();
      values.time = values.time ? values.time.format('YYYY-MM-DD') : '';
      values.text = `${mdUrl}${values.classify}/${values.text}`
      submitForm(values,()=>{
        form.resetFields()
      })
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const cancel = ()=> {
    form.resetFields()
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
      visible={modalVisible}
      onCancel={onCancelClick}
      maskClosable={false}
      width="500px"
    >

      <Form
        form={form}
        {...layout}
        name="basic"
        initialValues={initialValues}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '标题' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="技术类型"
          name="type"
          rules={[{ required: true, message: '类型' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="创建时间"
          name="time"
          rules={[{ required: true, message: '创建时间' }]}
        >
          <DatePicker style={{width:'100%'}} format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          label="技术分类"
          name="classify"
          rules={[{ required: true, message: '技术分类' }]}
        >
          <Select allowClear>
            {
              classList.map(v => <Option value={v}>{v}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item
          label="上传文章"
          name="text"
          rules={[{ required: true, message: '上传文章' }]}
        >
          <UploadFile />
        </Form.Item>
      </Form>

    </Modal>
  )

}

export default FormComp
