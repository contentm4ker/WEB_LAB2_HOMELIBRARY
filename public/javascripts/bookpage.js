var inputsArray = [document.getElementById('inp1'), document.getElementById('inp2'),
    document.getElementById('inp3')];

inputsArray.forEach(function (input) {
    input.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
            callAjaxPut(inputsArray[0].value,
                inputsArray[1].value, inputsArray[2].value);
        }
    });
});

function callAjaxPut(author, name, release) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `/books/${document.location.href.split('/')[4]}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(`author=${author}&name=${name}&release=${release}`);
}

function giveBook() {
    callAjaxPost(true, document.getElementById("inp5").value,
        document.getElementById("inp4").value);
}

function getCurrentDate() {
    let date = new Date();
    let day = date.getDate();
    if (day.toString().length === 1) day = '0' + day;
    let month = date.getMonth();
    if (month.toString().length === 1) month = '0' + month;

    return day + '.' + month + '.' + date.getFullYear();
}

function returnBook() {
    callAjaxPost(false, getCurrentDate(), document.getElementById("inp4"));
}

function callAjaxPost(inStock, retDate, retName) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", `/books/${document.location.href.split('/')[4]}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(`inStock=${inStock}&retDate=${retDate}&retName=${retName}`);
}

function checkFieldsToActivateButton() {
    let inp4 = document.getElementById('inp4'),
        inp5 = document.getElementById('inp5');
    document.getElementById('btn').disabled = inp4.value
    && inp5.value && document.querySelector('.w3-red').innerHTML === "" ? false : "disabled";
}

function checkDateFiled() {
    var errorspan = document.querySelector('.w3-red');
    var date_field = document.getElementById('inp5');
    if (date_field.value.match(/^[0-3]\d\.[0-1]\d\.\d\d\d\d$/g)) {
        errorspan.innerHTML = "";
        errorspan.className = "w3-red";
        checkFieldsToActivateButton();
    }  else {
        errorspan.innerHTML = "Введите дату корректно";
    }
}
