import React, {useEffect, useState} from 'react'; // React를 임포트해야 합니다.
import styles from '../memberManagementStyle.module.css';
import MemberTitleUi from "../uI/MemberTitleUi";
import ButtonUI from "../uI/ButtonUI";
import SmallTitleUI from "../uI/SmallTitleUI";
import ProfileUI from "../uI/ProfileUI";
import minus from '../../image/redMinus.png';
import plus from '../../image/bluePlus.png';
import SearchUserNameUI from "../uI/SearchUserNameUI";

export default function MemberBoxLayout({data , projectID}) {
    const [teamProfile , setTeamProfile] = useState(data)
    const [allProfiles , setAllProfiles] = useState([])
    const handleClick = (item) => {
        const newMembers = new Set([...teamProfile]);
        newMembers.add(item);
        setTeamProfile([...newMembers]);
    }
    const handleDelete = (item) => {
        const newMembers = new Set([...teamProfile]);
        newMembers.delete(item);
        setTeamProfile([...newMembers]);
    }
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setAllProfiles(responseData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const sendToUpdateTeamProfile = async () => {
        let obj = {
            projectID : projectID,
            teamProfiles : teamProfile
        };

        try {
            const response = await fetch('http://localhost:8080/api/teamProfile/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            if (response.ok) {
                const responseData = await response.text();
                console.log('Data sent successfully:', responseData);
                console.log(responseData)

            } else {
                const errorData = await response.json();
                console.log(errorData)
            }
            console.log(obj)
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };
    useEffect(() => {
        fetchData()
    }, []);
    return (
        <div>
            <div className={styles.memberBox}>
                <div className={styles.titleBox}>
                    <MemberTitleUi text="[프로젝트 이름] 협업자 관리"/>
                </div>

                <div className={styles.memberContainer}>
                    <div className={styles.memberSmallBox}>
                        <SmallTitleUI title="현재 참여자" className={styles.smallTitle} teamMemberCount={teamProfile.length}/>
                        <hr className={styles.hrStyle}/>
                        <div className={styles.profileBigBox}>
                            {teamProfile.map((item , index) => (
                                <div className={styles.profileBox}>
                                    <ProfileUI
                                        key={item.id}
                                        img={minus}
                                        name={item.name ? item.name : item.username} // name이 null이면 userName 사용
                                        email={item.email}
                                        onClick={() =>handleDelete(item)}
                                    />
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className={styles.memberSmallBox}>

                        <div className={styles.searchBigBox}>
                            <SearchUserNameUI/>
                        </div>

                        {allProfiles.length > 0 && (
                            <div className={styles.profileBigBox}>
                                {allProfiles.map((item , index) => (
                                    <div className={styles.profileBox} key={item.id}>
                                        <ProfileUI
                                            img={plus}
                                            name={item.name}
                                            email={item.email}
                                            onClick={() => handleClick(item)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
                <div className={styles.buttonBox}>
                    <ButtonUI onClick={sendToUpdateTeamProfile} children={"저장하기"} className={styles.button}/>
                </div>
            </div>

        </div>
    );
}
