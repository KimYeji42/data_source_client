import DataBaseListLayOut from "../layout/TableListLayOut";
import SideBarComponent from "../../../Layout/SideBar/SideBarComponent";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DataBaseShowCasePage() {
    const { dataBaseID } = useParams();
    const [dataBaseData, setDataBaseData] = useState(null); // 초기값을 null로 설정하여 데이터가 없는 상태를 표시합니다
    const fetchData = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/database/${dataBaseID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            console.log(responseData);
            setDataBaseData(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <SideBarComponent />
            {dataBaseData && <DataBaseListLayOut data={dataBaseData} />} {/* 데이터가 존재할 때만 렌더링 */}
        </div>
    );
}
