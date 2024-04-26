import styles from "../../styleModule/serach.module.css";

export default function DataContainerLayout({columnsData}){


    return (
        <div>
            <div className={styles.dataContainer}>
                {columnsData.map((data, index) => (
                    <div key={index}>
                        {/* 각 컬럼의 이름을 렌더링 */}
                        <h6 className={styles.column}>{data.columnName}</h6>
                        {/* 각 컬럼의 데이터를 map 함수로 순회 */}
                        {data.dataList.map((item, idx) => (
                            <p key={idx} className={styles.columnData}>{item}</p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

}