import styles from "../../styleModule/MypageStyle.module.css";
import ProfilePhoto from "../ui/ProfilePhoto";
import UserName from "../ui/UserName";
import UserInformation from "../ui/UserInformation";

export default function ProfileLayout(){
    return(
        <div className={styles.profileContainer}>
            <ProfilePhoto/>
            <UserName Name="주동호"/>
            <UserInformation title="이름" value="주동호"/>
            <UserInformation title="이메일" value="abc@naver.com"/>
            <UserInformation title="전화번호" value="010-1234-1234"/>
        </div>
    )
}