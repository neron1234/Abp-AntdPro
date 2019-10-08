import { GetLanguagesOutput } from "@/services/languages/dtos/getLanguagesOutput";
import { Effect } from "dva";
import { Reducer } from "redux";
import LanguagesService from '@/services/languages/languages'
export interface LanguagesStateType {
   languages?:GetLanguagesOutput
}
export interface LanguagesModelType {
    namespace: string;
    state: LanguagesStateType;
    effects: {
        getLanguages:Effect
    };
    reducers: {
         saveLanguages:Reducer<LanguagesStateType>
    };
}
const Model: LanguagesModelType = {
    namespace: 'languages',
    state: {
        languages:undefined
    },
    effects: {
        *getLanguages(_, { call, put }) {
             const response = yield call (LanguagesService.getLanguages)
             yield put({
                 type:'saveLanguages',
                 payload:response.result
             })
        }
    },
    reducers: {
        saveLanguages(state,{payload}){
            return{
                ...state,
                languages:payload
            }
        }
    }
}
export default Model;