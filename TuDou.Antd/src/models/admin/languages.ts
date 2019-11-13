import { GetLanguagesOutput } from "@/services/languages/dtos/getLanguagesOutput";
import { Effect, Subscription, SubscriptionAPI } from "dva";
import { Reducer } from "redux";
import LanguagesService from '@/services/languages/languages'
import { PagedResultDto } from '@/shared/dtos/pagedResultDto';
import { LanguageTextListDto } from "@/services/languages/dtos/languageTextListDto";
export interface LanguagesModelState {
   languages?:GetLanguagesOutput;
   languageTexts?:PagedResultDto<LanguageTextListDto>
}
export interface LanguagesModelType {
    namespace: string;
    state: LanguagesModelState;
    effects: {
        getLanguages:Effect;
        getLanguageTexts:Effect;
    };
    reducers: {
         saveLanguages:Reducer<LanguagesModelState>;
         saveLanguageTexts:Reducer<LanguagesModelState>;
    };
}
const Model: LanguagesModelType = {
    namespace: 'languages',
    state: {
        languages:undefined,
        languageTexts:undefined
    },
    effects: {
        *getLanguages(_, { call, put }) {
             const response = yield call (LanguagesService.getLanguages)
             yield put({
                 type:'saveLanguages',
                 payload:response.result
             })
        },
        *getLanguageTexts({payload}, { call, put }) {
           const response = yield call (LanguagesService.getLanguageTexts,payload)
        }
    },
    reducers: {
        saveLanguages(state,{payload}){
            return{
                ...state,
                languages:payload
            }
        },
        saveLanguageTexts(state,{payload}){
          return{
              ...state,
              languages:payload
          }
      }
    }
}
export default Model;
