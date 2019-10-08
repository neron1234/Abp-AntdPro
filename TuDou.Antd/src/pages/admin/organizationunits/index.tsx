import AppComponentBase from "@/components/AppComponentBase";
import { OrganizationUnitsStateType } from "@/models/admin/organizationUnits";
import { connect } from "dva";
import React from 'react';
import { ConnectState } from "@/models/connect";
import { AnyAction, Dispatch } from "redux";
import { Card, Row, Col, Tree, Tabs, Table, Button } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { OrganizationUnitDto } from "@/services/organizationunits/dtos/organizationUnitDto";
import { createTree } from "@/utils/utils";
import { GetOrganizationUnitRolesInput } from "@/services/organizationunits/dtos/getOrganizationUnitRolesInput";
import { GetOrganizationUnitUsersInput } from "@/services/organizationunits/dtos/getOrganizationUnitUsersInput";
const { TabPane } = Tabs;
const { DirectoryTree } = Tree;
export interface OrganizationUnitsProps {
    dispatch: Dispatch<AnyAction>;
    organizationUnits: OrganizationUnitsStateType;
    loading: boolean;
}
export interface OrganizationUnitsStates {
    organizationUnitSelectedId?: number;
    getOrganizationRoleInput: GetOrganizationUnitRolesInput;
    getOrganizationUserInput: GetOrganizationUnitUsersInput;
}

@connect(({ organizationUnits, loading }: ConnectState) => ({
    organizationUnits: organizationUnits,
    loading: loading.effects['organizationUnits/getOrganizationUnits'],
}))
class OrganizationUnits extends AppComponentBase<OrganizationUnitsProps, OrganizationUnitsStates> {
    state = {
        organizationUnitSelectedId: undefined,
        getOrganizationUserInput: {
            maxResultCount: this.maxResultCount,
            skipCount: this.skipCount,
            id: 0
        },
        getOrganizationRoleInput: {
            maxResultCount: this.maxResultCount,
            skipCount: this.skipCount,
            id: 0
        }
    }
    componentDidMount() {
        this.getTreeData();
    }
    // 获取树形数据
    getTreeData() {
        const { dispatch } = this.props;
        dispatch({
            type: 'organizationUnits/getOrganizationUnits'
        });
    }
    // 选中树节点
    selectTree = (selectedKeys: string[], e: any) => {
        this.setState({
            organizationUnitSelectedId: Number(selectedKeys[0]),
        }, () => {
            this.getTableData();
        });

    }
    // 标签页选择
    getTableData = () => {
        if (this.state.organizationUnitSelectedId !== 0) {
            const { dispatch } = this.props;
            dispatch({
                type: 'organizationUnits/getOrganizationUnitUsers',
                payload: {
                    ...this.state.getOrganizationUserInput,
                    id: this.state.organizationUnitSelectedId
                }
            })
            dispatch({
                type: 'organizationUnits/getOrganizationUnitRoles',
                payload: {
                    ...this.state.getOrganizationRoleInput,
                    id: this.state.organizationUnitSelectedId
                }
            })

        }
    }
    render() {
        const { organizationUnits, organizationUnitUsers, organizationUnitRoles } = this.props.organizationUnits;
        const { organizationUnitSelectedId } = this.state;
        let treeData = createTree(organizationUnits == undefined ? [] : organizationUnits.items,
            'parentId',
            'id',
            null,
            'children',
            [
                {
                    target: 'title',
                    targetFunction(item: OrganizationUnitDto) {
                        return <span>{item.displayName}&nbsp;<small style={{ fontSize: '.82em', opacity: .5 }}>{item.memberCount}组织成员,{item.roleCount}角色</small></span>;
                    }
                }, {
                    target: 'key',
                    targetFunction(item: OrganizationUnitDto) {
                        return item.id;
                    }
                },
                {
                    target: 'selectable',
                    value: true
                }
            ]);
        const organizationUnitUserTableColumns = [
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (text: any, record: any, index: number) => {
                    return <Button icon="close-circle" type="primary">删除</Button>
                }
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '添加时间',
                dataIndex: 'addedTime',
                key: 'addedTime',
            },
        ];
        const organizationUnitRoleTableColumns = [
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (text: any, record: any, index: number) => {
                    return <Button icon="close-circle" type="primary">删除</Button>
                }
            },
            {
                title: '角色',
                dataIndex: 'displayName',
                key: 'displayName',
            },
            {
                title: '添加时间',
                dataIndex: 'addedTime',
                key: 'addedTime',
            },
        ]
        return (
            <PageHeaderWrapper >
                <Row gutter={32}>
                    <Col span={12}>
                        <Card title="组织结构树">
                            <DirectoryTree
                                onSelect={this.selectTree}
                                showIcon
                                treeData={treeData}
                            >
                            </DirectoryTree>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="成员">
                            <Tabs type="card"  >
                                <TabPane tab="组织成员" key="user">
                                    {
                                        organizationUnitSelectedId == undefined ? (<p>选择一个组织成员</p>) :
                                            (<div><Col style={{ textAlign: 'right' }}>
                                                <Button icon="plus" type="primary">添加组织成员</Button>
                                            </Col>
                                                <Table
                                                    dataSource={organizationUnitUsers == undefined ? [] : organizationUnitUsers.items}
                                                    columns={organizationUnitUserTableColumns}
                                                    loading={organizationUnitUsers == undefined} />
                                            </div>)

                                    }

                                </TabPane>
                                <TabPane tab="角色" key="role">
                                    {
                                        organizationUnitSelectedId == undefined ? (<p>选择一个组织成员</p>) :
                                            (<div>   <Col style={{ textAlign: 'right' }}>
                                                <Button icon="plus" type="primary">添加角色</Button>
                                            </Col>
                                                <Table
                                                    dataSource={organizationUnitRoles == undefined ? [] : organizationUnitRoles.items}
                                                    columns={organizationUnitRoleTableColumns}
                                                    loading={organizationUnitRoles == undefined} />
                                            </div>)

                                    }


                                </TabPane>
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            </PageHeaderWrapper>
        )
    }
}
export default OrganizationUnits;