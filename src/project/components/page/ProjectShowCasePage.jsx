import styles from "../styles.module.css";
import ProjectCardLayOut from "../layout/ProjectCardLayOut";
import ProjectSideBarLayOut from "../layout/ProjectSideBarLayOut";
import LinkUI from "../uI/LinkUI";
import TitleUI from "../uI/TitleUI";
import ToggleButton from "../uI/ToggleButton";
import {useEffect, useState} from "react";
import ErrorModal from "../layout/ErrorModalLayOut";

export default function ProjectShowCasePage(){
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isErrorModalOpen, setErrorModalOpen] = useState(false);

    const getToken = () =>{
        const token = localStorage.getItem('token');
        if (token !== null){
            fetchData(token)
            return
        }
        setError("로그인 후 진행해주세요!")
        setErrorModalOpen(true)
    }
    const fetchData = async (token) => {
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const response = await fetch(`${apiUrl}/api/project`, {
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

    useEffect(() => {
        getToken()
    }, []);

    return(
        <div className={styles.projectShowCasePage}>
            <ProjectSideBarLayOut/>
            <div className={styles.showCase}>
                <TitleUI title={"프로젝트 선택"}/>
                <ToggleButton onLabel={"팀장"} offLabel={"전체"}/>
                <LinkUI text={"프로젝트 생성"} redirect={"/createProject"}/>
                <ProjectCardLayOut data={data}/>
            </div>
            <ErrorModal
                error={error}
                onClose={() => setErrorModalOpen(false)}
                isOpen={isErrorModalOpen}
            />
        </div>
    )
}