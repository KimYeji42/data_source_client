import styles from "../styles.module.css";
import {Image} from "react-bootstrap";

export default function ProjectTeamUI({membersData , deleteUserHandler}){
    return(
        membersData.map((user, index) => (
            <div key={index} className={styles.member}>
                <button onClick={() => deleteUserHandler(index)} className={styles.customButton}> </button>
                <Image src={"image/user.png"} />
                <div>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                </div>
            </div>
        ))
    )
}