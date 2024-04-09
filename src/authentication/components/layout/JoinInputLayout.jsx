import InputBoxUI from "../uI/InputBoxUI";
import {useState} from "react";
import styles from '../styleModule/joinStyles.module.css'
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";
export default function JoinInputLayout(){
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isErrorModalOpen , setIsErrorModalOpen] = useState(false)
    const [errorMessage , setErrorMessage] = useState("")
    function checkPassword() {
        return password === confirmPassword;
    }

    const handleSubmit = async (e) => {
        if (checkPassword()){
            e.preventDefault();

            // 회원가입 데이터를 JSON 형식으로 만듦
            const userData = {
                name: name,
                phoneNumber: phoneNumber,
                email: email,
                password: password
            };

            try {
                // fetch를 사용하여 POST 요청을 보냄
                const response = await fetch('http://localhost:8080/api/auth/join', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log('회원가입 성공:', responseData);
                    // 성공적으로 가입되면 다음 페이지로 이동하거나 로직을 처리할 수 있음
                } else {
                    // 오류 응답 처리
                    const errorData = await response.json();
                    console.error('회원가입 실패:', errorData);
                }
            } catch (error) {
                console.error('회원가입 실패:', error);
            }
        }else {
            setErrorMessage("비밀번호가 일치하지 않습니다.")
            setIsErrorModalOpen(true)
        }
    };

    return(
        <div>
            <div className={styles.joinContainer}>
                <h1 className={styles.joinTitle}>회원 가입</h1>
                <InputBoxUI label={"이름"} onChange={setName} value={name} type={"text"}/>
                <InputBoxUI label={"전화번호"} onChange={setPhoneNumber} value={phoneNumber} type={"text"}/>
                <InputBoxUI label={"이메일"} onChange={setEmail} value={email} type={"text"}/>
                <InputBoxUI label={"비밀번호"} onChange={setPassword} value={password} type={"password"}/>
                <InputBoxUI label={"비밀번호 확인"} onChange={setConfirmPassword} value={confirmPassword} type={"password"}/>
                <button onClick={handleSubmit} className={styles.joinBtn} type="submit">가입하기</button>
            </div>
            <ErrorModal
                error={errorMessage}
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
            />
        </div>
    )
}
