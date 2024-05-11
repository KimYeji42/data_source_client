import styles from "../../styles/styles.module.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


export default function HistorySideBarUI({ onSelect, defaultSelectedIndex, token }) {
    const [project, setProject] = useState([]); // 초기값을 일반 객체로 설정
    const [selectedProjectId, setSelectedProjectId] = useState(() => {
        return sessionStorage.getItem("selectedProjectId") || null;
    });
    const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex);

    const handleProjectChange = (e) => {
        const projectId = parseInt(e.target.value);
        setSelectedProjectId(projectId);
        sessionStorage.setItem("selectedProjectId", projectId);
        onSelect(projectId);
    };

    const projectData = async () => {
        try {
            if (token == null) return;

            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/history`, {
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
        if (project.length > 0 && sessionStorage.getItem("selectedProjectId") == null) {
            const defaultProjectId = project[0].id; // 첫 번째 프로젝트의 ID를 선택
            setSelectedProjectId(defaultProjectId); // 선택된 프로젝트 ID 설정
            sessionStorage.setItem("selectedProjectId", defaultProjectId);
            onSelect(defaultProjectId); // 선택된 프로젝트ID를 onSelect 콜백으로 전달
            return;
        }
        onSelect(selectedProjectId);
    }, [project]);

    useEffect(() => {
        projectData();
    }, [token]);

    const handleClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <select className={styles.ProjectSelectBox} value={selectedProjectId} onChange={handleProjectChange}>
                {project.map(project => (
                    <option key={project.id} value={project.id}>
                        {project.name}
                    </option>
                ))}
            </select>
            <div className={styles.HistorySideBar}>
                <div className={styles.HistorySideBarMenu}>
                    <Link className={selectedIndex === 0 ? `${styles.HistorySideMenuState} ${styles.selectedMenuItem}` : styles.HistorySideMenuState}
                       onClick={() => handleClick(0)} to="/status" >현재 상태</Link>
                    <Link className={selectedIndex === 1 ? `${styles.HistorySideMenuHistory} ${styles.selectedMenuItem}` : styles.HistorySideMenuHistory}
                       onClick={() => handleClick(1)} to="/History" >히스토리</Link>
                    <Link className={selectedIndex === 2 ? `${styles.HistorySideMenuSearch} ${styles.selectedMenuItem}` : styles.HistorySideMenuSearch}
                       onClick={() => handleClick(2)} to="/commit">커밋 검색</Link>
                </div>
            </div>
        </>

    );
}