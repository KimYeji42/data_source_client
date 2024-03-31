import TableBoxLayout from "../layout/TableBoxLayout";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function CreateTablePage(){
    const { dataBaseID } = useParams();
    const [dataBaseData , setDataBaseData] = useState(null)
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/database/${dataBaseID}`, {
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

    return(
        <div>
            {dataBaseData &&  <TableBoxLayout data={dataBaseData}/>} {/* 데이터가 존재할 때만 렌더링 */}
        </div>
    )
}