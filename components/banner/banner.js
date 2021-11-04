import React from 'react';
import styles from './Banner.module.css';

export default function Banner({ buttonText, handleOnClick, isLocating }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.titleSpan1}>Seijo Coffee</span>{' '}
        <span className={styles.titleSpan2}>Connoisseur</span>
      </h1>
      <p className={styles.subtitle}>Discover your local coffee shops!</p>
      <div className={styles.btnWrapper}>
        <button className={styles.btn} onClick={handleOnClick}>
          {isLocating && (
            <svg
              className={styles.animateBtn}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className={styles.circle1}
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className={styles.path1}
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          <span>{buttonText}</span>
        </button>
      </div>
    </div>
  );
}
