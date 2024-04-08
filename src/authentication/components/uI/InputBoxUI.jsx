import styles from '../styleModule/joinStyles.module.css'

export default function InputBoxUI({ label, onChange, value }) {
    return (
        <div>
            {/*<label className={styles.joinLabel}>{label}:</label>*/}
            <input className={styles.joinInputBox}
                   type="text" value={value}
                   onChange={(e) => onChange(e.target.value)} required
                   placeholder={label}
            />
        </div>
    );
}
