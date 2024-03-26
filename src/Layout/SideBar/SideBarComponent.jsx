import './style.css'
import LogoUI from "./LogoUI";
import SideBarContentLayOut from "./SideBarContentLayOut";
import {useEffect, useState} from "react";

export default function SideBarComponent(){
    const [databaseTableStatusList, setDatabaseTableStatusList] = useState();
    const [dataBaseID , setDataBaseID] = useState(1)

    const fetchTablesStatus = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/table/status/${dataBaseID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();

            setDatabaseTableStatusList(responseData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchTablesStatus();
    }, []);

    return(
        <div>
            <nav>
                <div className="sidebar">
                    <LogoUI/>
                    <SideBarContentLayOut tableStatus={databaseTableStatusList}/>
                </div>
            </nav>
        </div>
    )
}