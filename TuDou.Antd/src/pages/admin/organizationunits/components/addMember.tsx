import AppComponentBase from "@/components/AppComponentBase";
import React from 'react';
import { Modal, Table } from "antd";
import { AnyAction, Dispatch } from "redux";
import { OrganizationUnitsStateType } from "@/models/admin/organizationUnits";
import { FindOrganizationUnitUsersInput } from "@/services/organizationunits/dtos/findOrganizationUnitUsersInput";
interface IAddMemberProps {
  dispatch: Dispatch<AnyAction>;
  organizationUnits: OrganizationUnitsStateType;
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  organizationUnitId:number|null;
}
interface IAddMemberStates {
  findUsersInput: FindOrganizationUnitUsersInput;
  selectedMember: any[];
}
class AddMember extends AppComponentBase<IAddMemberProps, IAddMemberStates>{
  state = {
    selectedMember:[],
    findUsersInput: {
      maxResultCount: this.maxResultCount,
      skipCount: this.skipCount,
      filter: '',
      organizationUnitId: null
    }
  }
  findUsers = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "organizationUnits/findUsers",
      payload: {...this.state.findUsersInput,organizationUnitId:this.props.organizationUnitId}
    })
  }
  onSelectChange = (selectedMember:any[]) => {
    this.setState({ selectedMember });
  };
  render() {
    const { visible, onCancel,organizationUnits } = this.props;
    const { selectedMember } = this.state;
    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
        key: 'name',
      }
    ];
    const rowSelection = {
      selectedMember,
      onChange: this.onSelectChange,
    };
    return (
      <Modal

        visible={visible}
        title="新增组织成员"
        onCancel={onCancel}>
        <Table
          loading={organizationUnits.findUsers==undefined}
          dataSource={organizationUnits.findUsers==undefined?[]:organizationUnits.findUsers!.items}
          columns={columns}
          rowSelection={rowSelection} >

        </Table>
      </Modal>
    )
  }
}
export default AddMember;
