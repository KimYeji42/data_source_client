import styles from '../../styleModule/cardDesignStyle.module.css'
import {Image} from "react-bootstrap";
export default function TemplatePreViewLayout({ templateName  , selectInputData , checkBoxData , tableID}) {
    let templateDesign = null;


    switch (templateName.toUpperCase()) {
        case "CARD TEMPLATE": {
            templateDesign = (
                <div className={styles.cardContainer}>
                    {selectInputData.map((card, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.cardImageContainer}>
                                <img src={card.image} alt={card.title} />
                            </div>
                            <div className={styles.cardContent}>
                                <h2 className={styles.cardTitle}>{card.title}</h2>
                                <p className={styles.cardDescription}>{card.description}</p>
                            </div>
                            <div className={styles.cardButtonContainer}>
                                <button className={styles.cardButton}>버튼</button>
                            </div>
                        </div>
                    ))}
                </div>

            );
            break;
        }
        case "BAR TEMPLATE": {
            // Bar Template에 대한 처리
            templateDesign = (
                <div>
                    {/* Bar Template의 디자인 */}
                    <h2>Bar Template Design</h2>
                    {/* 추가적인 UI 요소들 */}
                </div>
            );
            break;
        }
        case "LIST TEMPLATE": {
            // List Template에 대한 처리
            templateDesign = (
                <div>
                    {/* List Template의 디자인 */}
                    <h2>List Template Design</h2>
                    {/* 추가적인 UI 요소들 */}
                </div>
            );
            break;
        }
        case "TREE TEMPLATE": {
            // Tree Template에 대한 처리
            templateDesign = (
                <div>
                    {/* Tree Template의 디자인 */}
                    <h2>Tree Template Design</h2>
                    {/* 추가적인 UI 요소들 */}
                </div>
            );
            break;
        }
        case "TABLE TEMPLATE": {
            // Table Template에 대한 처리
            templateDesign = (
                <div>
                    {/* Table Template의 디자인 */}
                    <h2>Table Template Design</h2>
                    {/* 추가적인 UI 요소들 */}
                </div>
            );
            break;
        }
        default: {
            // 해당하는 템플릿이 없는 경우의 처리
            templateDesign = (
                <div>
                    <h2>Template Not Found</h2>
                    <p>해당하는 템플릿이 없습니다.</p>
                </div>
            );
            break;
        }
    }


    return (
        <div className={styles.templateDraw}>
            {templateDesign}
        </div>
    );
}
