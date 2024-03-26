import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './headerStyle.module.css';
import {useState} from "react";


function Header({  currentUser, isLoggedIn }) {

        const [activeItem, setActiveItem] = useState(null);

        const handleClick = (itemId) => {
            setActiveItem(itemId);
        };

    return (
        <div className={styles.All}>
                <div className={styles.container}>
                    <div className={styles.logo} >DevSource</div>
                        <div className={styles.bar}>
                            <div className={styles.navLink}>
                                <li
                                    id="home"
                                    className={activeItem === 'home' ? styles.active : ''}
                                    onClick={() => handleClick('home')}
                                >
                                    Home
                                </li>
                                <li
                                    id="devTool"
                                    className={activeItem === 'devTool' ? styles.active : ''}
                                    onClick={() => handleClick('devTool')}
                                >
                                    DevTool
                                </li>
                                <li
                                    id="devTree"
                                    className={activeItem === 'devTree' ? styles.active : ''}
                                    onClick={() => handleClick('devTree')}
                                >
                                    DevTree
                                </li>
                            </div>

                            <div className={styles.info}>
                                <div>{currentUser}ㅇㅇㅇ님</div>
                                <div >{isLoggedIn ? '로그인 중' : '로그아웃'}</div>
                            </div>
                        </div>
                </div>
        </div>

    );
}

export default Header;