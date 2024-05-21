import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './headerStyle.module.css';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Header({isMain , currentUser , isLoggedIn , setCurrentUser , setIsLoggedIn , logoutHandler}) {

    return (
        <div className={isMain ? styles.All1 : styles.All2}>
                <div className={styles.container}>
                    <Link to={'/'} >
                        <img src='/image/로고3.png' className={styles.logo}/>
                    </Link>

                    <div className={styles.bar}>
                        <div className={styles.navLink}>
                            <li>
                                <Link to={'/projects'} >DATA</Link>
                            </li>
                            <li>
                                <Link to={'/history'} >VERSION</Link>
                            </li>
                            <li>
                                <Link to={'/blob/cloud'} >IMAGES</Link>
                            </li>
                            <li>
                                <Link to={'/erd'} >ERD</Link>
                            </li>
                        </div>
                    </div>

                    <div className={styles.info}>
                        {currentUser && <div>{currentUser} 님</div>}
                        <div className={styles.loginLogout}>{isLoggedIn ?
                            <Link to={'/'} onClick={logoutHandler}>로그아웃</Link> :
                            <Link to={'/auth/login'}>로그인</Link>}
                        </div>
                    </div>

                </div>
        </div>

    );
}

export default Header;