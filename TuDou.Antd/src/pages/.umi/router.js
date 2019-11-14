import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from 'D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/account',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
          LoadingComponent: require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        name: 'account',
        path: '/account/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__account__login" */ '../account/login'),
              LoadingComponent: require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/src/components/PageLoading/index')
                .default,
            })
          : require('../account/login').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__SecurityLayout" */ '../../layouts/SecurityLayout'),
          LoadingComponent: require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/SecurityLayout').default,
    Routes: [require('../Authorized').default],
    routes: [
      {
        path: '/',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
              LoadingComponent: require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/src/components/PageLoading/index')
                .default,
            })
          : require('../../layouts/BasicLayout').default,
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
            exact: true,
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Welcome" */ '../Welcome'),
                  LoadingComponent: require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/src/components/PageLoading/index')
                    .default,
                })
              : require('../Welcome').default,
            exact: true,
          },
          {
            path: '/admin',
            name: '管理',
            icon: 'setting',
            routes: [
              {
                path: '/admin/organizationUnits',
                name: '组织机构',
                icon: 'team',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../admin/organizationUnits'),
                      LoadingComponent: require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../admin/organizationUnits').default,
                exact: true,
              },
              {
                path: '/admin/roles',
                name: '角色',
                icon: 'safety',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../admin/roles'),
                      LoadingComponent: require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../admin/roles').default,
                exact: true,
              },
              {
                path: '/admin/users',
                name: '用户',
                icon: 'user',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../admin/users'),
                      LoadingComponent: require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../admin/users').default,
                exact: true,
              },
              {
                path: '/admin/languages',
                name: '语言列表',
                icon: 'unordered-list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../admin/languages'),
                      LoadingComponent: require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../admin/languages').default,
                exact: true,
              },
              {
                path: '/admin/languageTexts/:name',
                name: '语言列表',
                icon: 'unordered-list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../admin/languages/languageText'),
                      LoadingComponent: require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../admin/languages/languageText').default,
                hideInMenu: true,
                exact: true,
              },
              {
                path: '/admin/auditLogs',
                name: '审计日志',
                icon: 'schedule',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../admin/auditLogs'),
                      LoadingComponent: require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../admin/auditLogs').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__404" */ '../404'),
                  LoadingComponent: require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/src/components/PageLoading/index')
                    .default,
                })
              : require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ '../404'),
          LoadingComponent: require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/src/components/PageLoading/index')
            .default,
        })
      : require('../404').default,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('D:/个人程序文件/个人项目/AbpZero-AntdPro/TuDou.Antd/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
