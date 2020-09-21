import React, { Component } from 'react'
import { Layout, message,Button, Card,Modal} from 'antd'
import {
  PlusOutlined
} from '@ant-design/icons';
import Filter from './Filter'
import TableList from './Table'
import FormComp from './Form'
import fetching from '@/util/fetching'


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
      ReserveLevel: [],
      data:[]
    }
  

  componentDidMount() {
    this.requestList()
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
    let that = this
    fetching('/api/query',{ data: params})
    .then(res => {
      console.log(res)
      if(res && res.code === 200){
        that.setState({data:res.data})
      }
    })
  }



  // 提交
  handleFormSubmit = (values,callback) => {
    fetching('/api/add',{method:'POST', body: values})
    .then(res => {
      if(callback) callback()
      this.handleModalVisible(false)
      console.log(res)
    })
  
  }



  // 编辑
  handEdit = async (values={}) => {
  console.log(values)
  this.handleModalVisible(true,'edit',values)
  }

  
  handleDelete = id => {
    const self = this
    const { dispatch } = this.props
    Modal.confirm({
      title: '确定要删除这个数据吗？',
      content: '删除后，无法恢复。',
      okType: 'danger',
      okText: '删除',
      cancelText: '取消',
      onOk() {
        // dispatch({
        //   type: 'evaluationSystemFillForm/remove',
        //   payload: {
        //     id,
        //   },
        //   callback: () => {
        //     message.success('删除成功')
        //     self.setState({
        //       selectedRows: [],
        //     })
        //     self.handleSearch()
        //   },
        // })
      },
    })
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
    const { modal, ReserveLevel, filterFormValues,data } = this.state

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
              data={data}
              onChange={this.handleStandardTableChange}
              onEdit={this.handEdit}
              onDelete={this.handleDelete}
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