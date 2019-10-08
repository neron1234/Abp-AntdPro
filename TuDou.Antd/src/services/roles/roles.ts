import request from "@/utils/request";
import { GetRolesInput } from "./dtos/getRolesInput";

class RolesService{
    async getRoles(input: GetRolesInput) {
        return request('api/services/app/Role/GetRoles', {
            method: "GET",
            data: input
        });
    };

}
export default new RolesService();