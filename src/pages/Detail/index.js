

import React, { useEffect, useState } from 'react'
import {
  useLocation,
} from "react-router-dom";
import DataList from '@/md'
import Markdown from '@/components/Markdown'

const Index = () => {
  const [width, setIsWidth] = useState(true)
  useEffect(() => {
    if (document.body.clientWidth > 800) {
      setIsWidth(true)
    } else setIsWidth(false)

  }, [])

  let Params = useLocation();

  if(!Params.state){
    return <h3 style={{padding:50,textAlign:'center'}}>暂无数据</h3>
  }

  const obj = DataList.find(i => i.id === Params.state.id)

  const numbers = parseInt(Math.random() * 9) + 1
  // console.log(Params,numbers)

  return (
    <div className="detailBox">
      {
        width ?
          <div className={`haderTitle`} style={{ backgroundImage: `url(/img/${numbers}.jpg)` }}>
            <div className="titleBox">
              <h1 className="title">{obj.title}</h1>
              <div>
                <time className="time">{obj.time}</time>
              </div>
              <span className="type">{obj.type}</span>
            </div>

          </div>
          :
          <div className={`haderTitle2`}>
            <h1 className="title">{obj.title}</h1>
            <div>
              <time className="time">{obj.time}</time>
            </div>
            <span className="type">{obj.type}</span>
          </div>}
      <div className="detail">
        <article>
          {/* <div dangerouslySetInnerHTML={{ __html: obj.text }}></div> */}
          <Markdown md={obj.text} />
        </article>
      </div>
    </div>
  )
}

export default Index
