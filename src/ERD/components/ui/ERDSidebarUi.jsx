import styles from "../../styleModule/styles.module.css";
import React, {useState, useEffect} from "react";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";

export default function ERDSidebarUi({ onSelect }) {
    const [project, setProject] = useState([]);
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1);

    const [error, setError] = useState(null);
    const [isErrorModalOpen, setErrorModalOpen] = useState(false);
    const [token, setToken] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleRowClick = (projectId, index) => { // 프로젝트 선택
        console.log(projectId)
        setSelectedRowIndex(index);
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

    const filteredProjects = project.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
        <div className={styles.erdSidebarUi}>
            <p className={styles.erdSidebarTitle}>프로젝트 목록</p>
            {/*<div className={styles.projectSearchbarBox}>*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        placeholder={"내 프로젝트 검색하기"}*/}
            {/*        className={styles.projectSearchbar}*/}
            {/*        value={searchTerm}*/}
            {/*        onChange={(e) => setSearchTerm(e.target.value)}*/}
            {/*    />*/}
            {/*    <img src='../../image/Search.png'/>*/}
            {/*</div>*/}
            <div>
                <ul className={styles.selectedProjectUl}>
                    {filteredProjects.map((project, index) => (
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
