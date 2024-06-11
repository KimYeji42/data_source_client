import React, { useState } from 'react';
import styles from '../styles/ndsGuide.module.css';

export default function Guide({closeButtonClick}) {
    const [clickCount, setClickCount] = useState(0);

    const nextPageAction = () => {
        setClickCount(clickCount + 1);
    };

    const prevPageAction = () => {
        setClickCount(clickCount - 1);
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.titleAndCloseContainer}>
                    <h4> NDS Guide </h4>
                    <h4 className={styles.closeButton} onClick={closeButtonClick}>x</h4>
                </div>

                {clickCount === 0 && <small>1. 메인 페이지에서 프로젝트 생성하기를 클릭합니다.</small>}
                {clickCount === 1 && <small>2. 프로젝트 생성하기를 통하여 프로젝트 생성란으로 이동합니다.</small>}
                {clickCount === 2 && <small>3. 프로젝트 명과 데이터베이스 명 설명 협업자를 입력 합니다.</small>}
                {clickCount === 3 && <small>4. 데이터 베이스 접속하기 버튼을 눌러 데이터 베이스 페이지로으로 이동합니다.</small>}
                {clickCount === 4 && <small>5. 테이블명 설명을 입력 후 컬럼명을 입력합니다. 타입에는 <br/>TEXT( 문자 )<br/> INTEGER ( 정수 ) <br/>REAL ( 소수 ) <br/>MEDIA FILE (동영상 , 사진 ) 중 선택할수 있습니다.
                    <br/>MEDIA FILE 가이드는 17번 마지막 Guide에서 확인 할수 있습니다.<br/></small>}
                {clickCount === 5 && <small>5 - 1.선택 사항으로는 <br/>PK) 대표키 <br/>FK) 조인키 <br/>UK) 고유키 <br/>NOTNULL 을 선택할 수있습니다.</small>}
                {clickCount === 6 && (<small>5 - 2. 조인을 선택할 경우, FK(조인키)를 선택하고 다른 테이블의 PK 값을 통해 연결할 수 있습니다. PK 값이 2개 이상 인 테이블은 조인 테이블에서 제외됩니다.</small>)}
                {clickCount === 7 && (<small>6. 해당 테이블을 클릭 후 데이터 관리하기 버튼을 눌러 데이터 관리 페이지로 이동합니다.</small>)}
                {clickCount === 8 && (<small>7. 다음과 같은 아이콘을 클릭하여 데이터를 관리합니다. <br/>플러스 데이터 추가<br/>마이너스 데이터 삭제 <br/>윗 화살표 업로드 <br/>검색 컬럼 검색 <br/>다운로드 엑셀 다운로드 <br/>새고로침 컬럼확장</small>)}
                {clickCount === 9 && (<small>8. 활용하기 버튼을 눌러 엑셀 다운로드를 통하여 엑셀을 다운 받습니다.</small>)}
                {clickCount === 10 && (<small>9. 템플릿 보기를 눌러 템플릿 페이지로 이동합니다. 원하는 디자인을 선택한 후 자신의 컬럼을 입력하여 템플릿의 형태를 미리 확인할 수 있습니다.</small>)}
                {clickCount === 11 && (<small>10. 활용하기 버튼을 눌러 REST API 로 이동합니다. 해당 테이블의 접근할수 있는 <br/> GET POST UPDATE DELETE URL이 제공됩니다.</small>)}
                {clickCount === 12 && (<small>11 . 헤더바에 ERD 클릭 하여 자신의 테이블들의 연관관계를 ER 다이어그램으로 확인 할 수 있습니다.</small>)}
                {clickCount === 13 && (<small>12 . 헤더바 VERSION을 클릭 후 현재상태를 누르면 프로젝트 단위로 테이블의 상태를 분기별 로 관리 할수 있습니다.</small>)}
                {clickCount === 14 && (<small>13 . 히스토리를 눌러 분기로별로 저장된 테이블을 확인 할수 있으며 리셋 버튼을 눌러 해당 시점으로 이동 할 수 있습니다.</small>)}
                {clickCount === 15 && (<small>14 . 커밋 검색을 통하여 분기별로 저장된 테이블을 검색 할수 있습니다.</small>)}
                {clickCount === 16 && (<small>15 . 병합 버튼을 클릭하여 커밋의 변경사항을 현재 분기로 합칠 수 있습니다.</small>)}
                {clickCount === 17 && (<small>16 . 상단에 MEDIA를 클릭하여 테이블에 들어갈 사진을 관리 할수 있습니다.</small>)}

                {/* 필요한 단계만큼 조건부 렌더링 추가 가능 */}

                <div className={styles.buttonContainer}>
                    {clickCount !== 0 && (
                        <button
                            onClick={prevPageAction}
                            className={styles.guideButton}
                        >
                            이전
                        </button>
                    )}
                    {clickCount !== 17 && (
                        <button
                            onClick={nextPageAction}
                            className={styles.guideButton}
                        >
                            다음
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
}
