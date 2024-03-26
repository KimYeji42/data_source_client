import React from 'react';

import styles from '../../styleModule/cardDesignStyle.module.css'; // CSS 파일을 불러옵니다. (카드 디자인을 위한 스타일)

// 카드 컴포넌트 정의
function Card({ title, image, description }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardImageContainer}> {/* 이미지를 감싸는 div */}
                <img src={image} alt={title} className={styles.cardImage} />
            </div>
            <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{title}</h2>
                <p className={styles.cardDescription}>{description}</p>
            </div>
            <div className={styles.cardButtonContainer}>
                <button className={styles.cardButton}>보기</button>
            </div>
        </div>
    );
}

export default Card;
