import TitleUI from "../../../project/components/uI/TitleUI";
import styles from "../../styleModule/templateStyles.module.css";
import Toggle from "../uI/Toggle";
import TemplateCardUI from "../uI/TemplateCardUI";
import React, { useState } from "react";
import ComponentTemplateData from "../data/ComponentTemplateData";
import WebTemplateData from "../data/WebTemplateData";
import {useParams} from "react-router-dom";
import HeaderBottom from "../../../Layout/HeaderBottom/HeaderBottom";
// 새로운 데이터 파일 임포트

export default function TemplatePage() {
    const {dataBaseID, tableID} = useParams()
    const [templateStatus, setTemplateStatus] = useState(false);

    // templateStatus에 따라 사용할 데이터를 선택
    const dataToDisplay = templateStatus ? WebTemplateData : ComponentTemplateData;

    return (
        <div>
            <HeaderBottom title={"템플릿"} titleList={["프로젝트 목록", "프로젝트", "데이터베이스", "테이블"]} linkList={["/projects", `/project/${dataBaseID}`, `/tables/${dataBaseID}`, `/table/${dataBaseID}/${tableID}`]}/>
            <div className={styles.templateTitle}>
                <TitleUI title={"NDS Template"}/>
                <Toggle templateStatus={templateStatus} setTemplateStatus={setTemplateStatus} />
            </div>
            <div className={styles.templateContainer}>
                {dataToDisplay.map((template, index) => (
                    <TemplateCardUI
                        key={index}
                        templateTitle={template.title}
                        imageURL={template.image}
                        templateClickLink={template.title}
                        tableID = {tableID}
                        templateStatus = {templateStatus}
                    />
                ))}
            </div>
        </div>
    );
}
