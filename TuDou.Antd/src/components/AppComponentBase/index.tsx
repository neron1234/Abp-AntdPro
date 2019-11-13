import * as React from 'react';
import AppConst from '@/lib/appconst'
import { L, isGranted } from '../../lib/abpUtility';
import { notification,message } from 'antd';
import { NotificationApi } from 'antd/lib/notification';
import { MessageApi } from 'antd/lib/message';

class AppComponentBase<P = {}, S = {}, SS = any> extends React.Component<P, S, SS> {
  protected readonly maxResultCount:number= AppConst.defaultPageSize;
  protected readonly skipCount:number= AppConst.defaultPageIndex;
  // 全局提示
  protected readonly message:MessageApi=message;
  //通知
  protected readonly notity: NotificationApi=notification;

  L(key: string, sourceName?: string): string {
    return L(key);
  }

  isGranted(permissionName: string): boolean {
    return isGranted(permissionName);
  }
}

export default AppComponentBase;
