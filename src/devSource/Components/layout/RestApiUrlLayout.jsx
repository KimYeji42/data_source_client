import stylesRest from "../../styleModule/restAPIBuilder.module.css";
import React, { useState } from "react";

export default function RestApiUrlLayout({isExpanded}) {

    const handleCopyClick = (url) => {
        navigator.clipboard.writeText(url); // 클립보드에 URL 복사
    };

    return (
        <div>


            <div className={`${stylesRest.urlContainer} ${isExpanded ? stylesRest.visible : ''}`}>
                <div>
                    {/* GET 메서드 */}
                    {isExpanded && (
                        <div>
                            <button className={stylesRest.copyButton} onClick={() => handleCopyClick("http://localhost:3000/restApi/sdadsq3123ok213ok12o321")}>Copy</button>
                            <h5> Get URL</h5>
                            <p>
                                http://localhost:3000/restApi/sdadsq3123ok213ok12o321
                            </p>
                            <hr/>

                        </div>

                    )}
                </div>
                {/* POST 메서드 */}
                <div>
                    {isExpanded && (
                        <div>
                            <button className={stylesRest.copyButton} onClick={() => handleCopyClick("http://localhost:3000/restApi")}>Copy</button>
                            <h5>Post URL</h5>
                            <p>http://localhost:3000/restApi/sdadsq3123ok213ok12o321</p>
                            <hr/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
