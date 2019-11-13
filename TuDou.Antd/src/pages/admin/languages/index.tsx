import AppComponentBase from "@/components/AppComponentBase";
import React from 'react';
import { Card, Table, Button, Tag, Dropdown, Menu, Icon } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import { ConnectState } from "@/models/connect";
import { AnyAction, Dispatch } from "redux";
import {LanguagesModelState} from "@/models/admin/languages";
import Redirect from 'umi/redirect';
import { Link } from "umi";

export interface LanguagesProps {
  dispatch: Dispatch<AnyAction>;
  languages: LanguagesModelState;
  loading:boolean;
}
export interface LanguagesStates {

}
@connect(({ languages, loading }: ConnectState) => ({
  languages: languages,
  loading: loading.effects['languages/getLanguages'],
}))
class Languages extends AppComponentBase<LanguagesProps, LanguagesStates> {

  componentDidMount() {
    this.getTableData();
  }
  // 获取表格数据
  getTableData() {
    const { dispatch } = this.props;
    dispatch({
      type: 'languages/getLanguages',
    });
  }
  public render() {
    const {loading} = this.props;
    const { languages } = this.props.languages;
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/admin/languageTexts/en">修改</Link>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            删除
          </a>
        </Menu.Item>
      </Menu>
    );
    const columns = [
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text: any, record: any, index: number) => {
          return <div>
            <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
              <Button icon="setting" type="primary">操作<Icon type="down" /></Button>
            </Dropdown>
          </div>
        }
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '名称',
        dataIndex: 'displayName',
        key: 'displayName',
        render: (text: string, record: any, index: number) => {
            return<div>
           <span> {text}&nbsp;</span>
           {
               record.name==languages!.defaultLanguageName?
               <Tag color="#108ee9">默认</Tag>:null
           }
            </div>
         }
      },
      {
        title: '创建时间',
        dataIndex: 'creationTime',
        key: 'creationTime',
        render: (text: string, record: any, index: number) => {
           return<div>{new Date(text).toLocaleDateString()}</div>
        }
      }

    ];
    return (
      <PageHeaderWrapper >
        <Card>
          <Table
           loading={loading}
            size="small"
            bordered
            dataSource={languages == undefined ? [] : languages.items}
            pagination={false}
            columns={columns} />
        </Card>
      </PageHeaderWrapper>
    )
  }
}
export default Languages;
