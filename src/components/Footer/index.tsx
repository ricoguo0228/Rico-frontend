import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const defaultMessage = '我的世界将被摧毁~';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '访问 GitHub 以获取网站最新信息',
          title: '访问 GitHub 以获取网站最新信息',
          href: 'https://github.com/ricoguo0228',
          blankTarget: true,
        },
        {
          key: '访问 Coconut 的GitHub',
          title: <GithubOutlined />,
          href: 'https://github.com/ricoguo0228',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
