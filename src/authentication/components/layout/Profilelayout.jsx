import styles from "../styleModule/MypageStyle.module.css";
import ProfilePhoto from "../uI/ProfilePhoto";
import UserName from "../uI/UserName";
import UserInformation from "../uI/UserInformation"

export default function ProfileLayout(){
    return(
        <div className={styles.profilelatout}>
            <ProfilePhoto/>
            <UserName Name="주동호" />
            <UserInformation title="이름" value="주동호"/>
            <UserInformation title="전화번호" value="010-1234-1234"/>

        </div>
    )
}