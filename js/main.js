const API = "http://localhost:8000/books";
let inpName = document.querySelector("#inpName");
let inpAuthor = document.querySelector("#inpAuthor");
let inpImg = document.querySelector("#inpImg");
let inpPrice = document.querySelector("#inpPrice");
let btnAdd = document.querySelector("#btnAdd");
let sectionBooks = document.querySelector("#sectionBooks");
let btnOpenForm = document.querySelector("#collapseThree");

btnAdd.addEventListener("click", () => {
  if (
    !inpName.value.trim() ||
    !inpAuthor.value.trim() ||
    !inpImg.value.trim() ||
    !inpPrice.value.trim()
  ) {
    alert("Заполните все поля");
    return;
  }
  let newBook = {
    bookName: inpName.value,
    bookAuthor: inpAuthor.value,
    bookImg: inpImg.value,
    bookPrice: inpPrice.value,
  };
  createBook(newBook);
  readBooks();
});
//! ==============================CREATE==========================
function createBook(book) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(book),
  });
  inpName.value = "";
  inpAuthor.value = "";
  inpImg.value = "";
  inpPrice.value = "";
  btnOpenForm.classList.toggle("show");
}
//! =======================READ===================
async function readBooks() {
  const res = await fetch(API);
  const data = await res.json();
  sectionBooks.innerHTML = "";
  data.forEach((elem) => {
    sectionBooks.innerHTML += `
    <div class="card m-4 cardBook" style="width: 15rem">
    <img style="height:280px" src="${elem.bookImg}" alt="${elem.bookName}" />
    <div class="card-body">
      <h5 class="card-title">${elem.bookName}</h5>
      <p class="card-text">${elem.bookAuthor}</p>
      <span>${elem.bookPrice}</span>
      <button class="btn btn-outline-danger btnDelete" id="${elem.id}">Удалить</button>
      <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-outline-warning btnEdit" id="${elem.id}">Редактировать</button>
    </div>
  </div>
    `;
  });
}
readBooks();

//! ===============================DELETE==========================
document.addEventListener("click", (e) => {
  let del_id = e.target.id;
  let del_class = [...e.target.classList];
  if (del_class.includes("btnDelete")) {
    fetch(`${API}/${del_id}`, {
      method: "DELETE",
    }).then(() => readBooks());
  }
});
