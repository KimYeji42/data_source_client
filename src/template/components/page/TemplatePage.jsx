import TitleUI from "../../../project/components/uI/TitleUI";
import styles from "../../styleModule/templateStyles.module.css";
import Toggle from "../uI/Toggle";
import TemplateCardUI from "../uI/TemplateCardUI";
import React, { useState } from "react";
import ComponentTemplateData from "../data/ComponentTemplateData";
import WebTemplateData from "../data/WebTemplateData";
import {Link, useParams} from "react-router-dom";
import stylesRest from "../../../devSource/styleModule/restAPIBuilder.module.css";
// 새로운 데이터 파일 임포트

export default function TemplatePage() {
    const {tableID} = useParams()
    const [templateStatus, setTemplateStatus] = useState(false);

    // templateStatus에 따라 사용할 데이터를 선택
    const dataToDisplay = templateStatus ? WebTemplateData : ComponentTemplateData;

    return (
        <div>
            <div className={styles.templateTitle}>
                <Link to={`/table/${tableID}`} className={stylesRest.toggleContainer}>
                    돌아가기
                </Link>
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
