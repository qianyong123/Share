import React from 'react';
import loadable from './util/loadable'

const Home = loadable(() => import('./pages/Home'))
const Note = loadable(() => import('./pages/Note'))
const Detail = loadable(() => import('./pages/Detail'))
const UploadText = loadable(() => import('./pages/UploadText'))
const Admin = loadable(() => import('./pages/Admin'))


const Error = loadable(() => import('./pages/Error'))


// 跳转到二级子路由不能有exact
 const router = [
  {
    path: '/',
    name: '首页',
    exact:true,
    component:<Home />,
    hide:true
  },
  {
    path: '/Home',
    name: '首页',
    component:<Home />,
    children:[
      {
        path: '/home',
        name: '首页',
        component:<Home />,
      },
     
    ]
  },

  {
    path: '/Admin',
    name: 'Admin',
    hide:true,
    component:<Admin />,
  },
  {
    path: '/note',
    name: 'note',
    hide:true,
    component:<Note />,
  },
  {
    path: '/JavaScript',
    name: 'JavaScript',
    component:<Home />,
  },
  {
    path: '/HtmlCss',
    name: 'HtmlCss',
    component:<Home />,
  },
  {
    path: '/Vue',
    name: 'Vue',
    component:<Home />,
  },
  {
    path: '/React',
    name: 'React',
    component:<Home />,
  },
  {
    path: '/Rest',
    name: '杂类技术',
    component:<Home />,
  },
  {
    path: '/Detail',
    name: 'detail',
    hide:true,
    component:<Detail />,
  },

  {
    path: '/uploadText',
    name: '上传文章',
    hide:true,
    component:<UploadText />,
  },
  {
    path: '/error',
    name: '404',
     hide:true,
    component:<Error />,
  },
]

export default router