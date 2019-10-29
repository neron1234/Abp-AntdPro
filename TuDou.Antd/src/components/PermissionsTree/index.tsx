import AppComponentBase from "../AppComponentBase";
import React from "react";
import { Tree } from 'antd';
import { connect } from "dva";
import { ConnectState, ConnectProps } from "@/models/connect";
import { createTree } from "@/utils/utils";
import { FlatPermissionWithLevelDto } from "@/services/permission/dtos/flatPermissionWithLevelDto";
import { ListResultDto } from "@/shared/dtos/listResultDto";

const { DirectoryTree } = Tree;

export interface PermissionsTreeProps extends ConnectProps{
  allPermissions:ListResultDto<FlatPermissionWithLevelDto>;
}
class PermissionsTree extends AppComponentBase<PermissionsTreeProps>{
  async componentDidMount(){
    const{dispatch} = this.props;
    await dispatch!({
       type:"permissions/getAllPermissions"
    })
  }
  render(){
    const {allPermissions} = this.props;
    let treeData = createTree(allPermissions == undefined ? [] : allPermissions.items,
      'parentName',
      'name',
      null,
      'children',
      [
        {
          target: 'title',
          targetFunction(item: FlatPermissionWithLevelDto) {
            return <span>{item.displayName}</span>;
          }
        }, {
          target: 'key',
          targetFunction(item: FlatPermissionWithLevelDto) {
            return item.name;
          }
        }
      ]);

    return(
      <DirectoryTree
      checkable
      showLine
      multiple
      showIcon
      treeData={treeData}
      defaultExpandAll>

    </DirectoryTree>
    )
  }
}
export default connect(({ permissions }: ConnectState) => ({
  allPermissions:permissions.allPermissions,
}))(PermissionsTree);
