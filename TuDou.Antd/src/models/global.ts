import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';
import lodash from 'lodash';
import { queryNotices } from '@/services/user';
import { ConnectState } from './connect.d';
import { UserLoginInfoDto } from '@/shared/dtos/appSession/userLoginInfoDto';
import { TenantLoginInfoDto } from '@/shared/dtos/appSession/tenantLoginInfoDto';
import { ApplicationInfoDto } from '@/shared/dtos/appSession/applicationInfoDto';
import { getCurrentLoginInformations } from "@/services/session/session";
import {getAll } from '@/services/abpUserConfiguration';
import getCurrentClockProvider from '@/shared/helpers/ClockProvider';
import moment from 'moment';
import { ListResultDto } from '@/shared/dtos/listResultDto';
import { UserLoginAttemptDto } from '@/services/userLogin/dtos/userLoginAttemptDto';
import UserLoginService from '@/services/userLogin/userLogin';
import { LocaleMappingService } from '@/shared/helpers/LocaleMappingService';
export interface GlobalModelState {
  collapsed: boolean;
  user?: UserLoginInfoDto;
  tenant?: TenantLoginInfoDto;
  application?: ApplicationInfoDto|null;
  loginRecordModal?:boolean;
  userLoginRecords?:ListResultDto<UserLoginAttemptDto>;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    getApplicationSession: Effect;
    initAbp: Effect;
    getRecentUserLoginAttempts: Effect;
    changeRecentUserLoginModalState: Effect;
  };
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    saveSessions: Reducer<GlobalModelState>;
    saveUserLoginRecents: Reducer<GlobalModelState>;
    saveRecentUserLoginModalState: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
    application:null,
    loginRecordModal:false,
  },

  effects: {
    *initAbp(_, { call, put }){
      const response= yield call(getAll);
      let result = response.result;
      lodash.merge(abp, result);
      abp.clock.provider = getCurrentClockProvider(result.clock.provider);
      moment.locale(new LocaleMappingService().map('moment', abp.localization.currentLanguage.name));
      if (abp.clock.provider.supportsMultipleTimezone) {
          (moment as any).tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
          (window as any).moment.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
      }
      abp.event.trigger('abp.dynamicScriptsInitialized');
    },
    *getApplicationSession(_, { call, put }){
      const sessionResponse = yield call(getCurrentLoginInformations);
      yield put({
        type: 'saveSessions',
        payload: sessionResponse.result,
      });
    },
    *changeRecentUserLoginModalState({payload}, { call, put }){
      yield put({
        type: 'getRecentUserLoginAttempts',
      });
      yield put({
        type: 'saveRecentUserLoginModalState',
        payload: payload
      });
    },
    *getRecentUserLoginAttempts(_, { call, put }){
      const response = yield call(UserLoginService.getRecentUserLoginAttempts);
      yield put({
        type: 'saveUserLoginRecents',
        payload: response.result,
      });
    },
  },

  reducers: {
    saveRecentUserLoginModalState(state, { payload }): GlobalModelState {
      return {
        collapsed: false,
        ...state,
        loginRecordModal:payload
      };
    },
    changeLayoutCollapsed(state = {  collapsed: true }, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveUserLoginRecents(state, { payload }): GlobalModelState {
      return {
        collapsed: false,
        ...state,
        userLoginRecords:payload,
      };
    },
    // 保存session
    saveSessions(state, { payload }):GlobalModelState{
      return {
        collapsed: false,
        ...state,
        application:payload.application,
        user:payload.user,
        tenant:payload.tenant
      };
    }
  },

  subscriptions: {
    setup({ history }): void {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }): void => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;
