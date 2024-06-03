import styles from "../../styleModule/ColumnAppendModalStyle.module.css";
import React, {useState} from "react";
import stylesCreateTable from '../../styleModule/createTableStyle.module.css';
import TitleUI from "../../../project/components/uI/TitleUI";


export default function ColumnAppendModalUI({isOpen , closeModal , columns , tableID}){
    const [appendColumn , setAppendColumn] = useState()
    if (!isOpen) return null;

    return(
        <div className={styles.modalOverlay}>
            <div className={styles.columnAppendContainer}>
                <TitleUI title={"컬럼 추가"}/>
                <table className={stylesCreateTable.selectHeaderTable}>
                    <thead>
                    <tr>
                        <th>컬럼 이름</th>
                        <th>데이터 타입</th>
                        <th>PK</th>
                        <th>FK</th>
                        <th>UK</th>
                    </tr>
                    </thead>
                    <tbody id="tableBody">
                        <tr>
                            <td style={{width: '250px'}}>
                                <input type="text" name="columnName" style={{border:"none"}}/>
                            </td>
                            <td style={{width: '200px'}}>
                                <select name="dataType"
                                        className={stylesCreateTable.inputDataType}>
                                    <option value="TEXT">TEXT</option>
                                    <option value="INTEGER">INTEGER</option>
                                    <option value="REAL">REAL</option>
                                    <option value="MediaFile">MediaFile</option>
                                </select>
                            </td>
                            <td style={{width: '50px'}}>
                                <input type="checkbox" name="pk"/>
                            </td>
                            <td style={{width: '50px'}}>
                                <input type="checkbox" name="fk"/>
                            </td>
                            <td style={{width: '50px'}}>
                                <input type="checkbox" name="uk" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className={styles.closeButtonContainer}>
                    <button onClick={() => closeModal(false)} className={styles.sendButton}>추가</button>

                    <button onClick={() => closeModal(false)} className={styles.closeButton}>닫기</button>
                </div>
            </div>
        </div>
    )
}