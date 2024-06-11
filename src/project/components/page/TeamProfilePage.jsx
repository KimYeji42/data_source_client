import MemberBoxLayout from "../layout/MemberBoxLayout";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from '../memberManagementStyle.module.css';
import HeaderBottom from "../../../Layout/HeaderBottom/HeaderBottom";

export default function TeamProfilePage() {
    const { projectId } = useParams();
    const [teamProfiles, setTeamProfiles] = useState(null);

    const fetchData = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/teamProfile/${projectId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setTeamProfiles(responseData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <HeaderBottom title={"협업 관리"} titleList={["프로젝트 목록", "프로젝트"]} linkList={["/projects", `/project/${projectId}`]}/>
            {teamProfiles && <MemberBoxLayout data={teamProfiles} projectID={projectId} />}
        </>
    );
}
