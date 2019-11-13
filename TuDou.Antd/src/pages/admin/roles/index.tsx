import AppComponentBase from "@/components/AppComponentBase";
import React from 'react';
import { Card, Table, Button, Tag, Dropdown, Menu, Icon } from "antd";
import styles from './index.less';
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import { ConnectState } from "@/models/connect";
import { AnyAction, Dispatch } from "redux";
import { GetRolesInput } from "@/services/roles/dtos/getRolesInput";
import { RolesModelState } from "@/models/admin/roles";
import CreateOrUpdateRoleModal from './components/createOrUpdateRole'
import { PermissionModelState } from "@/models/permission";
export interface RolesProps {
  dispatch: Dispatch<AnyAction>;
  roles: RolesModelState;
  permissions: PermissionModelState
  loading: boolean;
}
export interface RolesStates {
  request: GetRolesInput;
  createOrUpdateModalVisible: boolean;
  roleId: number | null;
}
@connect(({ roles, permissions, loading }: ConnectState) => ({
  roles: roles,
  permissions: permissions,
  loading: loading.effects['roles/getRoles'],
}))
class Roles extends AppComponentBase<RolesProps, RolesStates> {
  createOrUpdateRoleRef: any = React.createRef();
  state = {
    request: {
      permission: ''
    },
    roleId: null,
    createOrUpdateModalVisible: false
  }
  async componentDidMount() {
    await this.getTableData();
  }
  // 获取表格数据
  async getTableData() {
    const { dispatch } = this.props;
    await dispatch({
      type: 'roles/getRoles',
      payload: this.state.request
    });
  }
  // modal 确认按钮处理
  createOrUpdateModalOkHandler = () => {
    const { validateFields } = this.createOrUpdateRoleRef.current;
    validateFields(async (errors: any, values: any) => {
      if (!errors) {
        const { dispatch } = this.props;
        await dispatch({
          type: "roles/createOrUpdateRole",
          payload: {
            grantedPermissionNames: this.props.permissions.selectedPermissionsName,
            role: {
              ...values,
              id: this.state.roleId
            }
          }
        })
        await this.getTableData();
        this.createOrUpdateModal();
      }
    })
  }
  // 打开modal
  async createOrUpdateModalOpen(roleId: number | null = null) {
    const { dispatch } = this.props;
    const { setFieldsValue } = this.createOrUpdateRoleRef.current;
    await dispatch({
      type: "roles/getRoleForEdit",
      payload: {
        id: roleId
      }
    })
    setFieldsValue({
      ...this.props.roles.editRole!.role
    })
    await dispatch({
      type: "permissions/selectPermissionsTree",
      payload: this.props.roles.editRole!.grantedPermissionNames
    })


    this.setState({
      roleId: roleId
    })
    await this.createOrUpdateModal();
  }
  // 打开或关闭Modal
  createOrUpdateModal = async () => {
    await this.setState({
      createOrUpdateModalVisible: !this.state.createOrUpdateModalVisible
    })
  }
  public render() {
    const { createOrUpdateModalVisible, roleId } = this.state;
    const { loading } = this.props;
    const { roles } = this.props.roles;
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
                  <a href="#" onClick={() => { this.createOrUpdateModalOpen(record.id) }}>
                    修改
                </a>
                </Menu.Item>
              </Menu>
            } trigger={['click']} placement="bottomLeft">
              <Button icon="setting" type="primary">操作<Icon type="down" /></Button>
            </Dropdown>
          </div>
        }
      },
      {
        title: '角色名称',
        dataIndex: 'displayName',
        key: 'displayName',
        render: (text: string, record: any, index: number) => {
          return <div>
            <span> {text}&nbsp;</span>
            {
              record.isStatic ?
                <Tag color="#108ee9">系统</Tag> : null
            }
            {
              record.isDefault ?
                <Tag color="black">默认</Tag> : null
            }
          </div>
        }
      },
      {
        title: '创建时间',
        dataIndex: 'creationTime',
        key: 'creationTime',
        render: (text: string, record: any, index: number) => {
          return <div>{new Date(text).toLocaleDateString()}</div>
        }
      }

    ];
    return (
      <PageHeaderWrapper
        content="使用角色进行权限分组."
        extraContent={<Button onClick={() => { this.createOrUpdateModalOpen() }} type="primary" icon="plus">添加角色</Button>}>
        <Card>
          <Table
            bordered
            loading={loading}
            dataSource={roles == undefined ? [] : roles.items}
            pagination={false}
            columns={columns} />
        </Card>
        <CreateOrUpdateRoleModal
          onOk={this.createOrUpdateModalOkHandler}
          ref={this.createOrUpdateRoleRef}
          visible={createOrUpdateModalVisible}
          onCancel={this.createOrUpdateModal}
          roleId={roleId} />
      </PageHeaderWrapper>
    )
  }
}
export default Roles;
