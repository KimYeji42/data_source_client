import TableLayout from "../layout/TableLayout";
import TableTitleUI from "../ui/TableTitleUI";
import SideBarComponent from "../../../Layout/SideBar/SideBarComponent";
import styles from '../../styleModule/ColumnStyle.module.css';
import DownloadUI from "../ui/DownloadUI";

export default function TablePage() {
    return(
        <div>
            <div className={styles.tablePage}>
                <SideBarComponent/>
                <div style={
                    {
                        width : '60%' ,
                        margin : "3% auto",
                    }
                }>
                    <TableTitleUI title={"[ 프로젝트명 ]"} subTitle={"-[테이블명] Table"}/>
               </div>
                <DownloadUI/>
                <TableLayout/>
            </div>
        </div>

    )
}
