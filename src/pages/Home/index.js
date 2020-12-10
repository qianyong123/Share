

import React, { useEffect, useState } from 'react'
import {
  useLocation
} from "react-router-dom";
import { Row, Col, Pagination, Spin,Layout } from 'antd';
import ListItem from '@/components/ListItem'
import fetching from '@/util/fetching'
import Headers from '@/components/Header'
import Footers from '@/components/Footer'
const { Footer, Content } = Layout;

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
  const [total, setTotal] = useState(0)
  const [loding, setLoding] = useState(false)


  const location = useLocation()
  const path = location.pathname === '/' || location.pathname === '/Home' ? '' : location.pathname.replace('/', '')
  useEffect(() => {
    fetchList(1, 10)
  }, [location])

  function onChange(number, Size) {
    console.log('Page: ', number, Size);
    setpageNumber(number)
    setpageSize(Size)
    fetchList(number, Size)
  }

  const fetchList = (number, Size) => {
    setLoding(true)
    fetching('/api/admin/query', {
      data: {
        classify: path,
        pageNumber: number,
        pageSize: Size
      }
    })
      .then(res => {
        setLoding(false)
        if (res && res.data) {
          SetList(res.data)
          setTotal(res.total)
        }
      })
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Headers />
      <Content className="Content">
        <Spin spinning={loding}>
          <div className="home">
            <Row className="rowList">
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
            {
              total > 10 &&
              <Pagination
                style={{ padding: "40px 20px", }}
                current={pageNumber}
                pageSize={pageSize}
                total={total}
                showSizeChanger
                onChange={onChange}
              />
            }

          </div>
        </Spin>
      </Content>
      <Footer>
        <Footers />
      </Footer>
    </Layout>

  );
}


export default Index
