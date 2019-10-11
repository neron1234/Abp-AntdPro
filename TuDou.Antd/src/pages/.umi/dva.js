import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'auditLogs', ...(require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/models/admin/auditLogs.ts').default) });
app.model({ namespace: 'languages', ...(require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/models/admin/languages.ts').default) });
app.model({ namespace: 'organizationUnits', ...(require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/models/admin/organizationUnits.ts').default) });
app.model({ namespace: 'roles', ...(require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/models/admin/roles.ts').default) });
app.model({ namespace: 'users', ...(require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/models/admin/users.ts').default) });
app.model({ namespace: 'global', ...(require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/models/global.ts').default) });
app.model({ namespace: 'login', ...(require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/models/login.ts').default) });
app.model({ namespace: 'setting', ...(require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/models/setting.ts').default) });
app.model({ namespace: 'user', ...(require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/models/user.ts').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
