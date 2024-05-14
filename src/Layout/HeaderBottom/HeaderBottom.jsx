import React from "react";

export default function HeaderBottom({title}) {
    const headerBottomStyle = {
        height: '0.5rem',
        margin: '0 auto',
        padding: '0 2rem',
        color: '#00A3FF',
        fontSize: '1.1rem',
        fontFamily: '"KoPubWorld Dotum Bold", serif'
    };

    return (
        <div style={headerBottomStyle}>
            {title}
        </div>
    )
}