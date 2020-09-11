

// import React, { PureComponent } from "react";
// import PropTypes from "prop-types";
// import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// // 设置高亮样式
// import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
// // 设置高亮的语言
// import { jsx, javascript, less } from "react-syntax-highlighter/dist/esm/languages/prism";

// class CodeBlock extends PureComponent {
//   static propTypes = {
//     value: PropTypes.string.isRequired,
//     language: PropTypes.string
//   };

//   static defaultProps = {
//     language: null
//   };

//   componentWillMount() {
//     // 注册要高亮的语法，
//     // 注意：如果不设置打包后供第三方使用是不起作用的
//     SyntaxHighlighter.registerLanguage("jsx", jsx);
//     SyntaxHighlighter.registerLanguage("less", less);

//     SyntaxHighlighter.registerLanguage("javascript", javascript);
//   }

//   render() {
//     const { language, value } = this.props;
//     return (
//       <figure className="highlight">
//         <SyntaxHighlighter language={language} style={coy}>
//           {value}
//         </SyntaxHighlighter>
//       </figure>
//     );
//   }
// }

// // export default CodeBlock;

import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs'; //我这边使用的是夜晚模式的css，你也可以在react-syntax-highlighter/dist/esm/styles/hljs里面找你自己喜欢的css，把名字替换就行 eg：

function CodeBlock({ value }) {
  return (<SyntaxHighlighter language="" style={tomorrowNightEighties}>
    {value}
  </SyntaxHighlighter>);
}


export default CodeBlock;

