import styles from "../../styleModule/styles.module.css";
import ERDSidebarUi from "../ui/ERDSidebarUi";
import {useState} from "react";
import NetworkGraph from "../ui/NetworkGraph";

export default function ERDSidebarLayout(){
    const [selectProjectId, setSelectProjectId] = useState(null);

    const selectedProjectId = (projectId) => {
        setSelectProjectId(projectId)
        // console.log(projectId)
    }

    return (
        <div className={styles.ERDSidebarLayout}>
            <ERDSidebarUi onSelect={selectedProjectId}/>
            <NetworkGraph selectedProjectId={selectProjectId}/>
        </div>
    )
}