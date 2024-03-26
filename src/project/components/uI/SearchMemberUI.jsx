import styles from "../styles.module.css";

export default function SearchMemberUI({ members , onClickMember}) {
    const handleClick = (member) => {
        onClickMember(member);
    };

    return (
        <div>
            {members.map((member, index) => (
                <div key={index} className={styles.searchGroup} onClick={() => handleClick(member)}>
                    <small>{member.name}</small><br/>
                    <small>{member.email}</small>
                </div>
            ))}
        </div>
    );
}