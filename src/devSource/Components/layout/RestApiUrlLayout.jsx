import stylesRest from "../../styleModule/restAPIBuilder.module.css";

export default function RestApiUrlLayout({isExpanded , localPort , endpoint}) {
    let url = localPort + endpoint
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
                            <button className={stylesRest.copyButton} onClick={() => handleCopyClick(url)}>Copy</button>
                            <h5> Get URL</h5>
                            <p>
                                {url}
                            </p>
                            <hr/>

                        </div>

                    )}
                </div>
                {/* POST 메서드 */}
                <div>
                    {isExpanded && (
                        <div>
                            <button className={stylesRest.copyButton} onClick={() => handleCopyClick(url)}>Copy</button>
                            <h5>Post URL</h5>
                                <p>
                                    {url}
                                </p>
                            <hr/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
