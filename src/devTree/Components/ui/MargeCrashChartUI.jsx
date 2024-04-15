import styles from "../../styles/styles.module.css";
import React from "react";

export default function MargeCrashChartUI() {
    return(
        <>
            <div className={styles.MergeChartBack}>
                <table className={styles.CommitChart}>
                    <thead>
                    <tr className={styles.MergeChartTitle}>
                        <th scope="col" className={styles.MergeChartTitleNow}>선택</th>
                        <th scope="col" className={styles.MergeChartTitleMsg}>이름</th>
                        <th scope="col" className={styles.MergeChartTitleDate}>이메일</th>
                        <th scope="col" className={styles.MergeChartTitleWriter}>나이</th>
                        <th scope="col" className={styles.MergeChartTitleNum}>성별</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.MergeChartContent}>
                            <td><input type="radio" name={"first"}/></td>
                            <td>[이름]</td>
                            <td>[이메일]</td>
                            <td>[나이]</td>
                            <td>[성별]</td>
                        </tr>
                        <tr className={styles.MergeChartContent}>
                            <td><input type="radio" name={"first"}/></td>
                            <td>[이름]</td>
                            <td>[이메일]</td>
                            <td>[나이]</td>
                            <td>[성별]</td>
                        </tr>
                    {/*))}*/}
                    </tbody>
                </table>
            </div>
        </>
    );

}