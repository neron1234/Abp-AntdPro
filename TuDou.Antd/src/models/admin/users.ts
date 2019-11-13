import { Reducer } from "redux";
import { Effect } from "dva";
import { UserListDto } from "@/services/users/dtos/userListDto";
import UsersAppService from '@/services/users/users'
import { PagedResultDto } from "@/shared/dtos/pagedResultDto";
import { GetUserForEditOutput } from "@/services/users/dtos/getUserForEditOutput";

export interface UsersStateType {
    users?: PagedResultDto<UserListDto>;
    editUser?:GetUserForEditOutput;
}
export interface UsersModelType {
    namespace: string;
    state: UsersStateType;
    effects: {
        getUsers: Effect;
        getUserForEdit: Effect;
        unlockUser: Effect;
        createOrUpdateUser: Effect;
        deleteUser: Effect;
    };
    reducers: {
        saveUsers: Reducer<UsersStateType>;
        saveEditUser: Reducer<UsersStateType>;
        saveDeleteUser: Reducer<UsersStateType>;
    };
}
const Model: UsersModelType = {
    namespace: 'users',
    state: {
        users: undefined,
        editUser:undefined
    },
    effects: {
        *getUsers({ payload }, { call, put }) {
           const response = yield call(UsersAppService.getUsers,payload)
           yield put({
               type:'saveUsers',
               payload:response.result
           })
        },
        *getUserForEdit({ payload }, { call, put }) {
          const response = yield call(UsersAppService.getUserForEdit,payload)
           yield put({
            type:'saveEditUser',
            payload:response.result
          })
        },
        *unlockUser({ payload }, { call, put }) {
           yield call(UsersAppService.UnlockUser,payload)
        },
        *deleteUser({ payload }, { call, put }) {
            yield call(UsersAppService.DeleteUser,payload)

       },
        *createOrUpdateUser({ payload }, { call, put }) {
           yield call(UsersAppService.CreateOrUpdateUser,payload)
       },
    },
    reducers: {
        saveUsers(state, { payload }) {
              return({
                  ...state,
                  users:payload
              })
        },
        saveEditUser(state, { payload }) {
          return({
            ...state,
            editUser:payload
          })
        },
        saveDeleteUser(state, { payload }) {
          const {users} = state!;
          users!.items=users!.items.filter(todo => todo.id !== payload);
          users!.totalCount-=1;
          return({
            ...state,
             users
          })
        }
    }
}
export default Model;
