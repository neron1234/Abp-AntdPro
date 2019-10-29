import { Reducer } from "redux";
import { Effect } from "dva";
import OrganizationUnitsService from '@/services/organizationunits/organizationunits'
import { ListResultDto } from "@/shared/dtos/listResultDto";
import { OrganizationUnitDto } from "@/services/organizationunits/dtos/organizationUnitDto";
import { PagedResultDto } from "@/shared/dtos/pagedResultDto";
import { OrganizationUnitUserListDto } from "@/services/organizationunits/dtos/organizationUnitUserListDto";
import { OrganizationUnitRoleListDto } from "@/services/organizationunits/dtos/organizationUnitRoleListDto";
import NameValueDto from "@/shared/dtos/nameValueDto";

export interface OrganizationUnitsModalState {
  organizationUnits?: ListResultDto<OrganizationUnitDto>;
  organizationUnitUsers?: PagedResultDto<OrganizationUnitUserListDto>;
  organizationUnitRoles?: PagedResultDto<OrganizationUnitRoleListDto>;
  findUsers?:PagedResultDto<NameValueDto>;
  findRoles?:PagedResultDto<NameValueDto>;
  selectFindUsers?:number[];
  selectFindRoles?:number[]
}
export interface OrganizationUnitsModelType {
  namespace: string;
  state: OrganizationUnitsModalState;
  effects: {
    removeRoleFromOrganizationUnit: Effect;
    removeUserFromOrganizationUnit: Effect;
    addRolesToOrganizationUnit: Effect;
    addUsersToOrganizationUnit: Effect;
    selectFindUsers: Effect;
    selectFindRoles: Effect;
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
    saveRemoveRoleFromOrganizationUnit: Reducer<OrganizationUnitsModalState>;
    saveSelectFindRoles: Reducer<OrganizationUnitsModalState>;
    saveRemoveUserFromOrganizationUnit: Reducer<OrganizationUnitsModalState>;
    saveSelectFindUsers: Reducer<OrganizationUnitsModalState>;
    saveCreateOrganizationUnit: Reducer<OrganizationUnitsModalState>;
    saveDeleteOrganizationUnit: Reducer<OrganizationUnitsModalState>;
    saveOrganizationUnits: Reducer<OrganizationUnitsModalState>;
    saveOrganizationUnitUsers: Reducer<OrganizationUnitsModalState>;
    saveOrganizationUnitRoles: Reducer<OrganizationUnitsModalState>;
    saveUpdateOrganizationUnit: Reducer<OrganizationUnitsModalState>;
    saveFindUsers: Reducer<OrganizationUnitsModalState>;
    saveFindRoles: Reducer<OrganizationUnitsModalState>;
  };
}
const Model: OrganizationUnitsModelType = {
  namespace: 'organizationUnits',
  state: {
    organizationUnits: undefined,
    organizationUnitUsers: undefined,
    organizationUnitRoles: undefined,
    findUsers:undefined,
    findRoles:undefined,
    selectFindUsers:undefined,
  },
  effects: {
    *removeRoleFromOrganizationUnit({ payload }, { call, put }){
      yield call(OrganizationUnitsService.removeRoleFromOrganizationUnit, payload)
      yield put({
        type: 'saveRemoveRoleFromOrganizationUnit',
        payload: payload
      })
    },
    *removeUserFromOrganizationUnit({ payload }, { call, put }){
      yield call(OrganizationUnitsService.removeUserFromOrganizationUnit, payload)
      yield put({
        type: 'saveRemoveUserFromOrganizationUnit',
        payload: payload
      })
    },
    *addRolesToOrganizationUnit({ payload }, { call, put }){
      yield call(OrganizationUnitsService.addRolesToOrganizationUnit, payload)
    },
    *addUsersToOrganizationUnit({ payload }, { call, put }){
        yield call(OrganizationUnitsService.addUsersToOrganizationUnit, payload)

    },
    *selectFindRoles({ payload }, { call, put }){
      yield put({
        type: 'saveSelectFindRoles',
        payload: payload
      })
    },
    *selectFindUsers({ payload }, { call, put }){
      yield put({
        type: 'saveSelectFindUsers',
        payload: payload
      })
    },
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
    saveRemoveUserFromOrganizationUnit(state, { payload }) {
      return ({
        ...state,
        organizationUnitUsers:{
          items:state!.organizationUnitUsers!.items.filter(todo => todo.id !== payload.userId),
          totalCount:state!.organizationUnitUsers!.totalCount-1
        }

      })
    },
    saveRemoveRoleFromOrganizationUnit(state, { payload }) {
      return ({
        ...state,
        organizationUnitRoles:{
          items:state!.organizationUnitRoles!.items.filter(todo => todo.id !== payload.roleId),
          totalCount:state!.organizationUnitRoles!.totalCount-1
        }

      })
    },
    saveSelectFindUsers(state, { payload }) {
      return ({
        ...state,
        selectFindUsers:payload
      })
    },
    saveSelectFindRoles(state, { payload }) {
      return ({
        ...state,
        selectFindUsers:payload
      })
    },
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
