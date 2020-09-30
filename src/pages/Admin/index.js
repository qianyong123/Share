import React, { Component } from 'react'
import { Layout, message, Button, Card, Modal, Spin } from 'antd'
import {
  PlusOutlined
} from '@ant-design/icons';
import Filter from './Filter'
import TableList from './Table'
import FormComp from './Form'
import Login from './Login'
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
    modalLogin: false,
    filterFormValues: {},
    data: [],
    total: 0,
    classList: [],
    loadingList: false,
    username: null,
    loding: false
  }


  componentDidMount() {
    this.requestList()
    this.getClassify()
    const username = localStorage.getItem('username')
    this.setState({
      username
    })
   
  }

  setLoding = (loding) => {
    this.setState({ loding })
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
      pageNumber: 1,
      pageSize: 10,
      ...(params || filterFormValues)
    }
    let that = this
    this.setLoding(true)
    fetching('/api/admin/query', { data })
      .then(res => {
        that.setLoding(false)
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
    const { modal: { modalType } } = this.state
    const url = modalType === 'new' ? '/api/admin/add' : `/api/admin/update`
    this.setLoding(true)
    fetching(url, { method: 'POST', body: values })
      .then(res => {
        this.setLoding(false)
        if (res && res.code === 200) {
          this.handleModalVisible(false)
          message.success('操作成功', 2)
          this.requestList()
        }
      })

  }



  // 编辑
  handEdit = async (id) => {
    fetching('/api/admin/detail', { data: { id, admin: "admin" } })
      .then(res => {
        if (res && res.data) {
          this.handleModalVisible(true, 'edit', res.data[0])
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

  handleModalLogin = () => {
    this.setState((state) => {
      return { modalLogin: !state.modalLogin }
    })
  }



  handleLoginSubmit = (values) => {
    fetching('/api/admin/login', { method: 'POST', body: values })
      .then(res => {

        if (res && res.code === 200) {
          message.success('登录成功', 2)
          this.handleModalLogin()
          localStorage.setItem('username', res.data[0].username)
          this.setState({
            username: res.data[0].username
          })
        }
      })
  }

  removeLogin = () => {
    this.setState({
      username: null
    })
    localStorage.removeItem('username')
  }

  render() {
    const { modal, filterFormValues, data, classList, total, modalLogin, username, loding } = this.state

    return (
      <Spin spinning={loding}>
        <Layout>

          <Card bordered={false} style={{ marginBottom: 20 }}>
            <Filter
              resetForm={this.handleFormReset}
              onSearch={this.handleSearch}
              filterFormValues={filterFormValues}
              classList={classList}
              username={username}
              removeLogin={this.removeLogin}
              onLogin={() => this.handleModalLogin(true)}
            />

          </Card>
          <Card bordered={false}>
            <div style={{ marginBottom: 5 }}>
              <span>共有<b>{total}</b>条信息</span>

              <Button
                disabled={!username}
                icon={<PlusOutlined />}
                onClick={() => this.handleModalVisible(true, 'new', {})}
                style={{ float: 'right', marginBottom: 20 }}
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
              username={username}
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
        <Login // 登录
          title='登录'
          modalLogin={modalLogin}
          onCancelClick={() => this.handleModalLogin(false)}
          submitForm={this.handleLoginSubmit}
        />


      </Spin>)
  }
}

export default IndexClassification