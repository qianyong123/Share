import React from 'react'
import { Table, Icon, Dropdown, Menu, Button, Tooltip, Typography } from 'antd';
import {
  DownOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import './index.less'

const { Paragraph } = Typography;
function TableList(props) {

  const {
    onChange,
    onEdit,
    onDelete,
    data,
    total,
    loadingList = false,
    username
  } = props

  const pagination = {
    total,
    showSizeChanger: true,
    onChange: onChange
  }
  const columns = [
    {
      title: '序号',
      key: 'number',
      className: 'no-wrap text-center plus-btn',
      fixed: 'left',
      width: 50,
      align: 'center',
      enableInSelectMode: true,
      render: (text, record, index) => index + 1,
    },

    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: title => (
        <Tooltip placement="topLeft" title={title}>
          {title}
          {/* <Paragraph style={{ width: 150,}} ellipsis>{title}</Paragraph> */}
        </Tooltip>
      ),
    },
    {
      title: '技术类型',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
    },
    {
      title: '技术分类',
      dataIndex: 'classify',
      key: 'classify',
      align: 'center',
    },

    {
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      render: text => (
        <div>{text}</div>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      align: 'center',
      fixed: 'right',
      width: 100,
      className: 'tableActions',
      render: (text, record) => (
        <Dropdown
        disabled={!username}
          overlay={
            <Menu>

              <Menu.Item onClick={() => onEdit(record.id)}>
                <EditOutlined style={{ color: ' #eb5055' }} />
                  编辑
                </Menu.Item>
              <Menu.Item onClick={() => onDelete(record.id)}>
                <DeleteOutlined style={{ color: ' #eb5055' }} />
                  删除
                </Menu.Item>

            </Menu>
          }
        >
          <Button type="link" size="small">
            操作
            <DownOutlined />
          </Button>
        </Dropdown>
      ),
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      // scroll={{ x: 'max-content' }}
       scroll={{ x: 800 }}

      size="middle"
      pagination={pagination}
      loading={loadingList}
    />
  )
}

export default TableList


