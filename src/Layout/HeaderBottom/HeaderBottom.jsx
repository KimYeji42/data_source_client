import React from "react";
import { Link } from "react-router-dom";

export default function HeaderBottom({ title, titleList, linkList }) {
    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        margin: '.5rem auto',
        padding: '0 2rem',
        // height: '1.7rem',
        // backgroundColor: '#dedede',
        // color: '#424242',
        color: '#949494',
        fontSize: '.8rem',
        fontFamily: '"KoPubWorld Dotum Bold", serif',
        textDecoration: 'none'
    };

    const listStyle = {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex'
    };

    const listItemStyle = {
        display: 'inline-block',
    };

    return (
        <div style={containerStyle}>
            <ul style={listStyle}>
                {titleList && titleList.map((linkName, index) => (
                    <li key={index} style={listItemStyle}>
                        <Link style={{ color: '#949494', textDecoration: 'none' }} to={linkList[index]}>
                            {linkName}
                        </Link>
                        <span style={{ margin: '8px' }}> ＞ </span>
                    </li>
                ))}
            </ul>
            <span>{title}</span>
        </div>
    );
}
