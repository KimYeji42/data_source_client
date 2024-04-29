import MemberBoxLayout from "../layout/MemberBoxLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
        <div>
            {teamProfiles && <MemberBoxLayout data={teamProfiles} projectID={projectId} />}
        </div>
    );
}
