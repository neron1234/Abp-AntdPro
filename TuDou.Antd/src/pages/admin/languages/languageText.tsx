import AppComponentBase from "@/components/AppComponentBase";
import React from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Card, Table } from "antd";
import { ConnectState } from "@/models/connect";
import { connect } from "dva";
import { LanguagesModelState } from "@/models/admin/languages";
import { Dispatch, AnyAction } from "redux";
import { GetLanguageTextsInput } from "@/services/languages/dtos/getLanguageTextsInput";

import * as _ from 'lodash';
export interface LanguageTextProps {
  dispatch: Dispatch<AnyAction>;
  languages: LanguagesModelState;
  loading: boolean;
}
export interface LanguageTextStates {
  request: GetLanguageTextsInput;
  sourceNames: string[];
  languages: abp.localization.ILanguageInfo[];
}
@connect(({ languages, loading }: ConnectState) => ({
  languages: languages,
  loading: loading.effects['languages/getLanguages'],
}))
class LanguageText extends AppComponentBase<LanguageTextProps, LanguageTextStates>{
  state = {
    sourceNames: [],
    languages: [],
    request: {
      maxResultCount: this.maxResultCount,
      skipCount: this.skipCount,
      sourceName: 'Abp',
      targetLanguageName: '',
      targetValueFilter:'ALL'
    }
  }
  async componentDidMount() {
    const targetLanguageName = location.pathname.replace("/admin/languageTexts/", "");
    const sourceNames = _.map(_.filter(abp.localization.sources, source => source.type === 'MultiTenantLocalizationSource'), value => value.name);
    const languages = abp.localization.languages;
    await this.setState({
      sourceNames,
      languages,
      request: {
        ...this.state.request,
        targetLanguageName,
      }
    })
     this.getTableData();
  }
   getTableData() {

    const { dispatch } = this.props;
     dispatch({
      type: 'languages/getLanguageTexts',
      payload: {
        ...this.state.request,
      }
    })
  }
  public render() {
    const columns: any = [];
    return (<PageHeaderWrapper >
      <Card>
        <Table
          size="small"
          bordered
          dataSource={[]}
          pagination={false}
          columns={columns} />
      </Card>
    </PageHeaderWrapper>)


  }
}
export default LanguageText;
