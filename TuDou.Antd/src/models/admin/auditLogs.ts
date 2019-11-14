
import { Effect } from "dva";
import { Reducer } from "redux";
import AuditLogsService from '@/services/auditLog/auditLog'
import { PagedResultDto } from "@/shared/dtos/pagedResultDto";
import { AuditLogListDto } from "@/services/auditLog/dtos/auditLogListDto";
import { EntityChangeListDto } from "@/services/auditLog/dtos/entityChangeListDto";
import { EntityPropertyChangeDto } from "@/services/auditLog/dtos/entityPropertyChangeDto";
export interface AuditLogsModelState {
  auditLogs?: PagedResultDto<AuditLogListDto>;
  entityChanges?: PagedResultDto<EntityChangeListDto>;
  entityPropertyChanges?: EntityPropertyChangeDto[];
}
export interface AuditLogsModelType {
  namespace: string;
  state: AuditLogsModelState;
  effects: {
    getAuditLogs: Effect;
    getEntityChanges: Effect;
    getEntityPropertyChanges: Effect;
  };
  reducers: {
    saveAuditLogs: Reducer<AuditLogsModelState>;
    saveEntityChanges: Reducer<AuditLogsModelState>;
    saveEntityPropertyChanges: Reducer<AuditLogsModelState>;
  };
}
const Model: AuditLogsModelType = {
  namespace: 'auditLogs',
  state: {
    auditLogs: undefined,
    entityChanges: undefined,
    entityPropertyChanges: undefined
  },
  effects: {
    *getAuditLogs({ payload }, { call, put }) {
      const response = yield call(AuditLogsService.getAuditLogs, payload)
      yield put({
        type: 'saveAuditLogs',
        payload: response.result
      })
    },
    *getEntityChanges({ payload }, { call, put }) {
      const response = yield call(AuditLogsService.getEntityChanges, payload)
      yield put({
        type: 'saveEntityChanges',
        payload: response.result
      })
    },
    *getEntityPropertyChanges({ payload }, { call, put }) {
      const response = yield call(AuditLogsService.getEntityPropertyChanges, payload)
      yield put({
        type: 'saveEntityPropertyChanges',
        payload:response.result
      })
    }
  },
  reducers: {
    saveAuditLogs(state, { payload }) {
      return {
        ...state,
        auditLogs: payload
      }
    },
    saveEntityChanges(state, { payload }) {
      return {
        ...state,
        entityChanges: payload
      }
    },
    saveEntityPropertyChanges(state, { payload }) {
      return {
        ...state,
        entityPropertyChanges: payload
      }
    }
  }
}
export default Model;
