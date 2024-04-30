import styles from "../../styleModule/styles.module.css";
import React, {useState, useEffect} from "react";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";

export default function ERDSidebarUi({ onSelect }) {
    const [project, setProject] = useState([]);
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1);

    const [error, setError] = useState(null);
    const [isErrorModalOpen, setErrorModalOpen] = useState(false);
    const [token, setToken] = useState(null);

    const handleRowClick = (projectId, index) => { // 프로젝트 선택
        console.log(projectId)
        setSelectedRowIndex(index);
        onSelect(projectId);
    };

    const projectData = async () => {
        try {
            if (token == null) return;

            const response = await fetch(`http://localhost:8080/api/history`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Token을 Header에 포함
                }
            });
            const responseData = await response.json();
            setProject(responseData);
            // console.log(responseData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token !== null) {
            setToken(token);
            return;
        }
        setError("로그인 후 진행해주세요!");
        setErrorModalOpen(true);
    }, []);

    useEffect(() => {
        projectData();
    }, [token]);

    return(
        <div className={styles.erdSidebarUi}>
            <h2 className={styles.erdSidebarTitle}>my project</h2>
            <div className={styles.projectSearchbarBox}>
                <input type="text" placeholder={"내 프로젝트 검색하기"} className={styles.projectSearchbar}/>
                <img src='../../image/Search.png'/>
            </div>

            <div>
                <ul className={styles.selectedProjectUl}>
                    {project && project.map((project, index) => (
                        <li key={index}
                            value={project.id}
                            className={
                                index === selectedRowIndex
                                    ? styles.selectedProjectLi
                                    : styles.projectLi
                            }
                            onClick={() => handleRowClick(project.id, index)}
                        >
                            {project.name}
                        </li>
                    ))}
                </ul>
            </div>

            <ErrorModal
                error={error}
                onClose={() => setErrorModalOpen(false)}
                isOpen={isErrorModalOpen}
            />
        </div>
    )
}