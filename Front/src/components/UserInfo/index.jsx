import React from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatar, name, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatar || '/noavatar.png'} alt={name} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{name}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
