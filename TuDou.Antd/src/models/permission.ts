import { Effect } from 'dva';
import { Reducer } from 'redux';
import { ListResultDto } from '@/shared/dtos/listResultDto';
import { FlatPermissionWithLevelDto } from '@/services/permission/dtos/flatPermissionWithLevelDto';
import PermissionService from '@/services/permission/permission';
export interface PermissionModelState {
   allPermissions?:ListResultDto<FlatPermissionWithLevelDto>
}

export interface PermissionModelType {
  namespace: 'permissions';
  state: PermissionModelState;
  effects: {
    getAllPermissions:Effect
  };
  reducers: {
    saveAllPermissions: Reducer<PermissionModelState>;
  };
}

const PermissionModel: PermissionModelType = {
  namespace: 'permissions',
  state: {
    allPermissions: undefined
  },

  effects: {
    *getAllPermissions({ payload }, { call, put }) {
        const response= yield call(PermissionService.getAllPermissions,payload)

        yield put({
          type:'saveAllPermissions',
          payload:response.result
        })

    }
  },

  reducers: {
    saveAllPermissions(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        allPermissions:payload
      }
    }
  },
};

export default PermissionModel;
