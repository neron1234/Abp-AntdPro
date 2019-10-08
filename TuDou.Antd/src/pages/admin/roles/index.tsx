import AppComponentBase from "@/components/AppComponentBase";
import React from 'react';
import { Card, Table, Button, Tag, Dropdown, Menu } from "antd";
import styles from './index.less';
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import { ConnectState } from "@/models/connect";
import { AnyAction, Dispatch } from "redux";
import { GetRolesInput } from "@/services/roles/dtos/getRolesInput";
import { RolesStateType } from "@/models/admin/roles";
export interface RolesProps {
  dispatch: Dispatch<AnyAction>;
  roles: RolesStateType;
  loading:boolean;
}
export interface RolesStates {
  request: GetRolesInput
}
@connect(({ roles, loading }: ConnectState) => ({
  roles: roles,
  loading: loading.effects['roles/getRoles'],
}))
class Roles extends AppComponentBase<RolesProps, RolesStates> {
  state = {
    request: {
        permission:''
    }
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
  public render() {
    const {loading} = this.props;
    const { roles } = this.props.roles;
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            修改
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
      <PageHeaderWrapper >
        <Card>
          <Table
           loading={loading}
            bordered
            dataSource={roles == undefined ? [] : roles.items}
            pagination={false}
            columns={columns} />
        </Card>
      </PageHeaderWrapper>
    )
  }
}
export default Roles;