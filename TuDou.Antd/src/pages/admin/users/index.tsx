import AppComponentBase from "@/components/AppComponentBase";
import React from 'react';
import { Card, Table, Button, Tag, Dropdown, Menu, Icon } from "antd";
import styles from './index.less';
import * as _ from 'lodash';
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import { ConnectState } from "@/models/connect";
import { AnyAction, Dispatch } from "redux";
import { GetUsersInput } from "@/services/users/dtos/getUsersInput";
import { UsersStateType } from "@/models/admin/users";
import { PaginationConfig } from "antd/lib/table";
import CreateOrUpdateUser from "./components/createOrUpdateUser";
import { EntityDto } from './../../../shared/dtos/entityDto';
import { OrganizationUnitTreeModelState } from './../../../models/organizationUnitTree';
export interface UsersProps {
  dispatch: Dispatch<AnyAction>;
  users: UsersStateType;
  organizationUnitTree:OrganizationUnitTreeModelState;
  loading: boolean;
}
export interface UsersStates {
  request: GetUsersInput;
  userId: number | null;
  createOrUpdateModalVisible: boolean;
}
@connect(({ users,organizationUnitTree, loading }: ConnectState) => ({
  users: users,
  organizationUnitTree:organizationUnitTree,
  loading: loading.effects['users/getUsers'],
}))
class Users extends AppComponentBase<UsersProps, UsersStates> {
  modalRef: any = React.createRef();
  state = {
    request: {
      filter: '',
      permission: '',
      onlyLockedUsers: false,
      maxResultCount: 10,
      skipCount: 0,
    },
    userId: null,
    createOrUpdateModalVisible: false
  }
  async componentDidMount() {
    await this.getTableData();
  }
  // 获取表格数据
  async getTableData() {
    const { dispatch } = this.props;
    await dispatch({
      type: 'users/getUsers',
      payload: this.state.request
    });
  }
  // modal 确认按钮处理
  createOrUpdateModalOkHandler = () => {
    const { validateFields } = this.modalRef.current!;
    validateFields((errors:any, values:any) => {
       if(!errors){
         const {dispatch} = this.props;
         const user={
          id:this.state.userId,
          ...values,
         };
         delete user.roles;
         dispatch({
           type:"users/createOrUpdateUser",
           payload:{
             user:user,
             assignedRoleNames:values.roles,
             organizationUnits:this.props.organizationUnitTree.selectedOrganizationUnits
           }
         })
       }
    });
    this.createOrUpdateModal();
    this.notity.success({
      message:'操作成功!'
    })
  }
  async createOrUpdateModalOpen(userId: number | null) {
    await this.setState({
      userId
    });
    const { dispatch } = this.props;
    await dispatch({
      type: 'users/getUserForEdit',
      payload: {
        id: userId
      }
    });
    const { setFieldsValue } = this.modalRef.current!;
    await setFieldsValue({
      ...this.props.users.editUser!.user,
      roles: _.map(_.filter(this.props.users.editUser!.roles, 'isAssigned'), "roleName")
    })

    const {memberedOrganizationUnits,allOrganizationUnits} = this.props.users.editUser!;
    const selectOrganizationUnits=_.filter(allOrganizationUnits,function(o) { return memberedOrganizationUnits!.includes(o.code); })
    await dispatch({
      type:'organizationUnitTree/selectOrganizationUnits',
      payload:_.map(selectOrganizationUnits,'id')
    })

    this.createOrUpdateModal();
  }
  // 打开或关闭modal
  createOrUpdateModal = () => {
    this.setState({
      createOrUpdateModalVisible: !this.state.createOrUpdateModalVisible
    })
  }
  handleTableChange=(pagination: PaginationConfig)=>{
    this.setState({
      request: {
        ...this.state.request,
        maxResultCount: pagination.pageSize!,
        skipCount: pagination.current!
      }
    }, () => {
      this.getTableData();
    })

  }
  async deleteUser(input: EntityDto) {
    const { dispatch } = this.props;
    await dispatch({
      type: 'users/deleteUser',
      payload: input
    })
    this.notity.success({
      message: '操作成功!',
      description: '删除用户成功!'
    })
  }
  async unlockUser(input: EntityDto) {
    const { dispatch } = this.props;
    await dispatch({
      type: 'users/unlockUser',
      payload: input
    })
    await this.getTableData();
    this.notity.success({
      message: '操作成功!',
      description: '解锁用户成功!'
    })
  }
  public render() {
    const { loading } = this.props;
    const { users, editUser } = this.props.users;
    const { createOrUpdateModalVisible, userId } = this.state;
    const columns = [
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text: any, record: any, index: number) => {
          return <div>
            <Dropdown overlay={
              <Menu>
                <Menu.Item>
                  <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                    使用这个用户登录
                </a>
                </Menu.Item>
                <Menu.Item onClick={() => { this.createOrUpdateModalOpen(record.id) }}>
                  修改
              </Menu.Item>
                <Menu.Item>

                  权限
              </Menu.Item>
                <Menu.Item onClick={async () => { await this.unlockUser({ id: record.id }) }}>
                  解锁
              </Menu.Item>
                <Menu.Item onClick={async () => { await this.deleteUser({ id: record.id }) }}>
                删除
                </Menu.Item>
              </Menu>
            } trigger={['click']} placement="bottomLeft">

              <Button icon="setting" type="primary">操作<Icon type="down" /></Button>
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
    function showPageTotal(total: number) {
      return `共 ${total} 项`;
    }
    return (
      <PageHeaderWrapper
        content="管理用户及权限."
        extraContent={<Button onClick={() => { this.createOrUpdateModalOpen(null) }} type="primary" icon="plus">添加用户</Button>}>
        <Card>
          <Table
            loading={loading}
            bordered
            onChange={this.handleTableChange}

            dataSource={users == undefined ? [] : users.items}
            pagination={{ showTotal: showPageTotal, pageSize: this.state.request.maxResultCount, total: users == undefined ? 0 : users.totalCount }}
            columns={columns} />
        </Card>
        <CreateOrUpdateUser
          ref={this.modalRef}
          userId={userId}
          roles={editUser == undefined ? [] : editUser.roles}
          onOk={this.createOrUpdateModalOkHandler}
          visible={createOrUpdateModalVisible}
          onCancel={this.createOrUpdateModal} />
      </PageHeaderWrapper>
    )
  }
}
export default Users;
