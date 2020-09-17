import React, { Component } from 'react'
import { Layout, message,Button, Card } from 'antd'
import {
  PlusOutlined
} from '@ant-design/icons';
import Filter from './Filter'
import TableList from './Table'
import FormComp from './Form'



/**
 *@Date:2020/4/23
 *@Features: 预警监测页面
 */
class IndexClassification extends Component {

 

    state = {
      // selectedRows: selectedIds,
      modal: {
        item: {},
        modalType: 'new',
        modalVisible: false,
      },
      filterFormValues: {},
      ReserveLevel: [
      
      ]
    }
  

  componentDidMount() {
    const { filterFormValues } = this.state
  }

  requestBasicsGrade = () => { // 获取评分
    const { dispatch } = this.props
  
  }

  handleModalVisible = (visible = {}, type, data, target) => {
    const modalProps =
      typeof visible === 'boolean'
        ? {
          modalVisible: visible,
          modalType: type,
          item: data,
          modalTarget: target,
        }
        : { ...visible }

    const { modalVisible, modalType, item, modalTarget = 'modal' } = modalProps

    this.setState(() => ({
      [`${modalTarget}`]: {
        modalVisible: modalVisible || false,
        modalType: modalType || 'new',
        item: item || {},
      },
    }))
  }

  handleSearch = (values = {}) => {
    this.setState({
      filterFormValues: values,
    })

    this.requestList(values)
  }

  // 重置
  handleFormReset = () => {
    const filterFormValues = {
    }
    this.setState({
      filterFormValues
    })
    this.requestList(filterFormValues)
  }

  requestList = (params = {}) => {
    const { dispatch } = this.props
 
  }



  // 提交
  handleFormSubmit = (id,values) => {
    
  
  }



  // 编辑
  handEdit = async ({ id, state }) => {
  

  }

 

  disposeGrade = (item) => {
    const table = []
    const { targetNameList = [], targetSortType, score } = item
    targetNameList.forEach((item2) => {
      const examContentList = item2.examContentList || []
      examContentList.forEach((item3, index3) => {
        const obj = {
          targetSortType: `${targetSortType} (${score})`,
          targetName: `${item2.targetName} (${item2.score})`,
          examContent: `${item3.examContent}`,
          score: `${item3.score}`,
        }
        if (index3 === 0) obj.len2 = examContentList.length
        table.push(obj)
      })
    })

    if (table.length > 0) table[0].len = table.length
    return table
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { filterFormValues } = this.state

    const params = {
      pageNum: (pagination.current - 1) * pagination.pageSize,
      current: pagination.current,
      pageSize: pagination.pageSize,
   
    }
    console.log(params)
    // this.requestList(params)
  }

  render() {
    const { modal, ReserveLevel, filterFormValues } = this.state
    const {
      listLoading,
      data=[],
    } = this.props

    return (
      <div>
        <Layout>
          <Card bordered={false} style={{ marginBottom: 20 }}>
            <Filter
              resetForm={this.handleFormReset}
              onSearch={this.handleSearch}
              ReserveLevel={ReserveLevel}
              filterFormValues={filterFormValues}
            />
          </Card>
          <Card bordered={false}>
            <div style={{ marginBottom: 5 }}>
              <span>共有<b>{ 0}</b>条信息，共<b>0</b>页</span>
              <Button
                icon={<PlusOutlined />}
                onClick={() => this.handleModalVisible(true)}
                style={{ background: '#ee9800', color: '#fff', float: 'right', marginBottom: 20 }}
              >
                添加
              </Button>
            </div>
            <TableList
              selectedMode={false}
              selectedRows={false}
              rowSelection={false}
              loading={listLoading}
              data={data}
              onChange={this.handleStandardTableChange}
              onEdit={this.handEdit}
            />
          </Card>
        </Layout>

        <FormComp // 新建&编辑Modal
          title={modal.modalType === 'edit' ? '编辑' : '添加'}
          {...modal}
          onCancelClick={() => this.handleModalVisible(false)}
          submitForm={this.handleFormSubmit}
        />



      </div>)
  }
}

export default IndexClassification