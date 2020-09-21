import React from 'react'
import { Table, Icon, Dropdown, Menu, Button, Tooltip } from 'antd';
import {
  DownOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

// const data = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     title: `EdrwardLondon Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no. ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }

//   scroll={{ x: 'max-content' }}
function TableList(props) {

  const {
    onChange,
    onEdit,
    onDelete,
    data
  } = props
  console.log(data)
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
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
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
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      render: text => (
        <div>{ text}</div>
      ),
    },
    {
      title: '技术分类',
      dataIndex: 'classify',
      key: 'classify',
      align: 'center',
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
          overlay={
            <Menu>

              <Menu.Item onClick={() => onEdit(record)}>
                <EditOutlined style={{ color: ' #eb5055' }} />
                  编辑
                </Menu.Item>
              <Menu.Item onClick={() => onDelete(record)}>
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
      onChange={onChange}
      rowKey="id"
      // scroll={{ x: 'max-content', y: 400 }}
      size="middle"
    />
  )
}

export default TableList


