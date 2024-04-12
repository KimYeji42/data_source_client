import styles from '../../styleModule/canvas.module.css';
import DataContainerUI from "../uI/CardDataContainerUI";
import { useState } from "react";
import CardDesignUI from "../uI/CardDesignUI";

export default function CardCanvasLayOut({ tableID , columnData }) {
    const [data , setData] = useState([]);
    const [templateData , setTemplateData] = useState([])
    const convertTemplateData = async (obj) => {
        console.log(obj)
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/template/card`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj) // JSON 문자열로 변환하여 전달
            });
            const responseData = await response.json();
            console.log(responseData)
            setTemplateData(responseData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const dataConvertCardTemplateData = async () => {
        console.log(data)
        if (data.title !== undefined || data.description !== undefined){
            let obj = {
                tableID: tableID,
                title: data.Title, // selectData로 변경
                description: data.description // selectData로 변경
            }

            await convertTemplateData(obj); // convertTemplateData가 완료될 때까지 기다림

            console.log(templateData)
        }

    };
    const exampleData = [
        {
        title: "Example Title",
        description:"Example description"
    }
    ]
    return (
        <div className={styles.cardGrid}>
            {templateData.length > 0 ? (
                templateData.map((item, index) => (
                    <CardDesignUI
                        key={index}
                        title={item.title.data}
                        image={"https://via.placeholder.com/300x200"}
                        description={item.description.data}
                    />
                ))
            ) : (
                exampleData.map((item, index) => (
                    <CardDesignUI
                        key={index}
                        title={item.title}
                        image={"https://via.placeholder.com/300x200"}
                        description={item.description}
                    />
                ))
            )}




            <DataContainerUI
                dataChangeHandler={dataConvertCardTemplateData}
                setSelectedValues={setData}
                columnData ={columnData}
                data={data}
            />
        </div>
    );

}
