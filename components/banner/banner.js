import React from 'react';
import styles from './Banner.module.css';

export default function Banner(props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.titleSpan1}>Seijo Coffee</span>{' '}
        <span className={styles.titleSpan2}>Connoisseur</span>
      </h1>
      <p className={styles.subtitle}>Discover your local coffee shops!</p>
      <div className={styles.btnWrapper}>
        <button className={styles.btn} onClick={props.handleOnClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
}
