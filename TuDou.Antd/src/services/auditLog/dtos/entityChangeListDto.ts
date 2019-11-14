import { EntityDto } from "@/shared/dtos/entityDto";


export interface EntityChangeListDto extends EntityDto{
  userId:number;
  userName:string;
  changeTime:Date;
  entityTypeFullName:string;
  changeType:number;
  changeTypeName:string;
  entityChangeSetId:number;
}
