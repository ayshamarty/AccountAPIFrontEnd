function removeAllChildren(id) {
    let result = document.getElementById(id);
    while (result.hasChildNodes()) {
        result.removeChild(result.firstChild);
    }

}


function accountMaker(accNumber, fName, lName) {
    const newAccount = {
        accountNumber: accNumber.value,
        firstName: fName.value,
        lastName: lName.value
    };
    return newAccount;
}

function makeCard(account) {
    let myCard = document.createElement("div");
    myCard.innerHTML = `<div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Account ${account.id}</h5>
            <p class="card-text">Account number ${account.accountNumber}: ${account.firstName} ${account.lastName}</p>
        </div>
     </div>`

    document.getElementById("readTextNotification").appendChild(myCard);

}

function makeRequest(requestType, url, whatToSend) {
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
        req.send(whatToSend);
    });
}

function readAll() {
    makeRequest("GET", "http://localhost:8080/AccountSETemplate/api/account/getAllAccounts/").then((req) => {
        readTextNotification.innerText = req.responseText;
    });
}



function readOne(id) {
    makeRequest("GET", `http://localhost:8080/AccountSETemplate/api/account/getAnAccount/${id}`).then((req) => {
        
        if (req.responseText && req.responseText !== "null") {
            removeAllChildren("readTextNotification");
            let anAccount = JSON.parse(req.responseText);
            makeCard(anAccount)
        } else {
            readTextNotification.innerText = "Account doesn't exist"
        }
    }).catch(() => {
        readTextNotification.innerText = "Invalid ID";
    });
}

function destroy(id) {
    makeRequest("DELETE", `http://localhost:8080/AccountSETemplate/api/account/deleteAccount/${id}`).then((req) => {
        deleteNotification.innerText = "Account deleted"
    });
}

function create() {

    let newAccount = accountMaker(accNumber, fName, lName);

    makeRequest("POST", "http://localhost:8080/AccountSETemplate/api/account/createAccount", JSON.stringify(newAccount)).then((req) => {
        createNotification.innerText = "Account created"
    });
}



function update(id, accNumber, fName, lName) {

    let accountToUpdate = accountMaker(accNumber, fName, lName);
    console.log(accountToUpdate);

    makeRequest("PUT", `http://localhost:8080/AccountSETemplate/api/account/updateAccount/${id}`, JSON.stringify(accountToUpdate)).then((req) => {
        updateNotification.innerText = "Account updated";
    });
}
