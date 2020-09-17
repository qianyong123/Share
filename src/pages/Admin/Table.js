import React from 'react'
import { Table, Icon, Dropdown, Menu, Button } from 'antd';
import {
  DownOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

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
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
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

            <Menu.Item>
              <EditOutlined style={{color:' #eb5055'}} />
                编辑
              </Menu.Item>
            <Menu.Item>
              <DeleteOutlined style={{color:' #eb5055'}} />
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

const data = [];

for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

//   scroll={{ x: 'max-content' }}
function TableList(props) {

  const {onChange} = props
  return (
    <Table
     columns={columns} 
     dataSource={data} 
     onChange={onChange}
     scroll={{ x: 1500, y: 300 }}
     size="middle"
    />
  )
}

export default TableList


