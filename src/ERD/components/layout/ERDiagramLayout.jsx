import styles from "../../styleModule/styles.module.css";
import {useEffect, useState} from "react";
import ERDiagramUi from "../ui/ERDiagramUi";
import ERDSidebarUi from "../ui/ERDSidebarUi";

export default function ERDiagramLayout(){
    const [selectProjectId, setSelectProjectId] = useState(0);
    const [erdJsonData , setErdJsonData] = useState(null)

    const selectedProjectId = (projectId) => {
        setSelectProjectId(projectId)
        // console.log(projectId)
    }

    useEffect(() => {
        if (selectProjectId !== 0) {
            const erdDrawData = async () => {
                try {
                    const apiUrl = process.env.REACT_APP_API_URL;
                    const response = await fetch(`${apiUrl}/api/diagram/${selectProjectId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    const responseData = await response.json();
                    setErdJsonData(responseData);
                    console.log(responseData); // 여기서 값 확인
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            erdDrawData();
        }
    }, [selectProjectId]);

    return (
        <div className={styles.ERDSidebarLayout}>
            <ERDSidebarUi onSelect={selectedProjectId}/>
            <div className={styles.erdBox} />
            <div className={styles.erdProjectViewBox} />
            {erdJsonData && <ERDiagramUi jsonData={erdJsonData} />}
        </div>
    )
}