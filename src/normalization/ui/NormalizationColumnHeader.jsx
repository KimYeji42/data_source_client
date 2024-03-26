
export default function NormalizationColumnHeader({columns , selectColumnData}){
    const handleColumnClick = (column) => {
        selectColumnData(column);
    };

    return(
        <tr>

            {columns.map((column , index) =>(
                <th key={index}>{column}
                    <input
                        type={"checkbox"}
                        onClick={() => handleColumnClick(column)}
                    />
                </th>
            ))}
        </tr>
    )
}