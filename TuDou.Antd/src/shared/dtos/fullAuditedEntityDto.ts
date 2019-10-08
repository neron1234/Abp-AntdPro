import { AuditedEntityDto } from "./auditedEntityDto";

export interface FullAuditedEntityDto<T=number> extends AuditedEntityDto<T>{
    isDeleted:boolean;
    deleterUserId:boolean;
    deletionTime:Date;
}