import request from "@/utils/request";
import { GetLanguageTextsInput } from "./dtos/getLanguageTextsInput";

 class LanguagesService{
    async getLanguages() {
        return request('api/services/app/Language/GetLanguages', {
            method: "GET",
        });
    };
    async getLanguageForEdit() {
        return request('api/services/app/Language/GetLanguageForEdit', {
            method: "GET",
        });
    };
    async createOrUpdateLanguage() {
        return request('api/services/app/Language/CreateOrUpdateLanguage', {
            method: "POST",
        });
    };
    async deleteLanguage() {
        return request('api/services/app/Language/DeleteLanguage', {
            method: "DELETE",
        });
    };
    async SetDefaultLanguage() {
        return request('api/services/app/Language/SetDefaultLanguage', {
            method: "POST",
        });
    };
    async getLanguageTexts(input:GetLanguageTextsInput) {
        return request('api/services/app/Language/GetLanguageTexts', {
            method: "GET",
            params:input
        });
    };
    async UpdateLanguageText() {
        return request('api/services/app/Language/UpdateLanguageText', {
            method: "PUT",
        });
    };
}
export default new LanguagesService();
