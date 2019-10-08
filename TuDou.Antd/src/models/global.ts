import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';
import lodash from 'lodash';
import { NoticeIconData } from '@/components/NoticeIcon';
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
export interface NoticeItem extends NoticeIconData {
  id: string;
  type: string;
  status: string;
}

export interface GlobalModelState {
  collapsed: boolean;
  notices: NoticeItem[];
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
    fetchNotices: Effect;
    clearNotices: Effect;
    changeNoticeReadState: Effect;
    getApplicationSession: Effect;
    initAbp: Effect;
    getRecentUserLoginAttempts: Effect;
    changeRecentUserLoginModalState: Effect;
  };
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    saveNotices: Reducer<GlobalModelState>;
    saveClearedNotices: Reducer<GlobalModelState>;
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
    notices: [],
    application:null,
    loginRecordModal:false,
  },

  effects: {
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount: number = yield select(
        (state: ConnectState) => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
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
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count: number = yield select((state: ConnectState) => state.global.notices.length);
      const unreadCount: number = yield select(
        (state: ConnectState) => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices: NoticeItem[] = yield select((state: ConnectState) =>
        state.global.notices.map(item => {
          const notice = { ...item };
          if (notice.id === payload) {
            notice.read = true;
          }
          return notice;
        }),
      );

      yield put({
        type: 'saveNotices',
        payload: notices,
      });

      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
  },

  reducers: {
    saveRecentUserLoginModalState(state, { payload }): GlobalModelState {
      return {
        collapsed: false,
        ...state,
        notices: state!.notices,
        loginRecordModal:payload
      };
    },
    changeLayoutCollapsed(state = { notices: [], collapsed: true }, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }): GlobalModelState {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },
    saveUserLoginRecents(state, { payload }): GlobalModelState {
      return {
        collapsed: false,
        ...state,
        userLoginRecords:payload,
        notices: state!.notices,
      };
    },
    saveClearedNotices(state = { notices: [], collapsed: true }, { payload }): GlobalModelState {
      return {
        collapsed: false,
        ...state,
        notices: state.notices!.filter((item): boolean => item.type !== payload),
      };
    },
    // 保存session
    saveSessions(state, { payload }):GlobalModelState{
      return {
        collapsed: false,
        ...state,
        notices:[],
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
