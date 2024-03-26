import styles from '../../styleModule/ButtonStyle.module.css';

export default function Button_UI ({image,onClick}) {
    return <li className={styles.buttonContainer}>
        <button onClick={onClick}>
            <img src={image} alt="Button"/>
        </button>

    </li>

}