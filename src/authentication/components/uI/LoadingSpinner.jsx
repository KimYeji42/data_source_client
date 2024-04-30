import React, { useState, useEffect } from 'react';
import '../styleModule/loagindSpinner.css';

const LoadingSpinner = ({ durationInSeconds }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (durationInSeconds > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, durationInSeconds * 1000);
            return () => clearTimeout(timer);
        }
    }, [durationInSeconds]);

    if (isVisible) return null;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="spinner"></div>
        </div>
    );
}

export default LoadingSpinner;
