import styles from "../styles.module.css";
import React, {useEffect, useState} from "react";
import SearchMemberUI from "../uI/SearchMemberUI";

export default function MemberSearchLayout({ searchTitle , teamMemberAddHandler}){
    const [profiles , setProfiles] = useState([])

    const handleMemberClick = (member) => {
        console.log("Clicked member :", member);
        teamMemberAddHandler(member)
    };

    useEffect(() => {
        fetchProfiles()
    }, []);

    const fetchProfiles = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();

            const dataArray = Array.isArray(responseData) ? responseData : [responseData]; // 받은 데이터가 배열이 아니면 배열로 변환
            setProfiles(dataArray);

            // console.log(dataArray)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return(
        <div className={`${styles.searchComponent} `}>
            <div className={`"form-group"`}>
                <label htmlFor="projectNameForm"><h4 className={styles.formTitle}>{searchTitle}</h4></label>
                <input placeholder={"이름 또는 이메일을 검색하세요"} type="text" className={`form-control ${styles.inputForm}`} id={styles} />
                <div className={styles.searchMembers}>
                    {/* 클릭한 멤버를 SearchMemberUI 컴포넌트에 전달 */}
                    <SearchMemberUI members={profiles} onClickMember={handleMemberClick} />
                </div>
            </div>
        </div>
    )
}
