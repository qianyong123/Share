

import React,{useState} from 'react'
import { message, Spin } from 'antd';



function Download(props) {

  const { children, fileName } = props
  const [loading,setLoading] = useState(false)
  
  const downFile = (blob, name) => {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, name)
    } else {
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = name
      link.click()
      window.URL.revokeObjectURL(link.href)
    }
  }

  const download = () => {
    const name = fileName.replace('upload/', '')
    setLoading(true)
    fetch('/api/file/download?text=' + fileName, {
      // responseType: 'arraybuffer',
      responseType: 'blob'
    })
      .then(response => {
        setLoading(false)
        return response.blob()
      })
      .then(data => {
        console.log(data)
        try {
          if (data.type === "application/json") {
            message.error('下载失败,请检查是否有这个文件！')
            return;
          }
          const blob = new Blob([data])
          downFile(blob, name)
        } catch (error) {
          console.log(error)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <Spin spinning={loading}>
      <div className="download" onClick={download}>
        {
          children()
        }
      </div>
    </Spin>

  );
}

export default Download