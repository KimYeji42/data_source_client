import React from 'react';
import styles from '../styles/ndsGuide.module.css';

export default function GuideOnOffButton({ onClick }) {
    return (
        <button className={styles.guideToggleButton} onClick={onClick}>
            G
        </button>
    );
}
