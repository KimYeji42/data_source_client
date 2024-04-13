import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './headerStyle.module.css';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Header() {
    const [currentUser, setCurrentUser] = useState("")
    const [isLoggedIn , setIsLoggedIn] = useState("")
    const [activeItem, setActiveItem] = useState(null);

    const handleClick = (itemId) => {
        setActiveItem(itemId);
    };
    const getCurrentUser = () =>{
        const username = localStorage.getItem("username")
        setCurrentUser(username)
        console.log(currentUser)
    }
    const getTokenUser = () =>{
        const token = localStorage.getItem("token")
        if (token !== null){
            setIsLoggedIn(true)
            getCurrentUser()
        }
    }
    const logoutHandler = () =>{
        setIsLoggedIn(false)
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        localStorage.removeItem("username")
    }
    useEffect(() => {
        getTokenUser()
    }, []);
    return (
        <div className={styles.All}>
                <div className={styles.container}>
                    <div className={styles.logo} >No DB Service</div>
                        <div className={styles.bar}>
                            <div className={styles.navLink}>
                                <li
                                    id="home"
                                    className={activeItem === 'home' ? styles.active : ''}
                                    onClick={() => handleClick('home')}
                                >
                                    <Link to={'/'} >Home</Link>
                                </li>
                                <li
                                    id="devTool"
                                    className={activeItem === 'devTool' ? styles.active : ''}
                                    onClick={() => handleClick('devTool')}
                                >
                                    <Link to={'/projects'} >DevTool</Link>
                                </li>
                                <li
                                    id="devTree"
                                    className={activeItem === 'devTree' ? styles.active : ''}
                                    onClick={() => handleClick('devTree')}
                                >
                                    DevTree
                                </li>
                                <li
                                    id="Image"
                                    className={activeItem === 'image' ? styles.active : ''}
                                    onClick={() => handleClick('image')}
                                >
                                    <Link to={'/blob/cloud'} >Resources</Link>
                                </li>
                            </div>

                            <div className={styles.info}>
                                <div>{currentUser} 님</div>
                                <div>{isLoggedIn ?
                                    <Link to={'/'} onClick={logoutHandler}>로그아웃</Link> :
                                    <Link to={'/auth/login'}>로그인</Link>}
                                </div>
                            </div>
                        </div>
                </div>
        </div>

    );
}

export default Header;