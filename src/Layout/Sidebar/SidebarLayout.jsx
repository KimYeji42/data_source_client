import styles from './SidebarStyle.module.css';
import SidebarBox from "./SidebarBox";
export default function SidebarLayout(){
    return(
        <div>
            <div className={styles.sideBarContainer}>
                <div className={styles.sideBarBox}>
                    <div className={styles.titleContainer}>
                        <SidebarBox title="DataBase"/>
                    </div>
                </div>
            </div>

        </div>
    )
}