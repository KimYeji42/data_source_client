import CardUI from "../uI/CardUI";
import styles from "../styles.module.css";
import {useEffect} from "react";
export default function ProjectCardLayOut({data} ) {
    useEffect(() => {

    }, [data]);

    return (
        <div className={styles.cardLayOutBox}>

            {data && data.length > 0 && data.map((item) => (
                <CardUI
                    item={item}
                    key={item.id}
                    name={item.name}
                    comment={item.comment}
                    projectID={item.id}
                    dataBaseName={item.dataBaseName}
                />
            ))}
        </div>
    );
}
