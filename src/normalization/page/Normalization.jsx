import {useEffect, useState} from "react";
import NormalizationColumnHeader from "../ui/NormalizationColumnHeader";
import ButtonUI from "../../project/components/uI/ButtonUI";


export default function Normalization(){
    const [normalizationColumnData , setNormalizationColumnData] = useState([])
    const [columnData , setColumnData] = useState([]); // 초기 값은 빈 배열로 설정


    let exampleTableData = {
        id : 1,
        name : "회사",
        comment : "회사관리",
        isFavorite : 0, //0이면 즐겨찾기 X
        isDelete : 0,  //0이면 삭제
        updateTime: Date.now(),
    };

    let exampleData2 = {
        "회사": "소속사",
        "직원번호": "1004",
        "이름": "아이유",
        "SNS": "인스타그램 트위터 페이스북 유튜브 V-Live"
    };

    useEffect(() => {
        // 컬럼 데이터 설정
        if (columnData.length === 0) {
            const keys = Object.keys(exampleData2);
            setColumnData(keys);
        }
    }, []);



    const updateNormalizationColumnData = (column) => {
        console.log(`선택한 데이터 ${column}`);
        setNormalizationColumnData((prevData) => [...prevData, column]);
    };

    const normalizationColumnDataSend = async () => {
        console.log(`현재 데이터 목록 ${normalizationColumnData}`)

        let normalData = {
            normalizationStep: 1,
            normalizationColumns: normalizationColumnData,
            normalizationTableID : exampleTableData.id //ID값을 보냄
        }

        try {
            const response = await fetch('http://localhost:8080/api/normalization', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(normalData)
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Data sent successfully:', responseData);

            } else {
                const errorData = await response.json();
                console.log(errorData)
            }

        } catch (error) {
            console.error('Error sending data:', error);
        }
    }

    return(
        <div>
            <table>
                <thead id="example-table-header">
                    <NormalizationColumnHeader
                        columns={columnData}
                        selectColumnData={updateNormalizationColumnData}/>
                </thead>
                <tbody>

                </tbody>
            </table>
            <ButtonUI
                children={"전송"}
                onClick={normalizationColumnDataSend}
            />
        </div>
    )

}