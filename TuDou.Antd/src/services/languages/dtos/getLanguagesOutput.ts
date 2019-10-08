import { ListResultDto } from "@/shared/dtos/listResultDto";
import { ApplicationLanguageListDto } from "./applicationLanguageListDto";

export interface GetLanguagesOutput extends ListResultDto<ApplicationLanguageListDto>{
    defaultLanguageName:string;
}