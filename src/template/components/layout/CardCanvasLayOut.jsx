import styles from '../../styleModule/canvas.module.css';
import DataContainerUI from "../uI/CardDataContainerUI";
import { useState } from "react";
export default function CardCanvasLayOut({ tableID , columnData }){
    const [data , setData] = useState([]);
    const [templateData , setTemplateData] = useState(new Map());

    const fetchData = async (columnData) => {
        try {
            const response = await fetch(`http://localhost:8080/api/database/${tableID}/${columnData}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const dataConvertTemplateData = () => {
        console.log(data)
        data.forEach((item, index) => {
            fetchData(item);
        });
    };


    return(
        <div className={styles.cardGrid}>
            {/*{data.map((item, index) => (*/}
            {/*    <CardDesign*/}
            {/*        key={index}*/}
            {/*        title={item.data}*/}
            {/*        image={"https://via.placeholder.com/300x200"}*/}
            {/*        description={item.description}*/}
            {/*    />*/}
            {/*))}*/}

            <DataContainerUI
                dataChangeHandler={dataConvertTemplateData}
                setSelectedValues={setData}
                columnData ={columnData}
                data={data}
            />
        </div>
    )
}