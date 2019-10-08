import { Reducer } from "redux";
import { Effect } from "dva";
import OrganizationUnitsService from '@/services/organizationunits/organizationunits'
import { ListResultDto } from "@/shared/dtos/listResultDto";
import { OrganizationUnitDto } from "@/services/organizationunits/dtos/organizationUnitDto";
import { PagedResultDto } from "@/shared/dtos/pagedResultDto";
import { OrganizationUnitUserListDto } from "@/services/organizationunits/dtos/organizationUnitUserListDto";
import { OrganizationUnitRoleListDto } from "@/services/organizationunits/dtos/organizationUnitRoleListDto";

export interface OrganizationUnitsStateType {
    organizationUnits?: ListResultDto<OrganizationUnitDto>;
    organizationUnitUsers?:PagedResultDto<OrganizationUnitUserListDto>;
    organizationUnitRoles?:PagedResultDto<OrganizationUnitRoleListDto>;
}
export interface OrganizationUnitsModelType {
    namespace: string;
    state: OrganizationUnitsStateType;
    effects: {
        getOrganizationUnits: Effect;
        getOrganizationUnitUsers: Effect;
        getOrganizationUnitRoles: Effect;
    };
    reducers: {
        saveOrganizationUnits: Reducer<OrganizationUnitsStateType>;
        saveOrganizationUnitUsers: Reducer<OrganizationUnitsStateType>;
        saveOrganizationUnitRoles: Reducer<OrganizationUnitsStateType>;
    };
}
const Model: OrganizationUnitsModelType = {
    namespace: 'organizationUnits',
    state: {
        organizationUnits: undefined,
        organizationUnitUsers:undefined,
        organizationUnitRoles:undefined,
    },
    effects: {
        *getOrganizationUnits({ payload }, { call, put }) {
           const response = yield call(OrganizationUnitsService.getOrganizationUnits,payload)
           yield put({
               type:'saveOrganizationUnits',
               payload:response.result
           })
        },
        *getOrganizationUnitUsers({ payload }, { call, put }) {
            const response = yield call(OrganizationUnitsService.getOrganizationUnitUsers,payload)
            yield put({
                type:'saveOrganizationUnitUsers',
                payload:response.result
            })
         },
         *getOrganizationUnitRoles({ payload }, { call, put }) {
            const response = yield call(OrganizationUnitsService.getOrganizationUnitRoles,payload)
            yield put({
                type:'saveOrganizationUnitRoles',
                payload:response.result
            })
         }
    },
    reducers: {
        // 保存组织机构
        saveOrganizationUnits(state, { payload }) {
              return({
                  ...state,
                  organizationUnits:payload
              })
        },
        // 组织机构用户
        saveOrganizationUnitUsers(state, { payload }) {
            return({
                ...state,
                organizationUnitUsers:payload
            })
      },
      // 组织机构角色
      saveOrganizationUnitRoles(state, { payload }) {
        return({
            ...state,
            organizationUnitRoles:payload
        })
  }
    }
}
export default Model;