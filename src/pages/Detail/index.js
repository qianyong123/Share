

import React, { useEffect, useState } from 'react'
import {
  useLocation,
  useParams
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
  let ids = Params.search.indexOf('?id')
  // console.log(Params,ids)
  if(ids === -1){
    return <h3 style={{padding:50,textAlign:'center'}}>暂无数据</h3>
  }

  let id = Params.search.slice(ids).split('=')[1]


  const obj = DataList.find(i => i.id === id)

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
