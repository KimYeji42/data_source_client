import React from "react";
import styles from "../styleModule/MypageStyle.module.css";

const ContentMenu = ({ title, onClick, isActive }) => (
    <li className={styles.ContentMenuItem}>
        <a
            href="#"
            onClick={onClick}
            className={isActive ? styles.on : ""}
        >
            {title}
        </a>
    </li>
);

export default ContentMenu;
