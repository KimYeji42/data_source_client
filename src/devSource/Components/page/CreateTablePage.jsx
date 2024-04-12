import TableBoxLayout from "../layout/TableBoxLayout";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function CreateTablePage(){
    const { dataBaseID } = useParams();
    const [dataBaseData , setDataBaseData] = useState(null)
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

    return(
        <div>
            {dataBaseData &&  <TableBoxLayout data={dataBaseData}/>} {/* 데이터가 존재할 때만 렌더링 */}
        </div>
    )
}