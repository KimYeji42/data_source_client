import { useState } from "react";

export default function RestAPIBuilderPage() {
    const [tableID, setTableID] = useState(1);
    const [objectName, setObjectName] = useState("");

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/source/table/hash/${tableID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.text();
            setObjectName(responseData); // 서버에서 반환한 JSON 데이터를 상태로 설정
            console.log(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // objectName을 인코딩하여 반환하는 함수
    const encoderURL = (objectName) => {
        return encodeURIComponent(objectName);
    };

    return (
        <div>
            <div>
                <button onClick={fetchData}>키 발급 받기</button>
                <h2>{encoderURL(objectName)}</h2> {/* encoderURL 함수에 objectName을 전달하여 반환된 값 출력 */}
            </div>
        </div>
    );
}
