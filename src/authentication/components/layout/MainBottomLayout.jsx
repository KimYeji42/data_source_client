import MainBottomUI from "../uI/MainBottomUI";
import styles from "../styleModule/mainStyles.module.css";

export default function MainBottomLayout(){
    return(
        <div>
            <div className={styles.mainBottomBoxes}>
                <span className={styles.mainUiBox1}>
                    <MainBottomUI
                        stepNum={1}
                        bigText={"웹 프로젝트 \n생성 및 관리"}
                        smallText={"자신의 프로젝트 생성"}
                        buttonText={"New Project"}
                        circleColor={"#B3E4FF"}
                    />
                </span>
                <span className={styles.mainUiBox2}>
                    <MainBottomUI
                        stepNum={2}
                        bigText={"DataBase \n설계 및 생성"}
                        smallText={"테이블 생성 및 관리"}
                        buttonText={"Back Data"}
                        circleColor={"#62C6FF"}
                    />
                </span>
                <span className={styles.mainUiBox3}>
                    <MainBottomUI
                        stepNum={3}
                        bigText={"Front Client\n 설계 및 생성"}
                        smallText={"템플릿 및 코드 관리"}
                        buttonText={"Front Client"}
                        circleColor={"#4EBFFF"}
                    />
                </span>
                <span className={styles.mainUiBox4}>
                    <MainBottomUI
                        stepNum={4}
                        bigText={"DevTree로\n 버전 관리"}
                        smallText={"웹 서비스 버전 관리"}
                        buttonText={"DevTree"}
                        circleColor={"#00A3FF"}
                    />
                </span>
            </div>
        </div>
    )
}