import { Alert, Checkbox, Icon } from 'antd';
import React, { Component } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Dispatch, AnyAction } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import Link from 'umi/link';
import { connect } from 'dva';
import { LoginModalState } from '@/models/login';
import LoginComponents from './components/Login';
import styles from './style.less';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import { AuthenticateModel } from '@/services/tokenAuth/dtos/authenticateModel';
import ResetPassword from './components/ResetPassword';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

export interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  userLogin: LoginModalState;
  submitting: boolean;
}
export interface LoginState {
  type: string;
  rememberClient: boolean;
}

@connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component<LoginProps, LoginState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: LoginState = {
    type: 'account',
    rememberClient: false,
  };

  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      rememberClient: e.target.checked,
    });
  };

  handleSubmit = (err: unknown, values: AuthenticateModel) => {
    const { rememberClient } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          rememberClient
        },
      });
    }
  };

  onTabChange = (type: string) => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise<boolean>((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }
      this.loginForm.validateFields(
        ['mobile'],
        {},
        async (err: unknown, values: LoginParamsType) => {
          if (err) {
            reject(err);
          } else {
            const { dispatch } = this.props;
            try {
              const success = await ((dispatch({
                type: 'login/getCaptcha',
                payload: values.userName,
              }) as unknown) as Promise<unknown>);
              resolve(!!success);
            } catch (error) {
              reject(error);
            }
          }
        },
      );
    });

  renderMessage = (content: string) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );
  resetPasswordModalOk=()=>{
    const {dispatch} = this.props;
    dispatch({
      type:'login/changeResetPasswordModalStatus',
      payload:false
    })
  }
  // 关闭模态框
  resetPasswordModalCancel=()=>{
    const {dispatch} = this.props;
    dispatch({
      type:'login/changeResetPasswordModalStatus',
      payload:false
    })
  }
  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType,resetPasswordModalState } = userLogin;
    const { type, rememberClient } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={(form?: FormComponentProps['form']) => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="账户密码登录">
            {status === false &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage(
                "用户名或密码有误",
              )}
            <UserName
              name="userNameOrEmailAddress"
              placeholder="用户名"
              rules={[
                {
                  required: true,
                  message: "用户名不能为空",
                },
              ]}
            />
            <Password
              name="password"
              placeholder="密码"
              rules={[
                {
                  required: true,
                  message: "密码不能为空"
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          </Tab>
          <Tab key="mobile" tab="手机号登陆">
            {status === false &&
              loginType === 'mobile' &&
              !submitting &&
              this.renderMessage(
                "验证码错误",
              )}
            <Mobile
              name="mobile"
              placeholder="手机号"
              rules={[
                {
                  required: true,
                  message: "手机号不能为空",
                },
                {
                  pattern: /^1\d{10}$/,
                  message: "请输入正确格式手机号"
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder="请输入验证码"
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText="获取验证码"
              getCaptchaSecondText="秒"
              rules={[
                {
                  required: true,
                  message: "验证码不能为空",
                },
              ]}
            />
          </Tab>
          <div>
            <Checkbox checked={rememberClient} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            <a style={{ float: 'right' }} href="">
             忘记密码
            </a>
          </div>
          <Submit loading={submitting}>
           登陆
          </Submit>
          <div className={styles.other}>
            其他登录方式
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/user/register">
              注册账户
            </Link>
          </div>
        </LoginComponents>
        <ResetPassword visible={resetPasswordModalState!} onOk={()=>{}} onCancel={this.resetPasswordModalCancel}></ResetPassword>
      </div>
    );
  }
}

export default Login;
