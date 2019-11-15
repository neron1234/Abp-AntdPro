import { Effect } from "dva";
import { Reducer } from "redux";
import NotificationService from '@/services/notification.ts/notification'
import * as _ from 'lodash';
import { FormattedUserNotification, UserNotification } from "@/services/notification.ts/dtos/userNotification";
import UserNotificationHelper from "@/shared/helpers/UserNotificationHelper";



export interface NotificationModelState {
  unreadCount?: number;
  notifications?: FormattedUserNotification[];
}
export interface NotificationModelType {
  namespace: string;
  state: NotificationModelState;
  effects: {
    getUserNotifications: Effect;
    setNotificationAsRead: Effect;
    setAllNotificationsAsRead: Effect;
  };
  reducers: {
    saveUserNotifications: Reducer<NotificationModelState>
  };
}
const Model: NotificationModelType = {
  namespace: 'notification',
  state: {
    unreadCount: 0,
    notifications: undefined,
  },
  effects: {
    *getUserNotifications({ payload }, { call, put }) {
      const response = yield call(NotificationService.getUserNotifications);
      let notifications:FormattedUserNotification[]= [];
      _.forEach(response.result.items, (item: UserNotification) => {
        notifications.push(UserNotificationHelper.format(<any>item));
      });

      yield put({
        type:'saveUserNotifications',
        payload:{
          notifications:notifications,
          unreadCount:response.result.unreadCount,
        }
      })
    },
    *setNotificationAsRead({ payload }, { call, put }) {
        yield call(NotificationService.setNotificationAsRead,payload);
    },
    *setAllNotificationsAsRead(_, { call, put }) {
      yield call(NotificationService.setAllNotificationsAsRead);
    }

  },
  reducers: {
    saveUserNotifications(state, { payload }) {
      return {
        notifications: payload.notifications,
        unreadCount:payload.unreadCount,
      }
    }
  }
}
export default Model;
