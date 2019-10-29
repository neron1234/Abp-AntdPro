import { AnyAction, Dispatch } from 'redux';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes } from 'umi';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { UserModelState } from './user';
import { LoginModelType, StateType } from './login';
import { UsersModelType } from './admin/users';
import { RolesModelType, RolesModelState } from './admin/roles';
import { OrganizationUnitsModelType, OrganizationUnitsStateType } from './admin/organizationUnits';
import { LanguagesModelType, LanguagesStateType } from './admin/languages';
import { AuditLogsModelType, AuditLogsStateType } from './admin/auditLogs';
import { PermissionModelType, PermissionModelState } from './permission';
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
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
  users:UserModelState;
  roles:RolesModelState;
  login: StateType;
  organizationUnits: OrganizationUnitsStateType;
  languages: LanguagesStateType;
  auditLogs:AuditLogsStateType;
  permissions:PermissionModelState
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
