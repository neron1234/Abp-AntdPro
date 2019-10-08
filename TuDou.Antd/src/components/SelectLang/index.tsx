import { Icon, Menu } from 'antd';
import { formatMessage, setLocale } from 'umi-plugin-react/locale';

import { ClickParam } from 'antd/es/menu';
import React from 'react';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

interface SelectLangProps {
  className?: string;
}
const SelectLang: React.FC<SelectLangProps> = props => {
  const { className } = props;
  const changeLang = ({ key }: ClickParam): void => setLocale(key, false);
  const locales = abp.localization.languages;

  const langMenu = (
    <Menu className={styles.menu} selectedKeys={[abp.localization.currentLanguage.name]} onClick={changeLang}>
      {locales.map(item => (
        <Menu.Item key={item.name}>
          <span role="img" aria-label={item.displayName}>
            {item.name}
          </span>{' '}
          {item.displayName}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight">
      <span className={classNames(styles.dropDown, className)}>
        <Icon type="global" title={formatMessage({ id: 'navBar.lang' })} />
      </span>
    </HeaderDropdown>
  );
};

export default SelectLang;
