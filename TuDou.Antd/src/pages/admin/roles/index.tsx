import AppComponentBase from "@/components/AppComponentBase";
import React, { RefObject } from 'react';
import { Card, Table, Button, Tag, Dropdown, Menu } from "antd";
import styles from './index.less';
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import { ConnectState } from "@/models/connect";
import { AnyAction, Dispatch } from "redux";
import { GetRolesInput } from "@/services/roles/dtos/getRolesInput";
import { RolesModelState } from "@/models/admin/roles";
import CreateOrUpdateRoleModal from './components/createOrUpdateRole'
export interface RolesProps {
  dispatch: Dispatch<AnyAction>;
  roles: RolesModelState;
  loading:boolean;
}
export interface RolesStates {
  request: GetRolesInput;
  createOrUpdateModalVisible:boolean;
  roleId?:number;
}
@connect(({ roles, loading }: ConnectState) => ({
  roles: roles,
  loading: loading.effects['roles/getRoles'],
}))
class Roles extends AppComponentBase<RolesProps, RolesStates> {
  createOrUpdateRoleRef:any = React.createRef();
  state = {
    request: {
        permission:''
    },
    roleId:undefined,
    createOrUpdateModalVisible:false
  }
  componentDidMount() {
    this.getTableData();
  }
  // 获取表格数据
  getTableData() {
    const { dispatch } = this.props;
    dispatch({
      type: 'roles/getRoles',
      payload: this.state.request
    });
  }
  createOrUpdateModalOpen(roleId?:number){
    if(roleId){
      this.setState({
        roleId:roleId
      })
    }
    this.createOrUpdateModal();
  }
  // 打开或关闭Modal
  createOrUpdateModal=()=>{
      this.setState({
        createOrUpdateModalVisible:!this.state.createOrUpdateModalVisible
      })
  }
  public render() {
    const {createOrUpdateModalVisible,roleId} =this.state;
    const {loading} = this.props;
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
                <a href="#" onClick={()=>{this.createOrUpdateModalOpen(record.id)}}>
                  修改
                </a>
              </Menu.Item>
            </Menu>
            } trigger={['click']} placement="bottomLeft">
              <Button icon="setting" type="primary">操作</Button>
            </Dropdown>
          </div>
        }
      },
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, record: any, index: number) => {
            return<div>
           <span> {text}&nbsp;</span>
           {
               record.isStatic?
               <Tag color="#108ee9">系统</Tag>:null
           }
           {
            record.isDefault?
            <Tag color="black">默认</Tag>:null
           }
            </div>
         }
      },
      {
        title: '创建时间',
        dataIndex: 'creationTime',
        key: 'creationTime',
        render: (text: string, record: any, index: number) => {
           return<div>{new Date(text).toLocaleDateString()}</div>
        }
      }

    ];
    return (
      <PageHeaderWrapper
      content="使用角色进行权限分组."
      extraContent={<Button onClick={()=>{this.createOrUpdateModalOpen()}} type="primary" icon="plus">添加角色</Button>}>
        <Card>
          <Table
            bordered
            loading={loading}
            dataSource={roles == undefined ? [] : roles.items}
            pagination={false}
            columns={columns} />
        </Card>
        <CreateOrUpdateRoleModal
        ref={this.createOrUpdateRoleRef}
        visible={createOrUpdateModalVisible}
        onCancel={this.createOrUpdateModal}
        roleId={roleId}/>
      </PageHeaderWrapper>
    )
  }
}
export default Roles;
