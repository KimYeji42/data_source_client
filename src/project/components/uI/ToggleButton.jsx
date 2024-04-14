import React, { useState } from 'react';
import styles from '../ToggleButton.module.css';

const ToggleButton = ({ onLabel, offLabel, onToggleOn, onToggleOff }) => {
    const [isOn, setIsOn] = useState(false);

    const handleClick = () => {
        setIsOn(prevState => !prevState);
        if (isOn) {
            onToggleOff && onToggleOff();
        } else {
            onToggleOn && onToggleOn();
        }
    };

    return (
        <button className={`${styles.toggleButton} ${isOn ? styles.on : styles.off}`} onClick={handleClick}>
            {isOn ? onLabel : offLabel}
        </button>
    );
};

export default ToggleButton;
