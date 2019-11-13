import AppComponentBase from "@/components/AppComponentBase";
import React from 'react';
import { Card, Table, Button, Tag, Dropdown, Menu, Icon } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import { ConnectState } from "@/models/connect";
import { AnyAction, Dispatch } from "redux";
import { AuditLogsStateType } from "@/models/admin/auditLogs";
import { GetAuditLogsInput } from "@/services/auditLog/dtos/getAuditLogsInput";
import moment from "moment";
export interface AuditLogsProps {
  dispatch: Dispatch<AnyAction>;
  auditLogs: AuditLogsStateType;
  loading:boolean;
}
export interface AuditLogsStates {
     request:GetAuditLogsInput
}
@connect(({ auditLogs, loading }: ConnectState) => ({
    auditLogs: auditLogs,
    loading: loading.effects['auditLogs/getAuditLogs'],
}))
class AuditLogs extends AppComponentBase<AuditLogsProps, AuditLogsStates> {
  state={
      request:{
        startDate:moment().startOf('day').toISOString(),
        endDate:  moment().endOf('day').toISOString(),
        userName:"",
        serviceName:"",
        methodName:"",
        browserInfo:"",
        maxResultCount:this.maxResultCount,
        skipCount:this.skipCount
      }
  }
  componentDidMount() {
    this.getTableData();
  }
  // 获取表格数据
  getTableData() {
    const { dispatch } = this.props;
    dispatch({
      type: 'auditLogs/getAuditLogs',
      payload:this.state.request
    });
  }
  public render() {
    const {loading} = this.props;
    const { auditLogs } = this.props.auditLogs;
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
              <Button icon="setting" type="primary">操作<Icon type="down" /></Button>
            </Dropdown>
          </div>
        }
      },
      {
        title: '',
        dataIndex: 'exception',
        key: 'exception',
        render: (text: any, record: any, index: number) => {
            return (text==null&&text=="")?null:<div><Icon  type="check"/></div>
          }
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '服务',
        dataIndex: 'serviceName',
        key: 'serviceName',
      },
      {
        title: '操作',
        dataIndex: 'methodName',
        key: 'methodName',
      },
      {
        title: '持续时间',
        dataIndex: 'executionDuration',
        key: 'executionDuration',
      },
      {
        title: 'IP地址',
        dataIndex: 'clientIpAddress',
        key: 'clientIpAddress',
      },
      {
        title: '客户端',
        dataIndex: 'clientName',
        key: 'clientName',
      }

    ];
    return (
      <PageHeaderWrapper >
        <Card>
          <Table
           loading={loading}
           size="small"
            dataSource={auditLogs == undefined ? [] : auditLogs.items}
            pagination={false}
            columns={columns} />
        </Card>
      </PageHeaderWrapper>
    )
  }
}
export default AuditLogs;
