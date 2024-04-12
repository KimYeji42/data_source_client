import styles from "../styles.module.css";
import BoxUI from "../uI/BoxUI";
import {useEffect, useState} from "react";
import ButtonUI from "../uI/ButtonUI";
import {Link, useParams} from "react-router-dom";
export default function DataBaseBoxLayOut() {
    const { dataBaseID } = useParams();
    const [activeTable, setActiveTable] = useState(null); // 선택된 테이블을 저장하는 상태 변수
    const [dataBaseTables , setDataBaseTables] = useState([])
    const handleClick = () => {
        alert(activeTable.id)
    };
    const getDatabaseTables = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const response = await fetch(`${apiUrl}/api/table/${dataBaseID}`, {
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
                        imageSrc={"../image/dataBase.png"}
                        comment={item.comment}
                        item = {item}
                        date={item.updateTime}
                        setActiveTable = {setActiveTable}
                        activeTable={activeTable}
                    />
                ))}
            </div>
            <div className={styles.dataBaseBoxButton}>
                {activeTable && (
                    <Link to={`/table/${activeTable.id}`}>
                        <ButtonUI className={styles.blueButton} onClick={handleClick}>
                            데이터 관리
                        </ButtonUI>
                    </Link>
                )}
            </div>
        </div>
    );
}