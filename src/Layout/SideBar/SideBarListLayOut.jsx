import {useState} from "react";
import SideBarModal from "../Modal/SideBarModalComponent";
export default function SideBarListLayOut({title , tables}){
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [table , setTable] = useState()
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const onClickHandler = (item) =>{
        console.log(`${item.id} ${item.name}`)
        setTable(item)
        setIsSuccessModalOpen(true)
    }
    const handleCreate = () => {
        setIsSuccessModalOpen(false);
    };
    const redirectToTables = () => {

        console.log("클릭")
    };

    return(
        <li className="list">
            <a href="#" className="nav-link" onClick={handleToggleMenu}>
                <h5 className="link">{title}</h5>
                <h4>{isOpen ? '▼' : '▲' }</h4>
            </a>
            <ul className={`menu ${isOpen ? 'open' : ''}`}>
                {tables.map((table, index) => (
                    <li onClick={() => onClickHandler(table)} key={table.id}>{table.name}</li>
                ))}
            </ul>
            <SideBarModal
                data={table}
                isOpen={isSuccessModalOpen}
                header={" [ Table ]"}
                onClick = {redirectToTables}
                onCreate={handleCreate}
                onClose={() => setIsSuccessModalOpen(false)}
            />
        </li>
    )
}