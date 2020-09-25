import React, { Component } from 'react'
import { Layout, message, Button, Card, Modal } from 'antd'
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
    data: [],
    total: 0,
    classList: [],
    loadingList:false
  }


  componentDidMount() {
    this.requestList()
    this.getClassify()
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
        modalType: modalType || '',
        item: item || {},
      },
    }))
  }

  handleSearch = (values) => {
    this.setState({
      filterFormValues: values || {},
    })

    this.requestList(values)
  }

  // 重置
  handleFormReset = () => {
    const filterFormValues = {}
    this.setState({
      filterFormValues
    })
    this.requestList(filterFormValues)
  }

  requestList = (params) => {
    const { filterFormValues } = this.state
    const data = {
      pageNumber:1,
      pageSize:10,
      ...(params || filterFormValues)
    }
    let that = this
    fetching('/api/admin/query', { data})
      .then(res => {
        if (res && res.code === 200) {
          that.setState({
            data: res.data,
            total: res.total
          })
        }
      })
  }

  // 获取分类
  getClassify = () => {
    let that = this
    fetching('/api/admin/ClassifyList')
      .then(res => {
        if (res && res.code === 200) {
          that.setState({ classList: res.data })
        }
      })
  }




  // 提交
  handleFormSubmit = (values) => {
    const {modal:{modalType}} = this.state
    const url = modalType === 'new' ? '/api/admin/add': `/api/admin/update`
    fetching(url, { method: 'POST', body: values })
      .then(res => {
        if (res && res.code === 200) {
          this.handleModalVisible(false)
          message.success('操作成功')
          this.requestList()
        }
      })

  }



  // 编辑
  handEdit = async (id) => {
    fetching('/api/admin/detail', { data: { id } })
      .then(res => {
        if (res && res.data) {
          this.handleModalVisible(true,'edit',res.data[0])
        }
      })
  }

  handleDelete = id => {
    const self = this

    Modal.confirm({
      title: '确定要删除这个数据吗？',
      content: '删除后，无法恢复。',
      okType: 'danger',
      okText: '删除',
      cancelText: '取消',
      onOk() {
        fetching('/api/admin/deleteData', { data: { id } })
        .then(res => {
          if (res.data) {
            message.success('删除成功')
            self.handleSearch()
          }
        })
      },
    })
  }

  handleStandardTableChange = (pageNumber, pageSize) => {
    const { filterFormValues } = this.state

    const params = {
      pageNumber,
      pageSize,
    }
    this.requestList({ ...filterFormValues, ...params })
  }



  render() {
    const { modal, filterFormValues, data, classList, total } = this.state

    return (
      <div>
        <Layout>
          <Card bordered={false} style={{ marginBottom: 20 }}>
            <Filter
              resetForm={this.handleFormReset}
              onSearch={this.handleSearch}
              filterFormValues={filterFormValues}
              classList={classList}
            />
          </Card>
          <Card bordered={false}>
            <div style={{ marginBottom: 5 }}>
              <span>共有<b>{total}</b>条信息</span>
              <Button
                icon={<PlusOutlined />}
                onClick={() => this.handleModalVisible(true,'new',{})}
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
              total={total}
            />
          </Card>
        </Layout>

        <FormComp // 新建&编辑Modal
          title={modal.modalType === 'edit' ? '编辑' : '添加'}
          {...modal}
          onCancelClick={() => this.handleModalVisible(false)}
          submitForm={this.handleFormSubmit}
          classList={classList}
        />



      </div>)
  }
}

export default IndexClassification