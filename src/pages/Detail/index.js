

import React, { useEffect, useState } from 'react'
import {
  useLocation,
} from "react-router-dom";
import { DataList } from '@/components/Data'


const Index = () => {
  const [width, setIsWidth] = useState(true)
  let Params = useLocation();

  const obj = DataList.find(i => i.id === Params.state.id)
  useEffect(() => {
    if (document.body.clientWidth > 800) {
      setIsWidth(true)
    } else setIsWidth(false)

  }, [])

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
          <div dangerouslySetInnerHTML={{ __html: obj.text }}></div>
        </article>
      </div>
    </div>
  )
}

export default Index
