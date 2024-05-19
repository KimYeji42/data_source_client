import React, { useState } from "react";
import styles from "../styleModule/LoginStyles.module.css"
import InputBoxUI from "../uI/InputBoxUI";
import SuccessModalLayout from "../../../project/components/layout/SuccessModalLayout";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";
import {Link} from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [success , setSuccess] = useState("")

    const [ token , setToken] = useState(null)
    const [ responseEmail , setResponseEmail] = useState(null)
    const [responseUsername , setResponseUsername] = useState(null)

    const handleLoginSuccess = (token , responseEmail, username) => {
        setToken(token);
        setResponseEmail(responseEmail)
        setResponseUsername(username)
        //값을 받아서 token에 저장
        localStorage.setItem('token', token);
        localStorage.setItem('email', responseEmail);
        localStorage.setItem('username',username)
    };

    const sendAuthData = async () => {
        if (!email || !password) {
            console.error("Email and password are required.");
            return;
        }

        const requestData = {
            email: email,
            password: password
        };

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // JSON 형식으로 데이터 전송
                },
                body: JSON.stringify(requestData) // JSON 문자열로 변환하여 전송
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("Data sent successfully:", responseData);
                handleLoginSuccess(responseData.token, responseData.email,responseData.username);
                setSuccess("로그인에 성공하였습니다.")
                setIsSuccessModalOpen(true)
            } else {
                const errorData = await response.json();
                setError(errorData.message)
                setIsErrorModalOpen(true)
                console.error("Error response:", errorData);
            }
        } catch (error) {
            console.error("Error sending data:", error);
            setError(error.message)
            setIsErrorModalOpen(true)
        }
    };

    const loginLocation =() => {
        window.location.href="/"
    }

    return (
        <div>
            <div className={styles.LoginContainer} onKeyPress={(e) => {
                if (e.key === "Enter") sendAuthData();
            }}>
                <h1 className={styles.LoginTitle}>로그인</h1>
                <div className={styles.loginBox}>
                    <InputBoxUI type={"text"} onChange={setEmail} value={email} label={"Email"}/>
                </div>

                <div className={styles.loginBox}>
                    <InputBoxUI type={"password"} onChange={setPassword} value={password} label={"Password"} />
                </div>

                <button className={styles.LoginBtn} onClick={sendAuthData}>Login</button>

                <Link to={'/auth/join'} className={styles.joinBtn}>회원가입</Link>
            </div>
            <
                SuccessModalLayout
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                data={success}
                onClickEvent={loginLocation}
            />
            <
                ErrorModal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                error={error}
            />

        </div>

    );
}
