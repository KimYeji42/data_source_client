import {Image} from "react-bootstrap";
import styles from "../../styleModule/templateStyles.module.css";
import {useEffect, useState} from "react";
import TemplateDisPlay from "../layout/TemplateDisPlay";

export default function TemplateCardUI({imageURL , templateTitle , tableID , templateStatus}){
    const [isTemplateDisPlayOpen , setIsTemplateDisPlayOpen] = useState(false)
    const [choiceInputContainerOpen , setChoiceInputContainerOpen] = useState(false)

    useEffect(() => {
        if (templateTitle === "CARD Template"){
            setChoiceInputContainerOpen(true)
        }
        if (templateTitle === "Bar Template"){
            setChoiceInputContainerOpen(true)
        }
    }, []);

    return (
        <div>
            <div className={styles.inBox} onClick={() => setIsTemplateDisPlayOpen(true)}>
                <Image className={styles.inBoxImage} src={imageURL} />
                <p>{templateTitle}</p>
            </div>
            {isTemplateDisPlayOpen &&
                <TemplateDisPlay
                    setDisplayOpen={setIsTemplateDisPlayOpen}
                    choiceInputContainerOpen={choiceInputContainerOpen}
                    templateLabel={templateTitle}
                    tableID = {tableID}
                    templateStatus = {templateStatus}
                />
            }
        </div>
    )
}