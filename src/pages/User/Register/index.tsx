import Footer from '@/components/Footer';
import { listChartByPageUsingPost } from '@/services/rico/chartController';
import {getLoginUserUsingGet, userLoginUsingPost, userRegisterUsingPost} from '@/services/rico/userController';
import { Link } from '@@/exports';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
import {val} from "@umijs/utils/compiled/cheerio/lib/api/attributes";

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  /**
   * 登陆成功后，获取用户登录信息
   */
  const fetchUserInfo = async () => {
    const userInfo = await getLoginUserUsingGet();
    if (userInfo.code === 20000) {
      flushSync(() => {
        setInitialState({
          currentUser: userInfo.data,
        });
      });
    }
  };

  const handleSubmit = async (values: API.UserRegisterRequest) => {
    try {
      // 登录
      const res1 = await userRegisterUsingPost(values);
      if (res1.code === 20000) {
        const defaultLoginSuccessMessage = '注册成功,正在为您登录';
        message.success(defaultLoginSuccessMessage);
        const res2 = await userLoginUsingPost({
          userAccount:values.userAccount,
          userPassword:values.userPassword
        });
        if(res2.code === 20000){
          await fetchUserInfo();
          const urlParams = new URL(window.location.href).searchParams;
          history.push(urlParams.get('redirect') || '/');
        }else{
          message.error('自动失败，请您尝试手动登录');
          history.push( '/');
        }
      } else {
        message.error('注册失败，'+res1.message);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src={Settings.logo} />}
          title="Rico 人工智能"
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '欢迎注册',
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'在这里输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'在这里输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                  name="checkPassword"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined />,
                  }}
                  placeholder={'在这里二次输入密码'}
                  rules={[
                    {
                      required: true,
                      message: '确认密码是必填项！',
                    },
                  ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Link to="/user/login">登录</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
