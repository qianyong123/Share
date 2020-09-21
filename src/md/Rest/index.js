
import Git1  from './Git常用命令.md'
import Linux1  from './Linux和Nginx常用操作命令.md'
import linuxNode1  from './Liunx系统安装nodejs和环境配置.md'
import Md1  from './md常用语法.md'
import Mysql from './Linux系统上安装mysql.md'

const RestList = [
  {
    id:`2020090702`,
    type:"Git",
    time:"2020-09-07",
    classify:'rest',
    title:"Git的常用命令",
    text:Git1
    ,
  },
  {
    id:`2020090801`,
    type:"Linux",
    time:"2020-09-08",
    classify:'rest',
    title:"Linux和Nginx 常用操作命令",
    text:Linux1,
  },
  {
    id:`2020090901`,
    type:"Linux",
    time:"2020-09-09",
    classify:'rest',
    title:"Liunx系统安装nodejs和环境配置",
    text:linuxNode1,
  },
  {
    id:`2020091001`,
    type:"Md",
    time:"2020-09-10",
    classify:'rest',
    title:"md常用语法",
    text:Md1,
  },
  {
    id:`2020091601`,
    type:"Mysql",
    time:"2020-09-16",
    classify:'rest',
    title:"Linux系统上安装 mysql数据库",
    text:Mysql,
  },
]

export default RestList