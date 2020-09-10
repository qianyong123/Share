import 'braft-editor/dist/index.css'
import React, { useState, useEffect } from 'react'
import BraftEditor from 'braft-editor'
import { Form, Input, Button } from 'antd'
import { DataList } from '../../components/Data'



function BasicDemo(props) {
  const [value, setValue] = useState(BraftEditor.createEditorState())


  useEffect(() => {
    let objText = DataList.find(t => t.id === '0')
    objText && setValue(BraftEditor.createEditorState(objText.text))
    
  }, [])

  const {
    placeholder = '请输入',
  } = props

  const handleChange = (v) => {
    setValue(v)
  }

  const hooks = {
    'toggle-text-color': (v) => {
      return { v }
    }
  }

  //代码实现
  function copyContent() {
    let content = value.toHTML()

    console.log(content)
    //获取要赋值的input的元素
    var inputElement = document.getElementById("copy_content");
    //给input框赋值
    inputElement.value = content;
    //选中input框的内容
    inputElement.select();
    // 执行浏览器复制命令
    document.execCommand("Copy");
    //提示已复制
    console.log('已复制');

  }
  

  return (
    <Form style={{ background: '#fff' }}>

      <BraftEditor
        value={value}
        className="my-editor"
        // controls={controls}
        onChange={handleChange}
        placeholder={placeholder}
        style={{ border: '1px solid #ccc' }}
        contentStyle={{ height: "500px", }}
        hooks={hooks}
      />
      <Input disabled id="copy_content"></Input>
      <Button onClick={copyContent}>复制内容</Button>
      <div className="contens" style={{ padding: 20, width: "100%", height: 'auto', overflowX: 'auto' }} dangerouslySetInnerHTML={{ __html: value.toHTML() }} />
    </Form>
  )
}

export const BraftEditorCreate = (v) => BraftEditor.createEditorState(v)

export default BasicDemo