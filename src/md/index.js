import linuxNodeJs from './Liunx系统安装nodejs和环境配置.md'
import GitOrder from './Git常用命令.md'
import CssCenter from './Css垂直居中.md'
import JsCopy from './JavaScript深拷贝和浅拷贝.md'
import LinuxOrder from './Linux和Nginx常用操作命令.md'
import Md from './md常用语法.md'
const DateList = [
  {
    id:'1',
    type:"Git",
    time:"2020-09-07",
    classify:'rest',
    title:"Git的常用命令",
    text:GitOrder
    ,
  },
  {
    id:'2',
    type:"HtmlCss",
    time:"2020-09-07",
    classify:'css',
    title:"Css实现元素垂直居中显示的7种方式",
    text:CssCenter,
  },
  {
    id:'3',
    type:"JavaScript",
    time:"2020-09-07",
    classify:'js',
    title:"浅谈JavaScript深拷贝和浅拷贝",
    text:JsCopy,
  },
  {
    id:'4',
    type:"Linux",
    time:"2020-09-08",
    classify:'rest',
    title:"Linux和Nginx 常用操作命令",
    text:LinuxOrder,
  },
  {
    id:'5',
    type:"Linux",
    time:"2020-09-09",
    classify:'rest',
    title:"Liunx系统安装nodejs和环境配置",
    text:linuxNodeJs,
  },
  {
    id:'6',
    type:"Md",
    time:"2020-09-10",
    classify:'rest',
    title:"md常用语法",
    text:Md,
  },
]

export default DateList 