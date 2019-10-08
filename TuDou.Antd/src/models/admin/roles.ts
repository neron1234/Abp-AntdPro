import { Reducer } from "redux";
import { Effect } from "dva";
import RolesService from '@/services/roles/roles'
import { RoleListDto } from "@/services/roles/dtos/roleListDto";
import { ListResultDto } from "@/shared/dtos/listResultDto";

export interface RolesStateType {
    roles?: ListResultDto<RoleListDto>
}
export interface RolesModelType {
    namespace: string;
    state: RolesStateType;
    effects: {
        getRoles: Effect;
    };
    reducers: {
        saveRoles: Reducer<RolesStateType>;
    };
}
const Model: RolesModelType = {
    namespace: 'roles',
    state: {
        roles: undefined
    },
    effects: {
        *getRoles({ payload }, { call, put }) {
           const response = yield call(RolesService.getRoles,payload)
           yield put({
               type:'saveRoles',
               payload:response.result
           })
        }
    },
    reducers: {
        saveRoles(state, { payload }) {
              return({
                  ...state,
                  roles:payload
              })
        }
    }
}
export default Model;