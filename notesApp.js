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
    if (minute < 10) {
        minute = '0' + minute.toString();
    }
    if (hour < 10) {
        hour = '0' + hour.toString();
    }
    if (day < 10) {
        day = '0' + day.toString();
    }
    if (month < 10) {
        month = '0' + month.toString();
    }
    let nowDate = `Date: ${day}/${month}/${year}`;
    let time = `Time: ${hour}:${minute}`;
    let stamp = `(${nowDate} - ${time})`;
    return stamp;
}

function showCards() {
    if (localStorage.getItem("MyNotes") != null) {
        let htmlStr = "";


        JSON.parse(localStorage.getItem("MyNotes")).forEach((item, index) => {
            htmlStr += `
            <div class="card m-2" style="width: 18rem;">
                <div class="card-body">
                    <p id="time" class="card-subtitle mb-2 text-muted">${item.tStamp}</p><br>
                    <p class="card-text">${item.noteContent}</p>
                    <button type="button" class="btn btn-success" id="${index}" onclick="deleteCard(${index})">Delete</button>
                </div>
            </div>`;
        });

        cards.innerHTML = htmlStr;
    }
    else {
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
    alertDiv.innerHTML = `<div class="alert alert-danger" role="alert">
    Your note is deleted Successfully!
                    </div>`
    setInterval(() => {
        alertDiv.innerHTML = ""
    }, 5000);
}

addButton.addEventListener("click", e => {
    let textAreaContent = document.getElementById("note");
    if (textAreaContent.value != "") {
        cardContent = `
            <div class="card m-2" style="width: 18rem;">
                <div class="card-body">
                    <p class="time card-subtitle mb-2 text-muted">${timeStamp()}</p><br>
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
    let allNotes = document.getElementsByClassName("card m-2");
    Array.from(allNotes).forEach(note => {
        let noteText = note.getElementsByTagName("p")[1].innerHTML;
        if (noteText.toLowerCase().includes(inputValue)) {
            note.style.display = "block";
        }
        else {
            note.style.display = "none";
        }

    })
    console.log(allNotes)
});

clearButton.addEventListener("click", clearArea);
delAllBtn.addEventListener("click", clearRecords);
