import { AnyAction, Dispatch } from 'redux';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes } from 'umi';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { UserModelState } from './user';
import { LoginModelType } from './login';
import { UsersModelType } from './admin/users';
import { RolesModelType, RolesModelState } from './admin/roles';
import { OrganizationUnitsModelType, OrganizationUnitsModelState } from './admin/organizationUnits';
import { LanguagesModelType, LanguagesModelState } from './admin/languages';
import { AuditLogsModelType, AuditLogsModelState } from './admin/auditLogs';
import { PermissionModelType, PermissionModelState } from './permission';
import { OrganizationUnitTreeModelState } from './organizationUnitTree';
import { LoginState } from '@/pages/account/login';
import { NotificationModelState } from './notification';
export { GlobalModelState, SettingModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
    users?:boolean;
    roles?:boolean;
    organizationUnits?:boolean;
    languages?:boolean;
    auditLogs?:boolean;
    permissions?:boolean;
    organizationUnitTree?:boolean;
    notification?:boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
  users:UserModelState;
  roles:RolesModelState;
  login: LoginState;
  organizationUnits: OrganizationUnitsModelState;
  languages: LanguagesModelState;
  auditLogs:AuditLogsModelState;
  permissions:PermissionModelState;
  notification:NotificationModelState;
  organizationUnitTree:OrganizationUnitTreeModelState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch<AnyAction>;
}
