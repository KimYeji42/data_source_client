import React from "react";
import styles from "../styleModule/MypageStyle.module.css";
import ContentMenu from "./ContentMenu";
import { motion } from "framer-motion";

export default function ContentsMenuBar({ activeIndex, setActiveIndex }) {
    const menuItems = ["내 프로젝트 목록", "내 프로젝트 즐겨찾기", "테이블 즐겨찾기"];

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className={styles.MenuBar}>
            <ul className={styles.MenuList}>
                {menuItems.map((title, index) => (
                    <ContentMenu
                        key={index}
                        title={title}
                        onClick={() => handleClick(index)}
                        isActive={index === activeIndex}
                    />
                ))}
            </ul>
            <motion.span
                className={styles.Line}
                animate={{
                    left: `${(activeIndex * 100) / menuItems.length}%`,
                    width: `${100 / menuItems.length}%` // 각 메뉴 항목 너비를 설정
                }}
                transition={{ duration: 0.5 }}
            />
        </div>
    );
}
