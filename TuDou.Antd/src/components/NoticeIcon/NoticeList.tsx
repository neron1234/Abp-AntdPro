import { List, Avatar } from 'antd';
import React from 'react';
import classNames from 'classnames';
import styles from './NoticeList.less';
import read from '@/assets/read.svg';
import unread from '@/assets/unread.svg';
import {  FormattedUserNotification } from '@/services/notification.ts/dtos/userNotification';

export interface NoticeIconTabProps {
  count?: number;
  name?: string;
  showClear?: boolean;
  showViewMore?: boolean;
  style?: React.CSSProperties;
  title: string;
  tabKey: string;
  data?: FormattedUserNotification[];
  onClick?: (item: FormattedUserNotification) => void;
  onClear?: () => void;
  emptyText?: string;
  clearText?: string;
  viewMoreText?: string;
  list?: FormattedUserNotification[];
  onViewMore?: (e: any) => void;
}
const NoticeList: React.SFC<NoticeIconTabProps> = ({
  data = [],
  onClick,
  onClear,
  title,
  onViewMore,
  emptyText,
  showClear = true,
  clearText,
  viewMoreText,
  showViewMore = false,
}) => {
  if (data.length === 0) {
    return (
      <div className={styles.notFound}>
        <div>{emptyText}</div>
      </div>
    );
  }
  return (
    <div>
      <List<FormattedUserNotification>
        className={styles.list}
        dataSource={data}
        renderItem={(item, i) => {
          const itemCls = classNames(styles.item, {
            [styles.read]: !item.isUnread,
          });
         const leftIcon=item.isUnread?<Avatar src={unread}/>:<Avatar src={read}/>
          return (
            <List.Item
              className={itemCls}
              key={item.userNotificationId || i}
              onClick={() => onClick && onClick(item)}
            >
              <List.Item.Meta
                className={styles.meta}
                avatar={leftIcon}
                title={
                  <div className={styles.title}>
                    {item.text}
                    <div className={styles.extra}>{item.state=="UNREAD"?"未读":"已读"}</div>
                  </div>
                }
                description={
                  <div>
                    <div className={styles.description}>{item.data.message}</div>
                    <div className={styles.datetime}>{item.creationTime}</div>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
      <div className={styles.bottomBar}>
        {showClear ? (
          <div onClick={onClear}>
            {clearText}
          </div>
        ) : null}
        {showViewMore ? (
          <div
            onClick={e => {
              if (onViewMore) {
                onViewMore(e);
              }
            }}
          >
            {viewMoreText}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NoticeList;
