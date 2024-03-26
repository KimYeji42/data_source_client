import styles from "../styles.module.css";
import {Image} from "react-bootstrap";

export default function CollborativeUsers({teamProfile}){
    return (
        <div  style={{ overflowY: 'scroll',overflowX: 'hidden', height: '230px'}}>
            <ul>
                {teamProfile && teamProfile.map(member => (
                    <li key={member.id} style={{listStyleType: "none"}}>
                        <div className={styles.CollaborativeUser}>
                            <Image src={"../image/user.png"} className={styles.CollaborativeUserProfile}/>
                            <small className={styles.CollaborativeUserName}>{member.username}</small>
                        </div>
                        <p className={styles.CollaborativeUserTotal}> 총 협업자 수 :  {teamProfile.length}</p>
                    </li>
                ))}
            </ul>
        </div>
    );


}

