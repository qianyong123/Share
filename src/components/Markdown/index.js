
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import CodeBlock from './CodeBlock'
// import {  linuxNodeJs,GitOrder,CssCenter } from '@/md'

const Index = ({ md }) => {
  const [value, setValue] = useState()
  useEffect(() => {
    console.log(md)
    if (md) {
      const url = require(`@/md/${md}`)
      fetch(url)
        .then(res => res.text())
        .then(text => {
          setValue(text)
        }
        )
    }

  }, [md])
  return (
    <ReactMarkdown
      source={value}
      // escapeHtml={false}
      renderers={{
        code: CodeBlock,
        // // heading: HeadingBlock
      }}
    />
  )
}

export default Index
