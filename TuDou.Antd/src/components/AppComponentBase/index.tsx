import * as React from 'react';
import AppConst from '@/lib/appconst'
import { L, isGranted } from '../../lib/abpUtility';

class AppComponentBase<P = {}, S = {}, SS = any> extends React.Component<P, S, SS> {
  protected readonly maxResultCount:number= AppConst.defaultPageSize;
  protected readonly skipCount:number= AppConst.defaultPageIndex;
  L(key: string, sourceName?: string): string {
    return L(key);
  }

  isGranted(permissionName: string): boolean {
    return isGranted(permissionName);
  }
}

export default AppComponentBase;
