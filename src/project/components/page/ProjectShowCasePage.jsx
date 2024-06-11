import styles from "../styles.module.css";
import ProjectCardLayOut from "../layout/ProjectCardLayOut";
import ProjectSideBarLayOut from "../layout/ProjectSideBarLayOut";
import LinkUI from "../uI/LinkUI";
import TitleUI from "../uI/TitleUI";
import ToggleButton from "../uI/ToggleButton";
import { useEffect, useState } from "react";
import ErrorModal from "../layout/ErrorModalLayOut";
import HeaderBottom from "../../../Layout/HeaderBottom/HeaderBottom";

export default function ProjectShowCasePage() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isErrorModalOpen, setErrorModalOpen] = useState(false);

    const fetchProjectData = async (token,endpoint) => {
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const response = await fetch(`${apiUrl}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Token을 Header에 포함
                }
            });
            if (response.ok) {
                const responseData = await response.json();
                const dataArray = Array.isArray(responseData) ? responseData : [responseData];
                setData(dataArray);
                console.log(dataArray);
            } else {
                throw new Error('프로젝트 데이터를 가져오는데 실패했습니다.');
            }
        } catch (error) {
            console.error('데이터 가져오는 중 에러 발생:', error);
            setError('프로젝트 데이터를 가져오는데 실패했습니다.');
            setErrorModalOpen(true);
        }
    };

    const changeAllMode = () =>{
        const token = localStorage.getItem('token');
        const endpoint = '/api/project/all'; // 팀원모드

        fetchProjectData(token,endpoint)
    }

    const changeLeaderMode = () =>{
        const token = localStorage.getItem('token');
        const endpoint = '/api/project'; // 팀장모드

        fetchProjectData(token , endpoint)
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const endpoint = '/api/project/all'; // 팀원모드

        if (token !== null) {
            fetchProjectData(token,endpoint); // 팀장 모드 여부에 따라 다른 데이터를 가져오도록 함
            return;
        }
        setError("로그인 후 진행해주세요!");
        setErrorModalOpen(true);
    }, []); // 팀장 모드가 변경될 때마다 데이터를 다시 가져옴

    return (
        <>
            <HeaderBottom title={"프로젝트 목록"}/>
            <div className={styles.projectShowCasePage}>
                <div className={styles.showCase}>
                    <div className={styles.projectTitleContainer}>
                        <TitleUI title={"프로젝트"} />
                    </div>
                    <ToggleButton
                        onLabel={"팀장"}
                        offLabel={"전체"}
                        onToggleOff={changeAllMode}
                        onToggleOn={changeLeaderMode}
                    />
                    <LinkUI text={"프로젝트 생성"} redirect={"/createProject"} />
                    <ProjectCardLayOut data={data} />
                </div>
                <ErrorModal
                    error={error}
                    onClose={() => setErrorModalOpen(false)}
                    isOpen={isErrorModalOpen}
                />
            </div>
        </>

    );
}
