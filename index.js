

function readAll() {
    let req = new XMLHttpRequest();
    req.onload = function () {
        result.innerText = req.responseText;
    }
    req.open("GET", "http://localhost:8080/AccountSETemplate/api/account/getAllAccounts/");
    req.send();

}

function read(id) {
    let req = new XMLHttpRequest();
    req.onload = function () {
        if (req.responseText && req.responseText !== "null") {

            result.innerText = req.responseText;
        } else {
            result.innerText = "Accound ID " + id + " not found";
        }
    }
    req.open("GET", `http://localhost:8080/AccountSETemplate/api/account/getAnAccount/${id}`);
    req.send();

}

function create() {

    const anAccount = {
        accountNumber: accNumber.value,
        firstName: fName.value,
        lastName: lName.value
    };

    let req = new XMLHttpRequest();
    req.onload = function () {
        result.innerText = "Account created"

    }
    req.open("POST", "http://localhost:8080/AccountSETemplate/api/account/createAccount");
    req.send(JSON.stringify(anAccount));
}

function destroy(id) {
    let req = new XMLHttpRequest();
    req.onload = function () {
        result.innerText = "Account deleted"
}
req.open("DELETE",`http://localhost:8080/AccountSETemplate/api/account/deleteAccount/${id}`);
req.send();
}