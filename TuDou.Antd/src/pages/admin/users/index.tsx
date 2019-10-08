import AppComponentBase from "@/components/AppComponentBase";
import React from 'react';
import { Card, Table, Button, Tag, Dropdown, Menu } from "antd";
import styles from './index.less';
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import { ConnectState } from "@/models/connect";
import { AnyAction, Dispatch } from "redux";
import { GetUsersInput } from "@/services/users/dtos/getUsersInput";
import { UsersStateType } from "@/models/admin/users";
export interface UsersProps {
  dispatch: Dispatch<AnyAction>;
  users: UsersStateType;
  loading:boolean;
}
export interface UsersStates {
  request: GetUsersInput
}
@connect(({ users, loading }: ConnectState) => ({
  users: users,
  loading: loading.effects['users/getUsers'],
}))
class Users extends AppComponentBase<UsersProps, UsersStates> {
  state = {
    request: {
      filter: '',
      permission: '',
      onlyLockedUsers: false,
      maxResultCount: 10,
      skipCount: 0,
    }
  }
  componentDidMount() {
    this.getTableData();
  }
  // 获取表格数据
  getTableData() {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/getUsers',
      payload: this.state.request
    });
  }
  public render() {
    const {loading} = this.props;
    const { users } = this.props.users;
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            使用这个用户登录
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            修改
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            权限
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            解锁
        </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            删除
      </a>
        </Menu.Item>
      </Menu>
    );
    const columns = [
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text: any, record: any, index: number) => {
          return <div>
            <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">

              <Button icon="setting" type="primary">操作</Button>
            </Dropdown>
          </div>
        }
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '名字',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '姓氏',
        dataIndex: 'surname',
        key: 'surname',
      },
      {
        title: '角色',
        dataIndex: 'roles',
        key: 'roles',
        render: (text: any, record: any, index: number) => {
          return <div>{text[0].roleName}</div>
        }
      },
      {
        title: '邮箱地址',
        dataIndex: 'emailAddress',
        key: 'emailAddress',
      },
      {
        title: '邮箱地址确认',
        dataIndex: 'isEmailConfirmed',
        key: 'isEmailConfirmed',
        render: (text: any, record: any, index: number) => {
          return <div>{text ? <Tag color="#108ee9">是</Tag> : <Tag color="#f50">否</Tag>}</div>
        }
      },
    ];
    return (
      <PageHeaderWrapper >
        <Card>
          <Table
           loading={loading}
            bordered
            dataSource={users == undefined ? [] : users.items}
            pagination={{ pageSize: this.state.request.maxResultCount, total: users == undefined ? 0 : users.totalCount }}
            columns={columns} />
        </Card>
      </PageHeaderWrapper>
    )
  }
}
export default Users;