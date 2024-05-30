import styles from '../../styleModule/ButtonStyle.module.css';

export default function Button_UI ({image, onClick, title }) {
    return <li className={styles.buttonContainer}>
        <button onClick={onClick} title={title}>
            <img src={image} alt="Button"/>
        </button>

    </li>

}