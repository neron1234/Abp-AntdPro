import { PagedRequestDto } from "@/shared/dtos/pagedRequestDto";

export interface GetUsersInput extends PagedRequestDto{
    filter:string;
    permission:string;
    role?:number;
    onlyLockedUsers:boolean;
}