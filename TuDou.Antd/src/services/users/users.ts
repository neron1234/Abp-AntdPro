import request from "@/utils/request";
import { GetUsersInput } from "./dtos/getUsersInput";

class UsersService{
    async getUsers(input: GetUsersInput) {
        return request('api/services/app/User/GetUsers', {
            method: "GET",
            data: input
        });
    };

}
export default new  UsersService();