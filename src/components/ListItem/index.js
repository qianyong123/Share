

import React from 'react'
import {
  useHistory,
} from "react-router-dom";
import './index.less'


const Index = ({item:{id, type, time, title }}) => {
  let history = useHistory();

  const onClick = () => {
    history.push(`/Detail?id=${id}`,{id})
  }

  return (
    <div className="homeItem" onClick={onClick}>
      <div className="homeHaderTitle">
        <time className="time">{time}</time>
        <span className="type">{type}</span>
      </div>
      <h2 className="text">{title}</h2>
    </div>
  )
}

export default Index
