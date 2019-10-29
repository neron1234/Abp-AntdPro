
import { Effect } from "dva";
import { Reducer } from "redux";
import AuditLogsService from '@/services/auditLog/auditLog'
import { PagedResultDto } from "@/shared/dtos/pagedResultDto";
import { AuditLogListDto } from "@/services/auditLog/dtos/auditLogListDto";
export interface AuditLogsModelState {
   auditLogs?:PagedResultDto<AuditLogListDto>
}
export interface AuditLogsModelType {
    namespace: string;
    state: AuditLogsModelState;
    effects: {
        getAuditLogs:Effect
    };
    reducers: {
         saveAuditLogs:Reducer<AuditLogsModelState>
    };
}
const Model: AuditLogsModelType = {
    namespace: 'auditLogs',
    state: {
        auditLogs:undefined
    },
    effects: {
        *getAuditLogs({payload}, { call, put }) {
             const response = yield call (AuditLogsService.getAuditLogs,payload)
             yield put({
                 type:'saveAuditLogs',
                 payload:response.result
             })
        }
    },
    reducers: {
        saveAuditLogs(state,{payload}){
            return{
                ...state,
                auditLogs:payload
            }
        }
    }
}
export default Model;
