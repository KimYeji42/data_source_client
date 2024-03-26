import styles from "../styles.module.css";
import BoxUI from "../uI/BoxUI";
import {useEffect, useState} from "react";
import ButtonUI from "../uI/ButtonUI";
export default function DataBaseBoxLayOut() {
    const [activeTable, setActiveTable] = useState(null); // 선택된 테이블을 저장하는 상태 변수
    const [dataBaseTables , setDataBaseTables] = useState([])
    const [dataBaseID , setDataBaseID] = useState(1)
    const handleClick = () => {
        alert(`${activeTable.name} 버튼이 클릭되었습니다!`);
    };
    const getDatabaseTables = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/table/${dataBaseID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setDataBaseTables(responseData);
            console.log(responseData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        getDatabaseTables()
    }, []);

    return (
        <div>
            <div className={styles.dataBaseContentBox}>
                {dataBaseTables.map((item , index) => (
                    <BoxUI
                        header={item.name}
                        date={item.updateTime}
                        imageSrc={"../image/dataBase.png"}
                        comment={item.comment}
                        item = {item}
                        setActiveTable = {setActiveTable}
                        activeTable={activeTable}
                    />
                ))}
            </div>
            <div className={styles.dataBaseBoxButton}>
                <ButtonUI className={styles.blueButton} onClick={handleClick} children={"데이터 관리"}/>
            </div>
        </div>
    );
}