function createTableRow(prop,value) {
    if (value === 'true') {
        return `<tr><td>${prop}</td><td>Верно</td></tr>`;
    }
    else {
        return `<tr><td>${prop}</td><td>Неверно</td></tr>`;   
    }
}


function createTableContainer(row) {
    return `<table class="custom-table">
                <tbody>
                    <tr><th>Номер вопроса</th><th>Результат</th></tr>
                    ${row}
                </tbody>
            </table>
            <a class='backToIndex' href='index.html'>На главную</a>`;
}


function showTable(obj) {
    let tableHTML = '';
    for (let elem in obj) {
            tableHTML += createTableRow(elem,obj[elem]);
        }
    let container = createTableContainer(tableHTML);
    attachToForm(container);
}