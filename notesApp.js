let addButton = document.getElementById("addbtn");
let search = document.getElementById("search");
let alertDiv = document.querySelector(".alerts");
let cards = document.getElementById("cards");
let clearButton = document.getElementById("clrbtn");
let delAllBtn = document.getElementById("deleteAll");
let notesList = [];
let count = 0;
showCards();

function setToLocal(stamp, content) {
    let notesObj = {
        tStamp: stamp,
        noteContent: content
    };

    notesList.push(notesObj);
    localStorage.setItem("MyNotes", JSON.stringify(notesList));
}

function clearRecords() {
    let decision = confirm("Are you sure, you want to delete all notes?");
    if (decision) {
        notesList = []
        localStorage.clear();
        showCards();
    }
}

function clearArea() {
    document.getElementById("note").value = '';
}

function timeStamp() {
    const d = new Date;
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let nowDate = `Added on ${day}/${month}/${year}`;
    let time = `at ${hour}:${minute}.`;
    let stamp = `${nowDate}<br>${time}`;
    return stamp;
}

function showCards() {
    if (localStorage.getItem("MyNotes") != null) {
        let htmlStr = "";


        JSON.parse(localStorage.getItem("MyNotes")).forEach((item, index) => {
            htmlStr += `
            <div class="card m-2" style="width: 18rem;">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">${item.tStamp}</h6>
                    <p class="card-text">${item.noteContent}</p>
                    <button type="button" class="btn btn-success" id="${index}" onclick="deleteCard(${index})">Delete</button>
                </div>
            </div>`;
        });

        cards.innerHTML = htmlStr;
    }
    else {
        cards.innerHTML = "";
        cards.innerHTML = "<h4>Nothing to show!</h4>";
    }
}

function deleteCard(index) {

    let notes = localStorage.getItem("MyNotes");
    if (notes == null) {
        notesList = [];
    } else {
        notesList = JSON.parse(notes);
    }

    notesList.splice(index, 1);
    localStorage.setItem("MyNotes", JSON.stringify(notesList));

    showCards();
}

addButton.addEventListener("click", e => {
    let textAreaContent = document.getElementById("note");
    if (textAreaContent.value != "") {
        cardContent = `
            <div class="card m-2" style="width: 18rem;">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">${timeStamp()}</h6>
                    <p class="card-text">${textAreaContent.value}</p>
                    <button type="button" class="btn btn-success" id="${count}" onclick="deleteCard(${count})">Delete</button>
                </div>
            </div>`;

        setToLocal(timeStamp(), textAreaContent.value)
        showCards();

        count += 1;
        let alertMsg = `<div class="alert alert-success" role="alert">
        Your note is added successfully!
                        </div>`;
        alertDiv.innerHTML = alertMsg;
    }
    else {
        let alertMsg = `<div class="alert alert-danger" role="alert">
        Please write something before adding!
                        </div>`;
        alertDiv.innerHTML = alertMsg;
    }
    clearArea();
    setInterval(() => {
        alertDiv.innerHTML = '';
    }, 5000);

});

search.addEventListener("input", () => {
    let inputValue = search.value.toLowerCase();
    let allNotes = document.getElementsByClassName("card");
    Array.from(allNotes).forEach(note => {
        let noteText = note.getElementsByTagName("p")[0].innerHTML;
        if (noteText.includes(inputValue)) {
            note.style.display = "block";
        }
        else {
            note.style.display = "none";
        }

    })
});

clearButton.addEventListener("click", clearArea);
delAllBtn.addEventListener("click", clearRecords);
