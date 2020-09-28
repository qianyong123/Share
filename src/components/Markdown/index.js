
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import CodeBlock from './CodeBlock'
// import {  linuxNodeJs,GitOrder,CssCenter } from '@/md'

const Index = ({ md,classify }) => {
  const [value, setValue] = useState()
  // useEffect(() => {
  //   if (md) {
  //     // const url = require(`@/md/${classify}/${md}`)
  //     // const url = require(`server/${md}`)

  //     fetch(md)
  //       .then(res => res.text())
  //       .then(text => {
  //         setValue(text)
  //       }
  //       )
  //   }

  // }, [md])
  return (
    <ReactMarkdown
      source={md}
      escapeHtml={false}
      renderers={{
        code: CodeBlock,
        // // heading: HeadingBlock
      }}
    />
  )
}

export default Index
