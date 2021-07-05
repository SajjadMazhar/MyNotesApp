
let addButton = document.getElementById("addbtn");
let search = document.getElementById("search");
let alertDiv = document.querySelector(".alerts");
let cards = document.getElementById("cards");
let noteObj = {};
let count = 0;
showCards()

function clearArea(){
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
    if (Object.keys(noteObj).length != 0){
        cards.innerHTML = '';
        for (let key in noteObj) {
            cards.innerHTML += noteObj[key]; 
        }
    }
    else{
        document.getElementById("cards").innerHTML = "<h4>Nothing to show!</h4>"
    }
}

function deleteCard(key) {
    delete noteObj[key];
    showCards();
}

addButton.addEventListener("click", e => {
    let textContent = document.getElementById("note");
    if (textContent.value != "") {
        content = `
            <div class="card m-2" style="width: 18rem;">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">${timeStamp()}</h6>
                    <p class="card-text">${textContent.value}</p>
                    <button type="button" class="btn btn-success" id="${count}" onclick="deleteCard(${count})">Delete</button>
                </div>
            </div>`;

        noteObj[count] = content;
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
