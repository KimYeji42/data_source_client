export const TableTemplateCode = ({ url }) => {
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
        flex-wrap: wrap;
    }


    table {
        font-family: "KoPubWorld Dotum Bold", serif;
        width: 60%;
        border-collapse: collapse;
        margin: 0px auto 0;
    }


    /* 테이블 헤더 스타일 */
    th {
        background-color: #F5F5F5;;
        border-right: none;
        padding: 15px;
        text-align: left;
        border-bottom: 1px solid #00A3FF;

    }

    /* 테이블 셀 스타일 */
    td {
        border-bottom: 1px solid #00A3FF;
        padding: 15px;
        text-align: left;

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

            // 데이터 디스플레이를 초기화
            dataDisplay.innerHTML = '';


            const table = document.createElement('table');


            const tableHeader = document.createElement('thead');
            const headerRow = document.createElement('tr');

            // 전체 선택 체크박스 추가
            const inputTh = document.createElement('th');
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = 'checkAll';
            input.addEventListener('click', function () {
                const isChecked = input.checked;
                const checkBoxes = document.querySelectorAll('.chk');
                checkBoxes.forEach(checkbox => {
                    checkbox.checked = isChecked;
                });
            });
            inputTh.appendChild(input);
            headerRow.appendChild(inputTh);

            // 각 헤더 항목에 대한 열 생성
            Object.keys(responseData[0]).forEach(key => {
                const th = document.createElement('th');
                th.appendChild(document.createTextNode(key));
                headerRow.appendChild(th);
            });

            tableHeader.appendChild(headerRow);
            table.appendChild(tableHeader);

            // 테이블 바디 생성
            const tableBody = document.createElement('tbody');
            responseData.forEach(obj => {
                const row = document.createElement('tr');

                // 개별 선택 체크박스 추가
                const inputTd = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.className = 'chk';
                input.addEventListener('change', function () {
                    const allChecked = [...document.querySelectorAll('.chk')].every(checkbox => checkbox.checked);
                    document.getElementById('checkAll').checked = allChecked;
                });
                inputTd.appendChild(input);
                row.appendChild(inputTd);

                // 각 객체의 값을 반복하여 셀 만듬
                Object.values(obj).forEach(value => {
                    const cell = document.createElement('td');
                    cell.textContent = value;
                    row.appendChild(cell);
                });
                tableBody.appendChild(row);
            });

            table.appendChild(tableBody);


            dataDisplay.appendChild(table);

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
