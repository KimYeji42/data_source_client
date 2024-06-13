export const CardTemplateCode = ({ url, title, description, img }) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
    @font-face {
        font-family: "KoPubWorld Dotum Bold";
        /* src: url("/Font/KoPubWorld Dotum Bold.ttf"); */
    }
    @font-face {
        font-family: "GmarketSansTTFBold";
        /* src: url("/Font/GmarketSansTTFBold.ttf"); */
    }
    
    #dataDisplay {
        margin-top: 3%;
        justify-content: center;
        display: flex;
        gap: 25px;
        flex-wrap: wrap;
    }

    .cardImage {
        width: 85%;
        height: 46%;
        margin: 15px auto 0;
        background-color: #e1e1e1;
        border-radius: 3px;
        background-size: cover;
        background-position: center;
    }

    .textContainer {
        width: 83%;
        height: 30%;
        margin: 20px auto 0;
    }

    .title {
        width: 80%;
        height: 50px;
        font-size: 36px;
        padding-left: 15px;
    }

    .information {
        width: 80%;
        height: 50px;
        font-size: 24px;
        padding-left: 15px;
        margin-top: 5px;
    }

    .buttonBox {
        width: 80px;
        float: right;
        margin-right: 12px;
    }

    .buttonBox button {
        height: 40px;
        width: 80px;
        background-color: #00A3FF;
        color: white;
        border: none;
        border-radius: 5px;
    }

    .cardContainer {
        border: 1px solid #777777;
        font-family: "KoPubWorld Dotum Bold", serif;
        width: 300px;
        height: 350px;
        border-radius: 10px;
        margin-bottom: 20px;
    }
    </style>
</head>
<body>
<div id="dataDisplay"></div>

<script>
    const fetchData = async () => {
        try {
            const response = await fetch(\`${url}\`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();

            console.log(responseData);

            const dataDisplay = document.getElementById('dataDisplay');
            dataDisplay.innerHTML = '';

            responseData.forEach(data => {
                const cardContainer = document.createElement('div');
                cardContainer.classList.add('cardContainer');

                let cardImageColumn = data.${img}
                const cardImage = document.createElement('div');
                cardImage.classList.add('cardImage');
                cardImage.style.backgroundImage = "url( "+ cardImageColumn + ")";

                const textContainer = document.createElement('div');
                textContainer.classList.add('textContainer');

                const titleElement = document.createElement('div');
                titleElement.classList.add('title');
                titleElement.textContent = data[\`${title}\`];
                
                const descriptionElement = document.createElement('div');
                descriptionElement.classList.add('information');
                descriptionElement.textContent = data[\`${description}\`];

                const buttonBox = document.createElement('div');
                buttonBox.classList.add('buttonBox');

                const button = document.createElement('button');
                button.textContent = '보기';
                button.addEventListener('click', () => {
                    console.log("본인이 넣고 싶은 기능 넣으세요");
                });

                buttonBox.appendChild(button);
                cardContainer.appendChild(cardImage);
                cardContainer.appendChild(textContainer);
                textContainer.appendChild(titleElement);
                textContainer.appendChild(descriptionElement);
                cardContainer.appendChild(buttonBox);

                dataDisplay.appendChild(cardContainer);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
</script>
</body>
</html>`;
};
