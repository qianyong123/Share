

import React from 'react'
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const isType = [
  '.md'
]

class UploadFile extends React.Component {
  state = {
    fileList: [
    ],
  };

  handleChange = (info) => {
    const { children, onChange, ...rest } = this.props
    let fileList = [...info.fileList];

    const nameIndex = info.file.name.lastIndexOf('.')
    if (info.file.status === "done" &&isType.includes(info.file.name.slice(nameIndex))) {
      const {response={}} = info.file 
      if(response && response.code === 200){
        onChange(response.path)
        this.setState({ fileList });
        message.success('文件上传成功')
      } else {
        message.error('文件上传失败')
      }
     
    }
    console.log(info)

  };

  render() {
    const { children, onChange,value, ...rest } = this.props

    const uploadProps = {
      ...rest,
      showUploadList: false,
      action: '/api/admin/upload',
      headers: {
        authorization: 'authorization-text',
      },
      name: 'file',
      accept: '*/*',
      onChange: this.handleChange,
      multiple: false, // 是否支持多文件上传
      beforeUpload: (file, fileList) => {
        const isLt20M = file.size / 1024 / 1024 < 20
        const nameIndex = file.name.lastIndexOf('.')

        if (!isLt20M) {
          message.error('文件尺寸不能大于20MB！')
          return isLt20M
        }

        if (!isType.includes(file.name.slice(nameIndex))) {
          message.error('上传文件格式需为md')
          return false
        }
      },
    };
    return (
      <Upload {...uploadProps}>
        {
          children
            ? children()
            : 
            <>
              <Button icon={<UploadOutlined />}>上传</Button>
              <p title={value}>{value}</p>
            </>
        }

      </Upload>
    );
  }
}

export default UploadFile