import styles from "../../styleModule/styles.module.css";
import ERDSidebarUi from "../ui/ERDSidebarUi";
import {useState} from "react";
import ERDiagram from "../ui/ERDiagram";
import NetworkGraph from "../ui/NetworkGraph";

export default function ERDiagramLayout(){
    const [selectProjectId, setSelectProjectId] = useState(null);

    const selectedProjectId = (projectId) => {
        setSelectProjectId(projectId)
        // console.log(projectId)
    }

    return (
        <div className={styles.ERDSidebarLayout}>
            <ERDSidebarUi onSelect={selectedProjectId}/>
            <ERDiagram />
            {/*<NetworkGraph selectedProjectId={selectProjectId}/>*/}
        </div>
    )
}