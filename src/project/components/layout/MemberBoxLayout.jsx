import React, {useState} from 'react'; // React를 임포트해야 합니다.
import styles from '../memberManagementStyle.module.css';
import MemberTitleUi from "../uI/MemberTitleUi";
import ButtonUI from "../uI/ButtonUI";
import SmallTitleUI from "../uI/SmallTitleUI";
import ProfileUI from "../uI/ProfileUI";
import minus from '../../image/redMinus.png';
import plus from '../../image/bluePlus.png';

import SearchUserNameUI from "../uI/SearchUserNameUI";
import MembersData from "../data/MembersData";

export default function MemberBoxLayout({data}) {
    const [teamProfile , setTeamProfile] = useState([])

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


    return (
        <div>
            <div className={styles.memberBox}>
                <div className={styles.titleBox}>
                    <MemberTitleUi text="[프로젝트 이름] 협업자 관리"/>
                </div>

                <div className={styles.memberContainer}>
                    <div className={styles.memberSmallBox}>
                        <SmallTitleUI title="현재 참여자" className={styles.smallTitle} teamMemberCount={data.length}/>
                        <hr className={styles.hrStyle}/>
                        <div className={styles.profileBigBox}>
                            {data.map((item , index) => (
                                <div className={styles.profileBox}>
                                    <ProfileUI
                                        key={item.id}
                                        img={minus}
                                        name={item.username}
                                        email={item.email}
                                        onClick={() =>handleDelete(item)}                                    />
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className={styles.memberSmallBox}>

                        <div className={styles.searchBigBox}>
                            <SearchUserNameUI/>
                        </div>

                        <div className={styles.profileBigBox}>
                            {data.map((item , index) => (
                                <div className={styles.profileBox}>
                                    <ProfileUI key={item.id}
                                               img={plus}
                                               name={item.username}
                                               email={item.email}
                                               onClick={() => handleClick(item)}                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                <div className={styles.buttonBox}>
                    <ButtonUI children={"저장하기"} className={styles.button}/>
                </div>
            </div>

        </div>
    );
}
