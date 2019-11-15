import AppComponentBase from "@/components/AppComponentBase";
import React from "react";
import { Card, Button, Table, Tag, Icon, Divider } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import { ConnectState } from "@/models/connect";
import  moment from "moment";
import {  FormattedUserNotification } from "@/services/notification.ts/dtos/userNotification";

export interface INotificationProps{
  notifications?:FormattedUserNotification[];
  loading:boolean;
}
@connect(({ notification, loading }: ConnectState) => ({
  notifications: notification.notifications,
  loading: loading.effects['notification/getUserNotifications'],
}))
class Notification extends AppComponentBase<INotificationProps> {
  formatNotification(record: any): string {
    return abp.utils.truncateStringWithPostfix(record, 120);
  }
  fromNow(date: string): string {
    return moment(date).fromNow();
  }
  render() {
    const {notifications,loading}=this.props;
    const columns = [{
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: any, index: number) => {
        return <div>
        <Button  shape="circle" icon="check" type="primary"></Button>
        &nbsp;
        <Button  shape="circle" icon="close" type="danger"></Button>
        </div>
      }
    }, {
      title: '内容',
      dataIndex: 'text',
      key: 'text',
      render: (text: string, record: any, index: number) => {
        return <div>{this.formatNotification(text)}</div>
      }
    }, {
      title: '创建时间',
      dataIndex: 'creationTime',
      key: 'creationTime',
      render: (text: string, record: any, index: number) => {
        return <div>{this.fromNow(text)}</div>
      }
    }]
    return (
      <PageHeaderWrapper
        content="通知."
        extraContent={<Button icon="check" type="primary">设置所有为已读</Button>}>
        <Card>
          <Table
          bordered
          size="default"
          dataSource={notifications}
          loading={loading}
          columns={columns}
          />
        </Card>
      </PageHeaderWrapper>
    )
  }
}
export default Notification;
