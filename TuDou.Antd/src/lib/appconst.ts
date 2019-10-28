const AppConsts = {
  userManagement: {
    defaultAdminUserName: 'admin',
  },
  localization: {
    defaultLocalizationSourceName: 'test',
  },
  authorization: {
    encrptedAuthTokenName: 'enc_auth_token',
  },
  defaultPageSize:10,
  defaultPageIndex:0,
  appBaseUrl: process.env.REACT_APP_APP_BASE_URL,
  remoteServiceBaseUrl: process.env.REACT_APP_REMOTE_SERVICE_BASE_URL,
  localeMappings:  [
    {
      "from": "es-MX",
      "to": "es"
    },
    {
      "from": "zh-Hans",
      "to": "zh-cn"
    },
    {
      "from": "vi",
      "to": "en-gb"
    }
  ],
};
export default AppConsts;
