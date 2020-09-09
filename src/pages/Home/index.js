

import React from 'react'
import {
  useLocation
} from "react-router-dom";
import { Row, Col } from 'antd';
import ListItem from '@/components/ListItem'
import { DataList } from '@/components/Data'

const Index = () => {
  const { xs, sm, md, lg, xl, xxl } = {
    xs: { span: 24, offset: 0 }, //<576px
    sm: { span: 12, offset: 0 }, //≥576px
    md: { span: 12, offset: 0 }, //≥768
    lg: { span: 8, offset: 0 }, //≥992px
    xl: { span: 6, offset: 0 }, //≥1200px
    xxl: { span: 6, offset: 0 }, //≥1600px
  }
  const location = useLocation()
  let DataList2 = []

  switch (location.pathname) {
    case '/js':
      DataList2 = DataList.filter(i => i.classify === 'js');
      break;
    case '/css':
      DataList2 = DataList.filter(i => i.classify === 'css');
      break;
    case '/vue':
      DataList2 = DataList.filter(i => i.classify === 'vue');
      break;
    case '/react':
      DataList2 = DataList.filter(i => i.classify === 'react');
      break;
    case '/rest':
      DataList2 = DataList.filter(i => i.classify === 'rest');
      break;
    default:
      DataList2 = DataList
  }
  // console.log(location.pathname)

  return (
    <div className="home">
      <Row>
        {
          DataList2.length < 1
            ?
            <h3 className="noneData">暂无数据</h3>
            :
            DataList2.map(item => {
              return (
                <Col key={item.id} xs={xs} sm={sm} md={md} lg={lg} xl={xl} xxl={xxl}>
                  <ListItem item={item} />
                </Col>
              )
            })
        }
      </Row>
    </div>
  );
}


export default Index
