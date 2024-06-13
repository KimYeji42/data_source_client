export const TreeTemplateCode = ({ url }) => {
    return `
<!DOCTYPE html>
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
        flex-direction: column;
    }

    .treeContainer{
        font-family: "KoPubWorld Dotum Bold",sans-serif;
        margin: 0 auto;
        height: auto;
        width: 250px;
        border-radius: 5px;
        box-shadow: 0px 0px 5px 2px #dedede;
    }
    .treeTitle {
        margin-top: 20px;
        margin-left: 62px;
        font-size: 19px;
    }

    .inputContainer input[type="text"] {
        font-family: "KoPubWorld Dotum Bold",sans-serif;
        flex: 1;
        width: 80%;
        margin-left: 5px;
        padding: 5px 5px 5px 0;
        border: none;
        border-radius: 4px;
        background-color: transparent;
    }

    .inputContainer input[type="text"]:focus {
        outline: none;
        border: none;
    }

    .inputContainer input[type="text"]::placeholder {
        font-size: 12px;
        font-family: "KoPubWorld Dotum Bold",sans-serif;
    }

    .inputContainer {
        display: flex;
        width: 90%;
        margin: 10px auto 12px;
        background-color: #F6F8FA;
        border-radius: 4px;
        padding: 5px;
    }

    .inputContainer img {
        padding-left: 3px;
        padding-top: 2px;
        width: 28px;
        height: 25px;
    }

    .tableName {
        margin-top: 12px;
        width:120px; /*테이블명이 길어지면 이거 수정*/
        word-wrap: break-word;
        display: block;
        align-items: center;
        color:#8D91A0;
        font-size: 19px;
    }
    .tableHeader{
        display: flex;
    }

    .listBody{
        width:250px; /*테이블명이 길어지면 이거 수정*/
        word-wrap: break-word;
        margin-left: 5px;
        height: auto;
        margin-bottom: 30px;

    }


    .footContainer{
        width: 200px;
        height: 50px;
        display: flex;
        align-items: center;
        margin-left: 10px;

    }
    .buttonContainer{
        height: 20px;
        width: 30px;
        margin:15px 0 0 0;
    }

    .listBody li:nth-child(1n)::marker {
        color: #F2994A;
    }

    .listBody li:nth-child(2n)::marker {
        color: #EB5757;
    }

    .listBody li:nth-child(3n)::marker {
        color: #219653;
    }

    .listBody li:nth-child(4n)::marker{
        color: #2D9CDB;
    }


    </style>
</head>
<body>
<div id="dataDisplay"><!-- //ToDo 데이터 표시하는 부분입니다 이 코드가 있어야 화면에 나와요! 혹여나 변수명을 바꾸고 싶으면 바꿔도 되는데 dataDispaly가 쓰여있는 곳은 바꾼 변수명으로 다 바꾸셔야해요-->

</div>
<script>
    const fetchData = async () => {
        try {
            const response = await fetch(\`${url}\`, {// ToDo 괄호 안 ''에 getUrl을 넣으세요
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response.json();



            const dataDisplay = document.getElementById('dataDisplay');


            dataDisplay.innerHTML = '';

            const treeContainer = document.createElement('div');
            treeContainer.classList.add('treeContainer');


            const treeTitle = document.createElement('div');
            treeTitle.classList.add('treeTitle');
            treeTitle.textContent = 'ITEMS';
            treeContainer.appendChild(treeTitle);


            const imageAndText = document.createElement('div');
            imageAndText.classList.add('imageAndText');


            const inputContainer = document.createElement('div');
            inputContainer.classList.add('inputContainer');


            const imagePlaceholder = document.createElement('img');
            imagePlaceholder.src = './image/glass.png';






            let searchValue = '';
            const setSearchValue = (newValue) => {
                searchValue = newValue;
            };

            const handleSearchChange = (event) => {
                setSearchValue(event.target.value);

            };

            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Search';
            input.value = searchValue;
            input.addEventListener('input', handleSearchChange);


            inputContainer.appendChild(imagePlaceholder);
            inputContainer.appendChild(input);


            const hr = document.createElement('hr');
            imageAndText.appendChild(inputContainer);
            treeContainer.appendChild(imageAndText);
            treeContainer.appendChild(hr);


            const tableBox = document.createElement('div');
            tableBox.classList.add('tableBox');
            const table = document.createElement('div');
            table.classList.add('table');



            Object.keys(responseData[0]).forEach(key => {
                //여기서부터 배열의 갯수에 맞게 tableName 반복
                const tableHeader = document.createElement('div');
                tableHeader.classList.add('tableHeader');


                const houseImg = document.createElement('img');
                houseImg.src="./image/house.png";
                tableHeader.appendChild(houseImg);
                houseImg.style.width = "60px";
                houseImg.style.height = "auto";


                const tableName = document.createElement('div');
                tableName.classList.add('tableName');
                tableName.textContent = key;
                tableName.style.marginLeft = '5px';
                tableHeader.appendChild(tableName);

                const listBody = document.createElement('div');
                listBody.classList.add('listBody');
                let isExpanded = true;

                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('buttonContainer');
                buttonContainer.style.textAlign = 'center';


                const imageButton = document.createElement('img');
                imageButton.src = "./image/before.png";
                imageButton.style.marginLeft = '15px';
                imageButton.style.width = '15px';
                imageButton.style.height = '15px';
                buttonContainer.appendChild(imageButton);
                imageButton.addEventListener('click', () => {
                    if (isExpanded){
                        const propertyName = key;
                        const propertyValues = responseData.map(item => item[propertyName]);
                        const ul = document.createElement('ul');

                        propertyValues.forEach((value => {
                            const li = document.createElement('li');
                            li.textContent = value;

                            ul.appendChild(li);
                        }));
                        listBody.appendChild(ul);
                        isExpanded = false;
                        imageButton.src = "./image/after.png";
                    }else {
                        isExpanded= true;
                        listBody.innerHTML='';
                        imageButton.src = "./image/before.png";
                    }
                });
                buttonContainer.appendChild(imageButton);
                tableHeader.appendChild(buttonContainer);
                table.appendChild(tableHeader);
                table.appendChild(listBody);
                tableBox.appendChild(table);
            });

            const footContainer= document.createElement('div');
            footContainer.classList.add('footContainer');
            const footImgSrc="./image/graph.png";
            const foot = document.createElement('img');
            foot.src=footImgSrc;
            foot.style.width="35px";
            foot.style.height="auto";

            const footText = document.createElement('div');
            footText.classList.add('footText');
            footText.textContent="Progress";
            footText.style.color="gray";
            footText.style.marginLeft='5px';
            footContainer.appendChild(foot);
            footContainer.appendChild(footText);




            treeContainer.appendChild(tableBox);
            treeContainer.appendChild(footContainer);
            dataDisplay.appendChild(treeContainer);



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
