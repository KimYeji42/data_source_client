import React, { useState } from "react";
import styles from "../../styleModule/MypageStyle.module.css";
import ProjectList from "../ui/ProjectList";
import ProjectBookMark from "../ui/ProjectBookMark";
import TableBookMark from "../ui/TableBookMark";
import ContentsMenuBar from "../ui/ContentsMeunBar";

export default function ContentsLayout({data}) {
    const [activeIndex, setActiveIndex] = useState(0); // 활성화된 탭을 추적하는 상태

    if (!data) return null;

    return (
        <div className={styles.contentslayout}>
            <ContentsMenuBar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            {activeIndex === 0 && <ProjectList userProjects={data[0].userProjects}/>}
            {activeIndex === 1 && <ProjectBookMark favoriteProjects={data[0].favoriteProjects}/>}
            {activeIndex === 2 && <TableBookMark favoriteTableResponses={data[0].favoriteTableResponses}/>}
        </div>
    );
}
