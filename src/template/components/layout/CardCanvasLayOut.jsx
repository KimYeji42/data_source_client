import CardDesign from "../uI/CardDesignUI";
import styles from '../../styleModule/canvas.module.css';
import DataContainerUI from "../uI/CardDataContainerUI";
import {useState} from "react";
export default function CardCanvasLayOut({ cardObjectData ,columnData }){
    const [data , setData] = useState({
        Title : [ {data:"Example Title"}],
        image : [ {data:"example Image"}],
        description :[{data:"Example Description"}]
    })

    return(
        <div className={styles.cardGrid}>
            {data.Title.map((item, index) => (
                <CardDesign
                    key={index}
                    title={item.data}
                    image={"https://via.placeholder.com/300x200"}
                    description={data.description[index].data}
                />
            ))}

            <DataContainerUI
                setSelectedValues={setData}
                selectionTitleList={cardObjectData}
                columnData ={columnData}
                data={data}
            />
        </div>
    )
}