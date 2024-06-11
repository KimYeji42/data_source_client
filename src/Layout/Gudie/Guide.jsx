import React, { useState } from 'react';
import styles from '../styles/ndsGuide.module.css';
import { Button} from "../../devSource/Components/ui/ButtonUI";

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

                {clickCount === 0 && <small>1. 메인 페이지에서 '프로젝트 생성하기' 버튼을 클릭합니다.</small>}
                {clickCount === 1 && <small>2. '프로젝트 생성하기' 버튼을 클릭하여 프로젝트 생성 페이지로 이동합니다.</small>}
                {clickCount === 2 && <small>3. 입력란에 정보를 작성하고, 협업자를 추가하여 '프로젝트 생성' 버튼을 클릭합니다.</small>}
                {clickCount === 3 && <small>4. '데이터 베이스 접속하기' 버튼을 클릭하여 데이터베이스 페이지로 이동합니다.</small>}
                {clickCount === 4 && <small>5. '새로운 테이블 생성' 버튼을 클릭하여 테이블 생성 페이지로 이동합니다.<br/></small>}
                {clickCount === 5 && <small>6. 입력란에 정보를 작성하고, '+', '-' 아이콘을 클릭하여 컬럼을 추가 및 삭제합니다. <br/><br/> 타입 종류는 아래와 같습니다. <br/><br/>TEXT ( 문자 )<br/> INTEGER ( 정수 ) <br/>REAL ( 소수 ) <br/>MEDIA FILE ( 동영상 , 사진 )
                    <br/><br/>※ MEDIA FILE 가이드는 17번 마지막 Guide에서 확인 하실 수 있습니다.<br/></small>}
                {clickCount === 6 && <small>6 - 1. 선택 사항 <br/><br/>PK) 대표키 <br/>FK) 조인키 <br/>UK) 고유키 <br/>NOTNULL<br/><br/>을 선택 할 수 있습니다.</small>}
                {clickCount === 7 && (<small>6 - 2. 조인<br/><br/> FK를 체크한 후 '검색' 버튼을 눌러 조인 하고자 하는 테이블을 찾아 기능을 수행할 수 있습니다.<br/><br/> ※ PK 값이 2개 이상인 테이블은 조인 테이블에서 제외 됩니다.</small>)}
                {clickCount === 8 && (<small>7. 테이블 카드를 클릭 후 '테이블 조회하기' 버튼을 클릭하여 테이블 조회 페이지로 이동 합니다.</small>)}
                {clickCount === 9 && (<small>8. 다음과 같은 아이콘을 클릭하여 데이터를 관리할 수 있습니다. <br/><br/>
                                                - <img src={Button[1].image} style={{width: '28px'}}/> : 데이터 추가<br/>
                                                - <img src={Button[2].image} style={{width: '28px'}}/> : 데이터 삭제 <br/>
                                                - <img src={Button[3].image} style={{width: '28px'}}/> : 변경 사항 저장 <br/>
                                                - <img src={Button[4].image} style={{width: '28px'}}/> : 행 데이터 검색 <br/>
                                                - <img src={Button[5].image} style={{width: '28px'}}/> : CSV 데이터 불러오기 <br/>
                                                - <img src={Button[0].image} style={{width: '28px'}}/> : 새고로침 <br/>
                                                - <img src={Button[7].image} style={{width: '28px'}}/> : 컬럼 확장
                </small>)}
                {clickCount === 10 && (<small>9. '활용하기' 버튼을 클릭하여 다양한 기능을 사용할 수 있습니다.</small>)}
                {clickCount === 11 && (<small>9-1. 템플릿 보기 <br/><br/>원하는 디자인 카드를 클릭한 후 컬럼을 선택하여 템플릿 미리보기, 코드 보기를 사용 할 수 있습니다.</small>)}
                {clickCount === 12 && (<small>9-2. REST API 활용하기<br/><br/> 해당 테이블에 접근 할 수 있는 URL (GET, POST, UPDATE, DELETE)이 제공 됩니다.</small>)}
                {clickCount === 13 && (<small>10. 헤더바의 'ERD'를 클릭하면, <br/> 테이블들의 연관관계를 ER 다이어그램으로 <br/>확인 할 수 있습니다.</small>)}
                {clickCount === 14 && (<small>11. 헤더바의 'VERSION'을 클릭하여 <br/>프로젝트 단위로 테이블의 상태를 분기 별로 <br/>관리할 수 있습니다.</small>)}
                {clickCount === 15 && (<small>11-1. 히스토리 탭
                                                <br/><br/> 커밋을 클릭하여 변경 사항과 커밋 정보를 조회할 수 있습니다. 기능 설명과 사용 방법은 아래와 같습니다.
                                                <br/><br/> - 체크아웃 : 커밋을 더블 클릭하여 현재 데이터베이스 작업 공간을 변경 시킬 수 있습니다.
                                                <br/><br/> - 리셋 버튼 : 선택한 분기의 생성 날짜 이후에 만들어진 커밋을 모두 삭제하고, 선택한 분기로 체크아웃 합니다.
                                                <br/><br/> - 병합 버튼 : 체크아웃 분기에 선택한 분기의 변경 사항을 가져와 병합할 수 있습니다. <br/><br/>※ 만약, 병합 시에 두 분기의 병합 테이블에 같은 값을 가지는 PK가 존재 한다면 충돌이 일어나며, 이를 해결한 후에 기능을 수행할 수 있습니다.
                </small>)}
                {clickCount === 16 && (<small>11-2. 현재 상태 탭
                                                <br/><br/> 변경 사항을 확인한 후 커밋 메세지를 작성하여 '커밋' 버튼을 누릅니다.<br/>데이터베이스 테이블의 변경 사항을 저장하여 이력을 남길 수 있습니다.  </small>)}
                {clickCount === 17 && (<small>12-3. 커밋 검색 탭 <br/><br/>검색어를 입력하여 원하는 커밋을 검색 할 수 있습니다.</small>)}
                {clickCount === 18 && (<small>13. 헤더바의 'MEDIA'를 클릭하여 테이블에 들어갈 사진 및 동영상 파일을 관리할 수 있습니다.</small>)}

                {/* 필요한 단계만큼 조건부 렌더링 추가 가능 */}

                <div className={styles.buttonContainer}>
                    {clickCount !== 0 && (
                        <button
                            onClick={prevPageAction}
                            className={`${styles.guideButton} ${styles.guideButtonLeft}`}
                        >
                            이전
                        </button>
                    )}
                    {clickCount !== 18 && (
                        <button
                            onClick={nextPageAction}
                            className={`${styles.guideButton} ${styles.guideButtonRight}`}
                        >
                            다음
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
}
