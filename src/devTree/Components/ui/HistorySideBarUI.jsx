import styles from "../../styles/styles.module.css";

export default function  HistorySideBarUI(){
    const projectExampleData = [
        {
            id: 1,
            name: 'Database 1',
            project: {
                projectId: 1,
                projectName: 'Sample Project'
            }
        },
        {
            id: 2,
            name: 'Database 2',
            project: {
                projectId: 1,
                projectName: 'Sample Project'
            }
        },
        {
            id: 3,
            name: 'Database 3',
            project: {
                projectId: 1,
                projectName: 'Sample Project'
            }
        }
    ]
    return(
        <>
            <select className={styles.ProjectSelectBox}>
                {/*<option value="0" selected>프로젝트 선택</option>*/}
                {projectExampleData.map(project => (
                    <option key={project.id} value={project.id}>
                        {project.name}
                    </option>
                ))}
            </select>
            <div className={styles.HistorySideBar}>
                <div className={styles.HistorySideBarMenu}>
                    <p className={styles.HistorySideMenuState}>현재 상태</p>
                    <p className={styles.HistorySideMenuHistory}>히스토리</p>
                    <p className={styles.HistorySideMenuSearch}>커밋 선택</p>
                    <p className={styles.HistorySideMenuReqeust}>풀 리퀘스트</p>

                </div>

            </div>
        </>
    )
}