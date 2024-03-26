import MemberBoxLayout from "../layout/MemberBoxLayout";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function TeamProfilePage(){
    const { projectId } = useParams();
    const [teamProfiles , setTeamProfiles] = useState()

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/teamProfile/${projectId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            console.log(responseData)
            setTeamProfiles(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData()
    }, []);

    return(
        <div>
            <MemberBoxLayout data={teamProfiles}/>
        </div>
    )
}