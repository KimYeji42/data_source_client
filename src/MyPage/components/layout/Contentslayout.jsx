import React, { useState } from "react";
import styles from "../../styleModule/MypageStyle.module.css";
import ProjectList from "../ui/ProjectList";
import ProjectBookMark from "../ui/ProjectBookMark";
import TableBookMark from "../ui/TableBookMark";
import ContentsMenuBar from "../ui/ContentsMeunBar";

export default function ContentsLayout() {
    const [activeIndex, setActiveIndex] = useState(0); // 활성화된 탭을 추적하는 상태

    return (
        <div className={styles.contentslayout}>
            <ContentsMenuBar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            {activeIndex === 0 && <ProjectList />}
            {activeIndex === 1 && <ProjectBookMark />}
            {activeIndex === 2 && <TableBookMark />}
        </div>
    );
}
