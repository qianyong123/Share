
import React, { useState, useEffect } from 'react';

function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(`You clicked ${count} times`)
  });

  // useEffect(() => {
  //   // 组件第一次渲染时或者state和props有更新时执行
  //   const time = setInterval(()=>{
  //     console.log('倒计时')
  //   },1000)
  //   return () => {
  //     // 组件卸载时执行这个函数，清除倒计时
  //     clearInterval(time)
  //   };
  // },[props.id]);// 仅在 props.id 发生变化时，重新订阅

  return null;
} 


export default FriendStatusWithCounter