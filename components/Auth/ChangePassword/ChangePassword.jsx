import React from 'react';
import styles from './ChangePassword.module.css';

const ChangePassword = () => {
  return (
    <div className={styles.root}>
      <h1>Change Password</h1>
      <form className={styles.form}>
        <label htmlFor="currentPassword">Current Password:</label>
        <input type="password" id="currentPassword" className={styles.input} />
        <label htmlFor="newPassword">New Password:</label>
        <input type="password" id="newPassword" className={styles.input} />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" className={styles.input} />
        <button type="submit" className={styles.button}>Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
