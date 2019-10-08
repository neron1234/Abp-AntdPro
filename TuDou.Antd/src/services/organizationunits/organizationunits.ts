import request from "@/utils/request";
import { FindOrganizationUnitUsersInput } from "./dtos/findOrganizationUnitUsersInput";
import { FindOrganizationUnitRolesInput } from "./dtos/findOrganizationUnitRolesInput";
import { GetOrganizationUnitUsersInput } from "./dtos/getOrganizationUnitUsersInput";
import { GetOrganizationUnitRolesInput } from "./dtos/getOrganizationUnitRolesInput";

class OrganizationUnitsService{
    async getOrganizationUnits() {
        return request('api/services/app/OrganizationUnit/GetOrganizationUnits', {
            method: "GET",
        });
    };
    async findUsers(input:FindOrganizationUnitUsersInput) {
        return request('api/services/app/OrganizationUnit/FindUsers', {
            method: "GET",
            params:input
        });
    };
    async findRoles(input:FindOrganizationUnitRolesInput) {
        return request('api/services/app/OrganizationUnit/FindRoles', {
            method: "GET",
            params:input
        });
    };
    async getOrganizationUnitUsers(input:GetOrganizationUnitUsersInput) {
        console.log(input);
        return request('api/services/app/OrganizationUnit/GetOrganizationUnitUsers', {
            method: "GET",
            params:input
        });
    };
    async getOrganizationUnitRoles(input:GetOrganizationUnitRolesInput) {
        return request('api/services/app/OrganizationUnit/GetOrganizationUnitRoles', {
            method: "GET",
            params:input
        });
    };

}
export default new OrganizationUnitsService();