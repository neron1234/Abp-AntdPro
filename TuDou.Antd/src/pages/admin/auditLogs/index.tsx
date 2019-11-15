import AppComponentBase from "@/components/AppComponentBase";
import React from 'react';
import { Card, Table, Button, Tag, Dropdown, Menu, Icon, Tabs } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import { ConnectState } from "@/models/connect";
import { AnyAction, Dispatch } from "redux";
import { AuditLogsModelState } from "@/models/admin/auditLogs";
import { GetAuditLogsInput } from "@/services/auditLog/dtos/getAuditLogsInput";
import moment from "moment";
import { PaginationConfig } from "antd/lib/table";
import AuditLogsDetail from "./components/auditLogsDetail";
import { AuditLogListDto } from '@/services/auditLog/dtos/auditLogListDto';
import { GetEntityChangeInput } from './../../../services/auditLog/dtos/getEntityChangeInput';
import EntityChangeDetail from "./components/entityChangeDetail";
import { EntityChangeListDto } from '@/services/auditLog/dtos/entityChangeListDto';
import { EntityChangeListDto } from './../../../services/auditLog/dtos/entityChangeListDto';
export interface AuditLogsProps {
  dispatch: Dispatch<AnyAction>;
  auditLogs: AuditLogsModelState;
  historyloading: boolean;
  changeloading:boolean;
}
export interface AuditLogsStates {
  auditLogrequest: GetAuditLogsInput;
  entityChangeRequest:GetEntityChangeInput;
  auditLogItem?:AuditLogListDto;
  auditLogsDetailVisible:boolean;
  entityChangeItem?:EntityChangeListDto;
  entityChangeDetailVisible:boolean;
}
@connect(({ auditLogs, loading }: ConnectState) => ({
  auditLogs: auditLogs,
  historyloading: loading.effects['auditLogs/getAuditLogs'],
  changeloading:loading.effects['auditLogs/getAuditLogs'],
}))
class AuditLogs extends AppComponentBase<AuditLogsProps, AuditLogsStates> {
  state = {
    auditLogrequest: {
      startDate: moment().startOf('day').toISOString(),
      endDate: moment().endOf('day').toISOString(),
      userName: "",
      serviceName: "",
      methodName: "",
      browserInfo: "",
      maxResultCount: this.maxResultCount,
      skipCount: this.skipCount
    },
    entityChangeRequest:{
      startDate: moment().startOf('day').toISOString(),
      endDate: moment().endOf('day').toISOString(),
      userName: "",
      maxResultCount: this.maxResultCount,
      skipCount: this.skipCount,
      entityTypeFullName:'',
    },
    entityChangeItem:undefined,
    entityChangeDetailVisible:false,
    auditLogItem:undefined,
    auditLogsDetailVisible:false
  }
  handleTableChange = (pagination: PaginationConfig) => {
    this.setState({
      auditLogrequest: {
        ...this.state.auditLogrequest,
        maxResultCount: pagination.pageSize!,
        skipCount: pagination.current!
      }
    }, () => {
      this.getAuditLogTableData();
    })

  }
 async auditLogsDetailModalOpen(item:AuditLogListDto){
   await this.setState({
      auditLogItem:item
    },()=>{
      this.auditLogsDetailModal();
    })

  }
  async entityChangeDetailModalOpen(entityChangeItem:EntityChangeListDto){
    const {dispatch} =this.props;
    await this.setState({
      entityChangeItem
    })
    await dispatch({
      type: 'auditLogs/getEntityPropertyChanges',
      payload:entityChangeItem.id
    })
    this.entityChangeDetailModal();
   }
  entityChangeDetailModal=()=>{
    this.setState({
      entityChangeDetailVisible:!this.state.entityChangeDetailVisible
    })
  }
  auditLogsDetailModal=()=>{
    this.setState({
      auditLogsDetailVisible:!this.state.auditLogsDetailVisible
    })
  }
  componentDidMount() {
    this.getAuditLogTableData();
  }
  // 获取审计日志表格数据
 async getAuditLogTableData() {
    const { dispatch } = this.props;
   await dispatch({
      type: 'auditLogs/getAuditLogs',
      payload: this.state.auditLogrequest
    });
  }
  // 获取实体历史表格数据
 async getEntityChangeTableData() {
    const { dispatch } = this.props;
    await  dispatch({
      type: 'auditLogs/getEntityChanges',
      payload: this.state.entityChangeRequest
    });
  }
  tabsChange=async (activeKey:string)=>{
      if(activeKey==="auditlog"){
        await  this.getAuditLogTableData();
      }else if(activeKey==="entityChange"){
        await   this.getEntityChangeTableData();
      }

  }
  public render() {
    const { historyloading,changeloading } = this.props;
    const { auditLogs,entityPropertyChanges,entityChanges } = this.props.auditLogs;
    const {entityChangeDetailVisible, auditLogsDetailVisible,auditLogItem,entityChangeItem} =this.state;
    const entityChangeColumns=[
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text: any, record: any, index: number) => {
          return     <Button onClick={ async()=>{await this.entityChangeDetailModalOpen(record)}} icon="search"  type="primary"></Button>

        }
      },
      {
        title: '对象',
        dataIndex: 'entityTypeFullName',
        key: 'entityTypeFullName',
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '修改时间',
        dataIndex: 'changeTime',
        key: 'changeTime',
      }
    ]
    const historyColumns = [
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text: any, record: any, index: number) => {
          return     <Button onClick={ async()=>{await this.auditLogsDetailModalOpen(record)}} icon="search"  type="primary"></Button>

        }
      },
      {
        title: '',
        dataIndex: 'exception',
        width:'50px',
        key: 'exception',
        render: (text: any, record: any, index: number) => {
          return (text == null && text == "") ? null : <div>    <Icon type="check-circle" theme="twoTone" twoToneColor="#1dc9b7" />
          </div>
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
    function showPageTotal(total: number) {
      return `共 ${total} 项`;
    }
    return (
      <PageHeaderWrapper>

        <Card>
          <Tabs defaultActiveKey="auditlog" onChange={this.tabsChange}>
            <Tabs.TabPane key="auditlog" tab="审计日志">
              <Table
                loading={historyloading}
                size="default"
                onChange={this.handleTableChange}
                dataSource={auditLogs == undefined ? [] : auditLogs.items}
                pagination={{ showTotal: showPageTotal, pageSize: this.state.auditLogrequest.maxResultCount, total: auditLogs == undefined ? 0 : auditLogs.totalCount }}
                columns={historyColumns} />
            </Tabs.TabPane>
            <Tabs.TabPane key="entityChange" tab="更改日志">
              <Table
                loading={changeloading}
                size="default"
                onChange={this.handleTableChange}
                dataSource={entityChanges == undefined ? [] : entityChanges.items}
                pagination={{ showTotal: showPageTotal, pageSize: this.state.entityChangeRequest.maxResultCount, total: entityChanges == undefined ? 0 : entityChanges.totalCount }}
                columns={entityChangeColumns} />
            </Tabs.TabPane>
          </Tabs>

        </Card>
        <EntityChangeDetail
        entityChangeItem={entityChangeItem}
        entityPropertyChanges={entityPropertyChanges}
        visible={entityChangeDetailVisible}
        onCancel={this.entityChangeDetailModal}
        />
        <AuditLogsDetail
        auditLogItem={auditLogItem}
        onCancel={this.auditLogsDetailModal}
        visible={auditLogsDetailVisible}/>
      </PageHeaderWrapper>
    )
  }
}
export default AuditLogs;
