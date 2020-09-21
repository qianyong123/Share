

import React, { useEffect, useState } from 'react'
import {
  useLocation
} from "react-router-dom";
import { Row, Col, Pagination } from 'antd';
import ListItem from '@/components/ListItem'
import
DataList,
{
  HtmlCssList,
  JsList,
  ReactList,
  VueList,
  RestList
}
  from '@/md'

  const { xs, sm, md, lg, xl, xxl } = {
    xs: { span: 24, offset: 0 }, //<576px
    sm: { span: 12, offset: 0 }, //≥576px
    md: { span: 12, offset: 0 }, //≥768
    lg: { span: 8, offset: 0 }, //≥992px
    xl: { span: 6, offset: 0 }, //≥1200px
    xxl: { span: 6, offset: 0 }, //≥1600px
  }
const Index = () => {
 
  const [List, SetList] = useState([])
  const [pageNumber, setpageNumber] = useState(1)
  const [pageSize, setpageSize] = useState(10)


  const location = useLocation()

  useEffect(() => {
    let DataList2 = []
    switch (location.pathname) {
      case '/JavaScript':
        DataList2 = JsList;
        break;
      case '/HtmlCss':
        DataList2 = HtmlCssList;
        break;
      case '/Vue':
        DataList2 = VueList;
        break;
      case '/React':
        DataList2 = ReactList;
        break;
      case '/Rest':
        DataList2 = RestList;
        break;
      default:
        DataList2 = DataList
    }
    DataList2 = DataList2.sort((a, b) => {
      return a.time < b.time ? 1 : -1
    })
    SetList(DataList2)
  }, [location])


  // console.log(location.pathname)
  function onChange(pageNumber,pageSize) {
    console.log('Page: ', pageNumber,pageSize);
    setpageNumber(pageNumber)
    setpageSize(pageSize)
  }

  return (
    <div className="home">
      <Row>
        {
          List.length < 1
            ?
            <h3 className="noneData">暂无数据</h3>
            :
            List.map(item => {
              return (
                <Col key={item.id} xs={xs} sm={sm} md={md} lg={lg} xl={xl} xxl={xxl}>
                  <ListItem item={item} />
                </Col>
              )
            })
        }
      </Row>
      <Pagination
        style={{ padding:"40px 20px",}}
        current={pageNumber}
        pageSize={pageSize}
        total={50}
        showSizeChanger
        onChange={onChange}
      />
    </div>
  );
}


export default Index
