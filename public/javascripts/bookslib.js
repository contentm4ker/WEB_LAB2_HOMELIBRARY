function addBook() {
    callAjaxPut(document.getElementById("inp1").value,
                document.getElementById("inp2").value,
                document.getElementById("inp3").value);
}

function deleteBook(ind) {
    callAjaxDelete(ind);
}

function bookFilterByInStock() {
    let inStock = document.getElementById("inp4").checked ?
        document.getElementById("inp4").value : document.getElementById("inp5").value;
    callAjaxGet('inStock', inStock);
}

function bookFilterByOverdue() {
    let overdue = document.getElementById("inp6").checked ?
        document.getElementById("inp6").value : document.getElementById("inp7").value;
    callAjaxGet('overdue', overdue);
}

function callAjaxPut(author, name, release) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.documentElement.innerHTML = this.responseText;
        }
    };
    xhttp.open("PUT", '/books', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(`author=${author}&name=${name}&release=${release}`);
}

function callAjaxDelete(ind) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.documentElement.innerHTML = this.responseText;
        }
    };
    xhttp.open("DELETE", `/${ind}`, true);
    xhttp.send();
}

function callAjaxGet(par, val) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location.href=`http://localhost:3000/books/filter/${par}/${val}`;
        }
    };
    xhttp.open("GET", `/books/filter/${par}/${val}`, true);
    xhttp.send();
}

function checkAddForm() {
    isInptable = document.getElementById("inptable").hidden;
    if(isInptable) {
        document.getElementById("inptable").hidden = false;
        document.getElementById("filterbtn").disabled = true;
    } else {
        document.getElementById("inptable").hidden = true;
        document.getElementById("filterbtn").disabled = false;
    }
}

function checkFilterForm() {
    isInptable = document.getElementById("checkbox").hidden;
    if(isInptable) {
        document.getElementById("checkbox").hidden = false;
        document.getElementById("addbtn").disabled = true;
    } else {
        document.getElementById("checkbox").hidden = true;
        document.getElementById("addbtn").disabled = false;
    }
}

function checkFieldsToActivateButton() {
    let inp1 = document.getElementById('inp1'),
        inp2 = document.getElementById('inp2'),
        inp3 = document.getElementById('inp3');
    document.getElementById('btn').disabled = inp1.value
    && inp2.value && inp3.value ? false : "disabled";
}