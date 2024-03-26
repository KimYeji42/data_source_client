import SmallSizeTitleUI from "../ui/SmallSizeTitleUI";
import styles from "../../styles/styles.module.css"
import SelectionUI from "../ui/SelectionUI";
import membersData from "../../../project/components/data/MembersData";
import ChangeTableLayout from "./ChangeTableLayout";
export default function ChangeCommitLayOut(){
    return(
        <div>
            <div className={styles.changeCommitBox}>
                <SmallSizeTitleUI smailTitle={"선택한 커밋의 변경사항"}/>
                <div style={{display : "flex" , justifyContent : "left"}}>
                    <div className={styles.selectBox}>
                        <SelectionUI title={"Front Client"} data={membersData}/>
                        <SelectionUI title={"Back Data"} data={membersData}/>
                    </div>
                    <div className={styles.changeTableBox}>
                        <ChangeTableLayout/>
                    </div>
                </div>
            </div>
        </div>
    )
}