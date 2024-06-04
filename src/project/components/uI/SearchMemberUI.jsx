import styles from "../styles.module.css";

export default function SearchMemberUI({ members , onClickMember}) {
    const handleClick = (member) => {
        onClickMember(member);
    };

    return (
        <div className={styles.searchMemberUI}>
            {members.map((member, index) => (
                <div key={index} className={styles.searchGroup} onClick={() => handleClick(member)}>
                    {member.name}<br/>
                    <small>{member.email}</small>
                </div>
            ))}
        </div>
    );
}