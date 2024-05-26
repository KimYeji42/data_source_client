import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './headerStyle.module.css';
import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

function Header({currentUser , isLoggedIn , logoutHandler}) {
    const [selectedIndex , setSelectedIndex] = useState(0);

    const location = useLocation();

    useEffect(() =>{
        const path = location.pathname;

        if (path === '/projects' || path.includes('/project/') || path.includes('/table/') || path.includes('/tables/') || path.includes('/createTable/') ||  path.includes('/createProject'))
            setSelectedIndex(1)
        else if(path === '/history' || path === '/status' || path === '/commit')
            setSelectedIndex(2)
        else if(path === '/blob/cloud')
            setSelectedIndex(3)
        else if(path === '/erd')
            setSelectedIndex(4)
        else
            setSelectedIndex(0)

    },[location])

    return (
        <div className={styles.All1}>
                <div className={styles.container}>
                    <Link to={'/'} >
                        <img src='/image/로고3.png' className={styles.logo}/>
                    </Link>

                    <div className={styles.bar}>
                        <div className={styles.navLink}>
                            <li>
                                <Link to={'/projects'}
                                      className={ selectedIndex === 1 ? styles.active : styles.link }
                                >
                                    DATA
                                </Link>
                            </li>
                            <li>
                                <Link to={'/history'}
                                      className={ selectedIndex === 2 ? styles.active : styles.link }
                                >
                                    VERSION
                                </Link>
                            </li>
                            <li>
                                <Link to={'/blob/cloud'}
                                      className={ selectedIndex === 3 ? styles.active : styles.link }
                                >
                                    MEDIA
                                </Link>
                            </li>
                            <li>
                                <Link to={'/erd'}
                                      className={ selectedIndex === 4 ? styles.active : styles.link }
                                >
                                    ERD
                                </Link>
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