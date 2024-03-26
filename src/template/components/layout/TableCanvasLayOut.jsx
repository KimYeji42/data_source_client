import TableLayOut from "./TableLayOut";
import {tableExampleDataHead} from "../data/tableHeaderExampleData";
import {tableExampleDataInner} from "../data/tableExampleDataInner";
import {useEffect, useState} from "react";
import styles from '../../styleModule/canvas.module.css';
export default function TableCanvasLayOut(){
    const [selection, setSelection] = useState([]);

    useEffect(() => {
        console.log(selection);
    }, [selection]);

    return(
        <div className={styles.all}>
            <div className={styles.tableGrid}>
                <TableLayOut
                    headers={tableExampleDataHead}
                    items={tableExampleDataInner}
                    selectable={true}
                    updateSelection={setSelection}
                />
            </div>
        </div>
    )
}