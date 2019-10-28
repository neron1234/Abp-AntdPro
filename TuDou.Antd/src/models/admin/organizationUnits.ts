import { Reducer } from "redux";
import { Effect } from "dva";
import OrganizationUnitsService from '@/services/organizationunits/organizationunits'
import { ListResultDto } from "@/shared/dtos/listResultDto";
import { OrganizationUnitDto } from "@/services/organizationunits/dtos/organizationUnitDto";
import { PagedResultDto } from "@/shared/dtos/pagedResultDto";
import { OrganizationUnitUserListDto } from "@/services/organizationunits/dtos/organizationUnitUserListDto";
import { OrganizationUnitRoleListDto } from "@/services/organizationunits/dtos/organizationUnitRoleListDto";
import NameValueDto from "@/shared/dtos/nameValueDto";

export interface OrganizationUnitsStateType {
  organizationUnits?: ListResultDto<OrganizationUnitDto>;
  organizationUnitUsers?: PagedResultDto<OrganizationUnitUserListDto>;
  organizationUnitRoles?: PagedResultDto<OrganizationUnitRoleListDto>;
  findUsers?:PagedResultDto<NameValueDto>;
  findRoles?:PagedResultDto<NameValueDto>;
}
export interface OrganizationUnitsModelType {
  namespace: string;
  state: OrganizationUnitsStateType;
  effects: {
    findUsers: Effect;
    findRoles:Effect;
    getOrganizationUnits: Effect;
    getOrganizationUnitUsers: Effect;
    getOrganizationUnitRoles: Effect;
    deleteOrganizationUnit: Effect;
    createOrganizationUnit:Effect;
    updateOrganizationUnit:Effect;
  };
  reducers: {
    saveCreateOrganizationUnit: Reducer<OrganizationUnitsStateType>;
    saveDeleteOrganizationUnit: Reducer<OrganizationUnitsStateType>;
    saveOrganizationUnits: Reducer<OrganizationUnitsStateType>;
    saveOrganizationUnitUsers: Reducer<OrganizationUnitsStateType>;
    saveOrganizationUnitRoles: Reducer<OrganizationUnitsStateType>;
    saveUpdateOrganizationUnit: Reducer<OrganizationUnitsStateType>;
    saveFindUsers: Reducer<OrganizationUnitsStateType>;
    saveFindRoles: Reducer<OrganizationUnitsStateType>;
  };
}
const Model: OrganizationUnitsModelType = {
  namespace: 'organizationUnits',
  state: {
    organizationUnits: undefined,
    organizationUnitUsers: undefined,
    organizationUnitRoles: undefined,
  },
  effects: {
    *findUsers({ payload }, { call, put }) {
      const response = yield call(OrganizationUnitsService.findUsers, payload)
      yield put({
        type: 'saveFindUsers',
        payload: response.result
      })
    },
    *findRoles({ payload }, { call, put }) {
      const response = yield call(OrganizationUnitsService.findRoles, payload)
      yield put({
        type: 'saveFindRoles',
        payload: response.result
      })
    },
    *getOrganizationUnits({ payload }, { call, put }) {
      const response = yield call(OrganizationUnitsService.getOrganizationUnits, payload)
      yield put({
        type: 'saveOrganizationUnits',
        payload: response.result
      })
    },
    *deleteOrganizationUnit( { payload }, { call,put }) {
      const response = yield call(OrganizationUnitsService.deleteOrganizationUnit, payload)
      if (response.success) {
        yield put({
          type: 'saveDeleteOrganizationUnit',
          payload: payload.id
        })
      }
    },
    *createOrganizationUnit( { payload }, { call,put }) {
      const response = yield call(OrganizationUnitsService.createOrganizationUnit, payload)
      if (response.success) {
        yield put({
          type: 'saveCreateOrganizationUnit',
          payload: response.result
        })
      }
    },
    *updateOrganizationUnit( { payload }, { call,put }) {
      const response = yield call(OrganizationUnitsService.updateOrganizationUnit, payload)
      if (response.success) {
        yield put({
          type: 'saveUpdateOrganizationUnit',
          payload: response.result
        })
      }
    },
    *getOrganizationUnitUsers({ payload }, { call, put }) {
      const response = yield call(OrganizationUnitsService.getOrganizationUnitUsers, payload)
      yield put({
        type: 'saveOrganizationUnitUsers',
        payload: response.result
      })
    },
    *getOrganizationUnitRoles({ payload }, { call, put }) {
      const response = yield call(OrganizationUnitsService.getOrganizationUnitRoles, payload)
      yield put({
        type: 'saveOrganizationUnitRoles',
        payload: response.result
      })
    }
  },
  reducers: {
    saveFindUsers(state, { payload }) {
      return ({
        ...state,
        findUsers:payload
      })
    },
    saveFindRoles(state, { payload }) {
      return ({
        ...state,
        findRoles:payload
      })
    },
    saveUpdateOrganizationUnit(state, { payload }) {
     var organunits = state!.organizationUnits!.items.map(item=>{
        if (item.id === payload.id) {
          return { ...item, ...payload };
        } else {
          return item;
        }
      })
      state!.organizationUnits!.items=organunits
      return ({
        ...state
      })
    },
    saveCreateOrganizationUnit(state, { payload }) {
      state!.organizationUnits!.items=state!.organizationUnits!.items.concat(payload);
      return ({
        ...state,
      })
    },
    saveDeleteOrganizationUnit(state, { payload }) {
      state!.organizationUnits!.items=state!.organizationUnits!.items.filter(t=>t.id!==payload);
      return ({
        ...state,
      })
    },
    // 保存组织机构
    saveOrganizationUnits(state, { payload }) {
      return ({
        ...state,
        organizationUnits: payload
      })
    },
    // 组织机构用户
    saveOrganizationUnitUsers(state, { payload }) {
      return ({
        ...state,
        organizationUnitUsers: payload
      })
    },
    // 组织机构角色
    saveOrganizationUnitRoles(state, { payload }) {
      return ({
        ...state,
        organizationUnitRoles: payload
      })
    }
  }
}
export default Model;
