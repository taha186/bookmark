var bookMarkName = document.getElementById("bookMarkName");
var bookMarkURL = document.getElementById("bookMarkURL");
var submitBtn = document.getElementById("submitBtn");
var bookMarkArr = [];
var validate = false
if (localStorage.getItem("bookMarkArr") != null) {
    bookMarkArr = JSON.parse(localStorage.getItem("bookMarkArr"))
    display(bookMarkArr)
}


submitBtn.onclick = function () {
    if (bookMarkName.value == "" || bookMarkURL.value == ""){
        window.alert("please enter all inputs ")
        return
    }
    if (validate != true) {
       window.alert("please enter correct name and URL")
       return;
    }
    var bookMark = {
        name: bookMarkName.value,
        url: bookMarkURL.value
    }
    bookMarkArr.push(bookMark);
    updatelocalstorage()
    display(bookMarkArr)
    clearInputValue()
}

function updatelocalstorage() {
    localStorage.setItem("bookMarkArr", JSON.stringify(bookMarkArr))
}

function display(list) {
    var cartona = "";
    for (var i = 0; i < list.length; i++) {
        cartona += `<tr>
              <td class="fw-bold">${i + 1}</td>
              <td class="fw-bold">${list[i].name}</td>
              <td><a href="${list[i].url}" target="_blank" class="btn btn-custom"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
              <td><button onclick="deleteURL(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>`
    }
    document.getElementById("tableContent").innerHTML = cartona;
}


function deleteURL(index) {
    bookMarkArr.splice(index, 1);
    updatelocalstorage();
    display(bookMarkArr);
}

function clearInputValue() {
    bookMarkName.value = null;
    bookMarkURL.value = null;
}

function isvalidate(element) {
    
    var regex = {
        bookMarkName: /^[A-Za-z0-9_-]{3,15}$/,
        bookMarkURL: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    }
    if (regex[element.id].test(element.value) == true) {
        element.nextElementSibling.classList.add("d-none")
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        validate = true;
    } else {
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        element.nextElementSibling.classList.remove("d-none")
        validate = false;
    }

}