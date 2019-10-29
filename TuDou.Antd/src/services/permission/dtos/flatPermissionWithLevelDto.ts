export interface FlatPermissionWithLevelDto{
  parentName:string;
  name:string;
  displayName:string;
  description:string;
  isGrantedByDefault:boolean;
  level:number;
}
