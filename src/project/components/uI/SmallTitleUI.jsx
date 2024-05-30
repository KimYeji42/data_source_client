export default function SmallTitleUI({title,className ,teamMemberCount}){
    return(
        <div style={{display:"flex", justifyContent:"center" ,gap:"20%", width:"100%"}}>
            <h4 className={className}>{title}</h4>
            <div>{teamMemberCount}명</div>
        </div>
    )
}