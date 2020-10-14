
import React, { useState, useEffect } from 'react';
import Logo from '@/components/SVG'


function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(`You clicked ${count} times`)
  });



  return (
    <div>
        {Logo()}
    </div>
  )
} 


export default FriendStatusWithCounter