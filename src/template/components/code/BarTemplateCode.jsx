export const BarTemplateCode = ({ url, title, description, img }) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style> /*ToDo 디자인, 화면 위치등 본인만의 스타일대로 꾸며보세요*/
    @font-face {
        font-family: "KoPubWorld Dotum Bold";
    }
    @font-face {
        font-family: "GmarketSansTTFBold";
    }
    #dataDisplay {
        margin-top: 3%;
        justify-content: center;
        display: flex;
        gap: 25px;
        flex-wrap: wrap;

    }
    .all{
        border:1px solid black;
        display: grid;
        gap: 10px;
    }

    .container {
        display: flex;
        font-family: "KoPubWorld Dotum Bold", serif;
        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);
        width: 70%;
        height: 170px;
        margin: 0 auto;
        align-items: center;
        border: none;
        border-left: 10px solid #00a3ff;
    }

    .textContainer{
        width: 60%;
        margin:10px 0 0 100px;
    }

    .title{
        width: auto;
        height: 40%;
        font-size: 30px;
        color: #00a3ff;
    }

    .description{
        margin-top: 5px;
        width: 200px;
        height: 30%;
        font-size: 24px;
        padding-left: 10px;
    }

    .imgBox{
        margin-left: 50px;
        width: auto;
        height: 160px;
    }
    .imgBox img{
        width: 160px;
        height: 160px;
        background-size: cover;
        border-radius: 10px;
    }
    img{
        border: none;
    }
    </style>
</head>
<body>


<div id="dataDisplay"></div>  <!--//ToDo 데이터 표시하는 부분입니다 이 코드가 있어야 화면에 나와요! 혹여나 변수명을 바꾸고 싶으면 바꿔도 되는데 dataDispaly가 쓰여있는 곳은 바꾼 변수명으로 다 바꾸셔야해요-->
<script>
    const fetchData = async () => {
        try {
            const response = await fetch(\`${url}\`, { // ToDo 괄호 안 ''에 getUrl을 넣으세요
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response.json();


            const dataDisplay = document.getElementById('dataDisplay');

            dataDisplay.innerHTML = '';

            responseData.forEach(data=> {
                const container = document.createElement('div');
                container.classList.add('container');

                const imgBox = document.createElement('div');
                imgBox.classList.add('imgBox');
                
                let barImageColumn = data.${img}
                const img = document.createElement('img');
                img.style.backgroundImage = "url( "+ barImageColumn + ")";  //ToDo 본인이 테이블에 담은 이미지의 필드명을 data. 뒤에 적으세요.  ex)만약 필드명이 cloud면 data.cloud
                imgBox.appendChild(img);

                container.appendChild(imgBox);


                const textContainer = document.createElement('div');
                textContainer.classList.add('textContainer');
                container.appendChild(textContainer);


                const title = document.createElement('div');
                title.classList.add('title');
                title.textContent = data[\`${title}\`];    //ToDo 본인이 테이블에 담은 내용 중 대제목으로 나오게 하고 싶은 데이터를 담은 필드명을 data. 뒤에 적으세요. ex)만약 필드명이 age면 data.age
                textContainer.appendChild(title);
                const description = document.createElement('div');
                description.classList.add('description');
                description.textContent = data[\`${description}\`]; //ToDo 본인이 테이블에 담은 내용 중 소제목으로 나오게 하고 싶은 데이터를 담은 필드명을 data. 뒤에 적으세요.
                textContainer.appendChild(description);


                dataDisplay.appendChild(container);
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();

</script>
</body>
</html>
`;
};
