import { Reducer } from "redux";
import { Effect } from "dva";
import { UserListDto } from "@/services/users/dtos/userListDto";
import UsersAppService from '@/services/users/users'
import { PagedResultDto } from "@/shared/dtos/pagedResultDto";

export interface UsersStateType {
    users?: PagedResultDto<UserListDto>
}
export interface UsersModelType {
    namespace: string;
    state: UsersStateType;
    effects: {
        getUsers: Effect;
    };
    reducers: {
        saveUsers: Reducer<UsersStateType>;
    };
}
const Model: UsersModelType = {
    namespace: 'users',
    state: {
        users: undefined
    },
    effects: {
        *getUsers({ payload }, { call, put }) {
           const response = yield call(UsersAppService.getUsers,payload)
           yield put({
               type:'saveUsers',
               payload:response.result
           })
        }
    },
    reducers: {
        saveUsers(state, { payload }) {
              return({
                  ...state,
                  users:payload
              })
        }
    }
}
export default Model;