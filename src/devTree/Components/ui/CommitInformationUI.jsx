import styles from "../../styles/styles.module.css";
import {useEffect, useState} from "react";

export default function CommitInformationUI({projectId}){
    const [commit, setCommit] = useState(null);

    const checkoutCommit = async () => {
        try {
            if (!projectId) return
            const response = await fetch(`http://localhost:8080/api/commit/checkout/${projectId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setCommit(responseData);
            console.log(responseData)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        setCommit(null)
        checkoutCommit();
    }, [projectId]);

    return (
        <div>
            <div className={styles.smailSelectBox}>
                <h5 className={styles.selectTitleBox}>Information</h5>
                    {commit && (
                        <ul className={styles.informationData} style={{paddingLeft: '10px'}}>
                            <li>커밋 해시코드 : {commit.commitHashCode}</li>
                            <li>작성자 : {commit.createUsername}</li>
                            <li>날짜 : {commit.createTime}</li>
                            <li>커밋 메세지 : {commit.comment}</li>
                        </ul>
                    )}
            </div>
        </div>
    )
}