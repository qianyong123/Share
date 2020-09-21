

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

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    const nameIndex = info.file.name.lastIndexOf('.')
    if (isType.includes(info.file.name.slice(nameIndex))) {
      onChange(info.file.name)
      this.setState({ fileList });
    }
    console.log(info)

  };

  render() {
    const { children, onChange,value, ...rest } = this.props

    const uploadProps = {
      ...rest,
      showUploadList: false,
      // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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