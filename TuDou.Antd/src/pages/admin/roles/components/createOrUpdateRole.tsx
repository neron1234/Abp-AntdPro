import AppComponentBase from "@/components/AppComponentBase";
import { Modal, Tabs, Form, Alert } from "antd";
import React from 'react';
import { FormComponentProps } from "antd/es/form";
import Input from "antd/es/input";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox";
import PermissionsTree from "@/components/PermissionsTree";
const { TabPane } = Tabs;
export interface ICreateOrUpdateRoleProps extends FormComponentProps{
  visible: boolean;
  onCancel: () => void;
  roleId?:number;
}
export interface ICreateOrUpdateRoleStates {
  isDefault:boolean;
}
class CreateOrUpdateRoleModal extends AppComponentBase<ICreateOrUpdateRoleProps,ICreateOrUpdateRoleStates>{
  state={
    isDefault:false
  }
  isDefaultChange=(e:CheckboxChangeEvent)=>{
    this.setState({
      isDefault:e.target.checked
    })
  }
  render() {
    const { visible, onCancel,roleId} = this.props;
    const {getFieldDecorator} = this.props.form;
    const {isDefault} = this.state;
    return (
      <Modal
        title={roleId==undefined?"新增角色":"编辑角色"}
        visible={visible}
        onCancel={onCancel}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="角色名称" key="1">
            <Form.Item label="角色名称" hasFeedback>
               {
                getFieldDecorator("displayName",{
                  rules: [
                    {
                      required: true,
                      message: '这是必填项!' },
                  ],
                })(<Input />)
               }
            </Form.Item>
            <Checkbox checked={isDefault}  onChange={this.isDefaultChange} >
             默认
            </Checkbox>

            <p style={{marginTop:5}}>新用户将默认拥有此角色. </p>


           </TabPane>
          <TabPane tab="权限" key="2">
          <PermissionsTree />
          </TabPane>
        </Tabs>
        <Alert message="如果您正在更改自己的权限，则可能需要刷新页面（F5）以在您所做的权限更改生效！" type="info" />
      </Modal>
    )
  }
}
export default Form.create<ICreateOrUpdateRoleProps>({})(CreateOrUpdateRoleModal);
