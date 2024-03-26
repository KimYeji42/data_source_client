import SideBarListLayOut from "./SideBarListLayOut";
import { useEffect, useState } from "react";

export default function SideBarContentLayOut({ tableStatus }) {
    const [isAllTables, setIsAllTables] = useState([]);
    const [isDeleteTables, setIsDeleteTables] = useState([]);
    const [isFavoriteTables, setIsFavoriteTables] = useState([]);

    useEffect(() => {
        if (tableStatus) {// tableStatus 가 정의 되어 있을 때만 실행되도록 설정
            setTableStatus();
        }
    }, [tableStatus]);

    function setTableStatus() {
        setIsAllTables(tableStatus.isAllTables);
        setIsDeleteTables(tableStatus.isDeleteTables);
        setIsFavoriteTables(tableStatus.isFavoriteTables);
    }

    return (
        <div className="sidebar-content">
            <ul className="lists">
                <SideBarListLayOut title={"테이블 목록"} tables={isAllTables} />
                <SideBarListLayOut title={"즐겨찾기 목록"} tables={isFavoriteTables} />
                <SideBarListLayOut title={"삭제 목록"} tables={isDeleteTables} />
            </ul>
        </div>
    );
}
