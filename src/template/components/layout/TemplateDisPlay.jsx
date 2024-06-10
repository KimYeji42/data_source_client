import styles from '../../styleModule/templateDisplay.module.css'
import TemplateInputUI from "../uI/TemplateInputUI";
import TemplateCheckBoxUI from "../uI/TermplateCheckBoxUI";
import TemplatePreViewLayout from "./TemplatePreViewLayout";
import {useEffect, useState} from "react";

export default function TemplateDisPlay( { templateLabel , setDisplayOpen , choiceInputContainerOpen , tableID }){
    const apiUrl = process.env.REACT_APP_API_URL;
    const [columnsData , setColumnsData] = useState(null)

    const [selectedOptions, setSelectedOptions] = useState({
        title: "",
        description: "",
        image: ""
    });
    const [selectedResultInputData , setSelectedResultInputData] = useState(null)

    // 템플릿 행 데이터 선택
    const setSelectedColumns = (selectedOptions) => {
        fetchInputTemplateData()
        console.log("Selected options:", selectedOptions);
    };
    const handleSelectedChecks = async (selectedNames) => {
        console.log("Selected checkbox names:", selectedNames);
        fetchCheckTemplateData(selectedNames)
    };

    // 컬럼 데이터
    const fetchColumnData = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const response = await fetch(`${apiUrl}/api/column/list/${tableID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            setColumnsData(data); // 받은 데이터 상태에 저장
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // 콤보박스 데이터
    const fetchInputTemplateData = async () => {
        let data = {
            tableID: tableID,
            selectInputData: selectedOptions
        }

        try {
            const response = await fetch(`${apiUrl}/api/template/card`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // 응답을 JSON 형식으로 변환
                const responseData = await response.json();
                // responseData에 서버로부터 받은 데이터가 포함되어 있음
                console.log('콤보 박스 데이터:', responseData);
                setSelectedResultInputData(responseData)
            } else {
                console.error('Failed to fetch data:', response.status);
                //여기서 컬럼 이름 알맞게 수정해달라구 바꾸기
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // 체크박스 데이터
    const fetchCheckTemplateData = async (selectedNames) => {
        const data  = {
            tableID: tableID,
            menuColumns: selectedNames
        }

        try {
            const response = await fetch(`${apiUrl}/api/template/tree`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('체크박스 데이터 :', responseData);
                setSelectedResultInputData(responseData)
            } else {
                console.error('Failed to fetch data:', response.status);
                //여기서 컬럼 이름 알맞게 수정해달라구 바꾸기
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchColumnData()
    }, []);

    return(
        <div className={styles.modalOverlay}>
            <div className={styles.templateDisplayContainer} >
                <div className={styles.templateContainer}>
                    <div className={`${styles.templatePreView} ${styles.scrollbar}`}>
                        {(!choiceInputContainerOpen || selectedResultInputData) &&
                            <TemplatePreViewLayout
                                templateName={templateLabel}
                                selectInputData={selectedResultInputData}
                                checkBoxData={selectedOptions}
                                tableID={tableID}
                            />
                        }

                    </div>
                    {(choiceInputContainerOpen && columnsData)&&
                        <TemplateInputUI optionBoxData ={columnsData}
                                         selectedOptions={selectedOptions} // 선택된 값
                                         setSelectedOptions={setSelectedOptions} // 선택된 값을 업데이트하는 함수
                                         setSelectedColumns={setSelectedColumns} // 선택된 값들을 처리하는 함수
                        />
                    }
                    {(!choiceInputContainerOpen && columnsData) &&
                        <TemplateCheckBoxUI checkboxData={columnsData}
                                            onSaveButtonClick={handleSelectedChecks}
                        />
                }
                </div>
                <div className={styles.closeButtonContainer}>
                    <button className={styles.downloadButton} onClick={() => setDisplayOpen(false)}> 다운로드 </button>
                    <button className={styles.closeButton} onClick={() => setDisplayOpen(false)}> 닫기 </button>
                </div>
            </div>
        </div>
    )
}