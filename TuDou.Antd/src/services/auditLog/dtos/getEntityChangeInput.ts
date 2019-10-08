import { PagedRequestDto } from "@/shared/dtos/pagedRequestDto";

export interface GetEntityChangeInput extends PagedRequestDto{
    startDate:Date;
    endDate:Date;
    userName:string;
    entityTypeFullName:string;
    sorting:string;

}