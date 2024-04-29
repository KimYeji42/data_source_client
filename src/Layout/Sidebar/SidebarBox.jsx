import React, { useState } from 'react';
import styles from './SidebarStyle.module.css';
import './sideBar.css';
import Accordion from 'react-bootstrap/Accordion';
import {useParams} from "react-router-dom";

function SidebarBox({ title }) {
    const [isOpen, setIsOpen] = useState(false);

    const {dataBaseID} = useParams()
    const [tableList, setTableList] = useState(null);

    const handleToggleMenu = () => {
        fetchData();
        setIsOpen(!isOpen);
    };

    const fetchData = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:8080/api/table/status/${dataBaseID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // 토큰을 Bearer 스킴으로 헤더에 포함
                }
            });
            const responseData = await response.json();
            console.log(responseData);
            setTableList(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <div className={styles.sideBarBox}>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item style={{ height: "70px" }}>
                        <div className={styles.titleBox} onClick={handleToggleMenu}>
                            {title}
                            <button type="button">{isOpen ? '▼' : '▶'}</button>
                        </div>
                    </Accordion.Item>
                    {tableList && isOpen && (
                        <Accordion defaultActiveKey={null}>
                            {tableList.map((item, index) => (
                                <Accordion.Item key={index} eventKey={index.toString()}>
                                    <Accordion.Header>
                                        <div className={styles.listTitleContainer}>
                                            {item.title}
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body style={{ backgroundColor: "#249ADD", color: "white" }}>
                                        <div className={styles.smallList} >
                                            {item.items.map((subItem, index) => (
                                                <li key={index}>{subItem}</li>
                                            ))}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    )}
                </Accordion>
            </div>
        </div>
    );
}

export default SidebarBox;
