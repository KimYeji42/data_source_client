import React, {useEffect, useState} from 'react'; // React를 임포트해야 합니다.
import styles from '../memberManagementStyle.module.css';
import MemberTitleUi from "../uI/MemberTitleUi";
import ButtonUI from "../uI/ButtonUI";
import SmallTitleUI from "../uI/SmallTitleUI";
import ProfileUI from "../uI/ProfileUI";
import minus from '../../image/redMinus.png';
import plus from '../../image/bluePlus.png';
import SearchUserNameUI from "../uI/SearchUserNameUI";
import SendModalLayOut from "./SendModalLayOut";
import SuccessModalLayout from "./SuccessModalLayout";
import {useParams} from "react-router-dom";

export default function MemberBoxLayout({data , projectID}) {
    const [teamProfile , setTeamProfile] = useState(data)
    const [allProfiles , setAllProfiles] = useState([])
    const [sendMessage , setSendMessage] = useState("")
    const [isSendModalOpen , setIsSendModalOpen] = useState(false)
    const [isSuccessModalOpen , setIsSuccessModalOpen] = useState(false);

    const handleClick = (item) => {
        const newMembers = new Set([...teamProfile]);

        const userObject = {
            id: item.id,
            email:item.email,
            username:item.name,
            projectID: projectID
        }

        newMembers.add(userObject);

        setTeamProfile([...newMembers]);
    }
    const handleDelete = (item) => {
        const newMembers = new Set([...teamProfile]);
        newMembers.delete(item);
        setTeamProfile([...newMembers]);
    }

    const updateTeamProfile = () => {
        var team = ""

        teamProfile.forEach(function(element) {
            team += element.username || element.name
            team += "님 \t"
        });

        setSendMessage(`팀원을 다음과 같이 변경 하시겠습니까? ${team}`)
        setIsSendModalOpen(true)
    }

    const fetchData = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/profile`, {
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
                // 성공 메세지
                setIsSuccessModalOpen(true);
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
        <>
            <div className={styles.memberBox}>
                <div className={styles.titleBox}>
                    <MemberTitleUi text="협업자 관리"/>
                </div>

                <div className={styles.memberContainer}>
                    <div className={styles.memberSmallBox}>
                        <SmallTitleUI title="현재 참여자" className={styles.smallTitle} teamMemberCount={teamProfile.length}/>
                        <hr className={styles.hrStyle}/>
                        <div className={`${styles.profileBigBox} ${styles.scrollbar}`}>
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
                                {allProfiles.map((item , index) => {
                                    // teamProfile 배열에 있는 이메일과 현재 프로필의 이메일을 비교하여 동일한지 확인
                                    const isEmailMatched = teamProfile.some(profile => profile.email === item.email);

                                    // teamProfile 배열에 해당 이메일이 없는 경우에만 프로필을 출력
                                    if (!isEmailMatched) {
                                        return (
                                            <div className={styles.profileBox} key={item.id}>
                                                <ProfileUI
                                                    img={plus}
                                                    name={item.name}
                                                    email={item.email}
                                                    onClick={() => handleClick(item)}
                                                />
                                            </div>
                                        );
                                    } else {
                                        return null; // 이메일이 일치하는 경우 프로필을 출력하지 않음
                                    }
                                })}
                            </div>
                        )}


                    </div>
                </div>
                <div className={styles.buttonBox}>
                    <ButtonUI onClick={updateTeamProfile} children={"저장하기"} className={styles.button}/>
                </div>
            </div>

            <SendModalLayOut
                data={sendMessage}
                isOpen={isSendModalOpen}
                onClose={() => setIsSendModalOpen(false)}
                onClickEvent={sendToUpdateTeamProfile}
            />

            <SuccessModalLayout
                isOpen={isSuccessModalOpen}
                onClose={()=>setIsSuccessModalOpen(false)}
                data={"협업 변경에 성공하셨습니다."}
                clickLink={`/project/${projectID}`}
            />
        </>
    );
}
