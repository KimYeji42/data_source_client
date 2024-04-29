import styles from "../../styleModule/styles.module.css";
import { useEffect, useState } from "react";

export default function SelectedNodeTableUi({ selectedTableId }) {
    const [tableName, setTableName] = useState("");
    const [tableColumns, setTableColumns] = useState([]);

    const diagramColumnData = async () => {
        try {
            if (selectedTableId == null) return;

            const response = await fetch(`http://localhost:8080/diagram/columns/${selectedTableId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setTableName(responseData.tableName);
            setTableColumns(responseData.columns);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        setTableName("");
        setTableColumns([]);
        diagramColumnData();
    }, [selectedTableId]);

    return(
        <div>
            <div className={styles.SelectedNodeTableBox}>
                <h3 className={styles.SelectedTableName}>{tableName && tableName}</h3>
                <table className={styles.SelectedNodeTable}>
                    <thead>
                    {tableColumns && tableColumns.map((column, index) => {
                        if (column.type === "PK") {
                            return (
                                <tr key={index}>
                                    <td>{column.type}</td>
                                    <td>{column.name}</td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                    </thead>
                    <tbody>
                    {tableColumns && tableColumns.map((column, index) => {
                        if (column.type !== "PK") {
                            return (
                                <tr key={index}>
                                    <td>{column.type}</td>
                                    <td>{column.name}</td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
