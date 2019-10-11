import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from 'D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/account',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
          LoadingComponent: require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/components/PageLoading/index')
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
              LoadingComponent: require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/components/PageLoading/index')
                .default,
            })
          : require('../account/login').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
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
          LoadingComponent: require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/components/PageLoading/index')
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
              LoadingComponent: require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/components/PageLoading/index')
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
                  LoadingComponent: require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/components/PageLoading/index')
                    .default,
                })
              : require('../Welcome').default,
            exact: true,
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'smile',
            routes: [
              {
                path: '/admin/organizationUnits',
                name: 'organizationUnits',
                icon: 'smile',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../admin/organizationUnits'),
                      LoadingComponent: require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../admin/organizationUnits').default,
                exact: true,
              },
              {
                path: '/admin/users',
                name: 'users',
                icon: 'smile',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../admin/users'),
                      LoadingComponent: require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../admin/users').default,
                exact: true,
              },
              {
                path: '/admin/roles',
                name: 'roles',
                icon: 'smile',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../admin/roles'),
                      LoadingComponent: require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../admin/roles').default,
                exact: true,
              },
              {
                path: '/admin/languages',
                name: 'languages',
                icon: 'smile',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../admin/languages'),
                      LoadingComponent: require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../admin/languages').default,
                exact: true,
              },
              {
                path: '/admin/auditLogs',
                name: 'auditLogs',
                icon: 'smile',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../admin/auditLogs'),
                      LoadingComponent: require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../admin/auditLogs').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
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
                  LoadingComponent: require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/components/PageLoading/index')
                    .default,
                })
              : require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
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
              LoadingComponent: require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
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
          LoadingComponent: require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/src/components/PageLoading/index')
            .default,
        })
      : require('../404').default,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('D:/个人程序文件/个人项目/Abp+AntdPro/TuDou.Antd/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
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
  unListen = () => {};

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
    routeChangeHandler(history.location);
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
