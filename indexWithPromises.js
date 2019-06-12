function makeCard(account) {
    let emptyCard = document.createElement('div');
    let myCard = `<div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Account ${account.id}</h5>
            <p class="card-text">Account number ${account.accountNumber}: ${account.firstName} ${account.lastName}</p>
        </div>
     </div>`
    emptyCard.id = "AccountCards";
    document.body.appendChild(emptyCard);
    document.getElementById(emptyCard.id).innerHTML = myCard;
}

function makeRequest(requestType, url) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.onload = () => {
            if (req.status >= 200 && req.status <= 299) {
                resolve(req);
            } else {
                reject(req);
            }
        };
        req.open(requestType, url);
        req.send();

    });
}

function getAllPromise() {
    makeRequest("GET", "http://localhost:8080/AccountSETemplate/api/account/getAllAccounts/").then((req) => {
        result.innerText = req.responseText;
    })
}

function getOnePromise(id) {
    makeRequest("GET", `http://localhost:8080/AccountSETemplate/api/account/getAnAccount/${id}`).then((req) => {
        if (req.responseText && req.responseText !== "null") {
            let anAccount = JSON.parse(req.responseText);
            makeCard(anAccount)
        }
        }).catch(() => {result.innerText = "Accound ID " + id + " not found";
    })
}

function readAll() {
    let req = new XMLHttpRequest();
    req.onload = function () {
        result.innerText = req.responseText;
        const data = JSON.parse(req.responseText);

        for (let d in data) {
            makeCard(d);
        }
    }
    req.open("GET", "http://localhost:8080/AccountSETemplate/api/account/getAllAccounts/");
    req.send();

}

function read(id) {
    let req = new XMLHttpRequest();
    req.onload = function () {
        if (req.responseText && req.responseText !== "null") {

            let anAccount = JSON.parse(req.responseText);
            makeCard(anAccount)
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
    req.open("DELETE", `http://localhost:8080/AccountSETemplate/api/account/deleteAccount/${id}`);
    req.send();
}

