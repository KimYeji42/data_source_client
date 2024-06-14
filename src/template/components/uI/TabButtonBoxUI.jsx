import React from 'react';
import styles from '../../styleModule/templateDisplay.module.css'; // 스타일 파일 임포트

export default function TabButtonBox({ activeTab, handleTabClick }) {
    return (
        <div className={styles.tabButtonBox}>
            <button
                className={`${styles.tabButton} ${activeTab === 'PREVIEW' ? `${styles.tabButtonActive}` : ''}`}
                onClick={() => handleTabClick('PREVIEW')}
            >
                PREVIEW
            </button>
            <button
                className={`${styles.tabButton} ${activeTab === 'CODE' ? `${styles.tabButtonActive}` : ''}`}
                onClick={() => handleTabClick('CODE')}
            >
                CODE VIEW
            </button>
        </div>
    );
}
