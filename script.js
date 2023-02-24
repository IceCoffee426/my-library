// Next steps: save data

// Main div holding all the books, add button and the form it displays
const bookLibrary = document.querySelector(".book-library");
const addBook = document.getElementById("add-book");
const bookForm = document.getElementById("book-form");

// Book class constructor
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// Pre-rendered books for testing
// const theLordOfTheRings = new Book(
//   "The Lord of the Rings",
//   "JRR Tolkien",
//   1000,
//   true
// );
// const aGameOfThrones = new Book(
//   "A Game of Thrones",
//   "George RR Martin",
//   800,
//   true
// );
// const theEyeOfTheWorld = new Book(
//   "The Eye of the World",
//   "Robert Jordan",
//   900,
//   false
// );
// const theLastWish = new Book("The Last Wish", "Anrdrei Sapkowski", 600, false);
// const jadeCity = new Book("Jade City", "Fonda Lee", 550, false);
// const harryPotter1 = new Book(
//   "Harry Potter and the Philosopher's Stone",
//   "JK Rowling",
//   250,
//   true
// );

// myLibrary = [
//   theLordOfTheRings,
//   aGameOfThrones,
//   theEyeOfTheWorld,
//   theLastWish,
//   jadeCity,
//   harryPotter1,
// ];

myLibrary = [];

// Add pre-rendered books to book library
function renderBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    addBookToLibrary(myLibrary[i], i);
  }
}

// Function to add the books into the library
function addBookToLibrary(book, index) {
  const bookCard = createElement("div", "", "book-card");
  const cardButtons = createElement("div", "", "card-buttons");
  bookCard.appendChild(cardButtons);
  bookCard.setAttribute("data-index", index);
  const editBtn = document.createElement("button");
  editBtn.className = "edit";
  editBtn.textContent = "✐";
  editBtn.onclick = function () {
    editBook(bookCard);
  };
  cardButtons.appendChild(editBtn);
  const deleteBtn = createElement("button", "×", "delete");
  deleteBtn.onclick = function () {
    openModal(bookCard);
  };
  cardButtons.appendChild(deleteBtn);
  const bookDetails = createElement("div", "", "book-details");
  bookCard.appendChild(bookDetails);
  bookDetails.appendChild(createElement("p", book.title, "title"));
  bookDetails.appendChild(createElement("p", book.author, "author"));
  bookDetails.appendChild(createElement("p", book.pages, "pages"));
  const readBtn = createElement("button", "", "read-toggle");
  readBtn.setAttribute("type", "button");
  if (book.read === true) {
    readBtn.classList.add("read");
  } else {
    readBtn.classList.add("not-read");
  }
  bookDetails.appendChild(readBtn);
  readBtn.onclick = function () {
    if (readBtn.classList.contains("not-read")) {
      readBtn.classList.remove("not-read");
      readBtn.classList.add("read");
      book.read = true;
    } else {
      readBtn.classList.remove("read");
      readBtn.classList.add("not-read");
      book.read = false;
    }
  };
  bookLibrary.prepend(bookCard);
}

// Function to edit a book
function editBook(card) {
  let index = card.getAttribute("data-index");
  let book = myLibrary[index];
  const editBtn = card.querySelector(".edit");
  editBtn.textContent = "✔";
  editBtn.style.color = "#5b8e7d";
  editBtn.onclick = function () {
    bookDetails.prepend(createElement("p", pagesInput.value, "pages"));
    book.pages = pagesInput.value;
    bookDetails.prepend(createElement("p", authorInput.value, "author"));
    book.author = authorInput.value;
    bookDetails.prepend(createElement("p", titleInput.value, "title"));
    book.title = titleInput.value;
    pagesInput.remove();
    authorInput.remove();
    titleInput.remove();
    editBtn.textContent = "✐";
    editBtn.style.color = "#fbc252";
    editBtn.onclick = function () {
      editBook(card);
    };
  };
  const bookDetails = card.querySelector(".book-details");
  let title = card.querySelector(".title");
  let author = card.querySelector(".author");
  let pages = card.querySelector(".pages");
  pagesInput = createFormElement("pages", "number", pages.textContent, "10");
  pages.remove();
  bookDetails.prepend(pagesInput);
  authorInput = createFormElement("author", "text", author.textContent, "100");
  author.remove();
  bookDetails.prepend(authorInput);
  titleInput = createFormElement("title", "text", title.textContent, "100");
  title.remove();
  bookDetails.prepend(titleInput);
  titleInput.focus();
}

// Helper function to create HTML elements with given text and class
function createElement(type, text, className) {
  const element = document.createElement(type);
  element.textContent = text;
  element.setAttribute("class", className);
  return element;
}

// Helper function to create form elements
function createFormElement(id, type, value, length) {
  const input = document.createElement("input");
  input.setAttribute("id", id);
  input.setAttribute("type", type);
  input.setAttribute("value", value);
  input.setAttribute("maxlength", length);
  input.setAttribute("required", "");
  return input;
}

// Modal to confirm deletion
const modal = document.getElementById("modal");
function openModal(card) {
  modal.style.display = "block";
  const confirmDelete = document.getElementById("confirm-delete");
  const closeModal = document.getElementById("close-modal");
  confirmDelete.onclick = function () {
    deleteBook(card);
  };
  closeModal.onclick = function () {
    modal.style.display = "none";
  };
}

// Deletion function
function deleteBook(card) {
  let index = card.getAttribute("data-index");
  myLibrary.splice(index, 1);
  let prevCard = card.previousSibling;
  // Adjusts data-index value for all cards above deleted one
  for (let i = index; i < myLibrary.length; i++) {
    prevCard.setAttribute("data-index", i);
    prevCard = prevCard.previousSibling;
  }
  card.remove();
  modal.style.display = "none";
}

// Open form to add new book to library
addBook.onclick = function () {
  bookForm.style.display = "flex";
  const deleteBtn = document.getElementById("form-delete-btn");
  deleteBtn.onclick = function () {
    bookForm.style.display = "none";
  };
  const readBtn = document.getElementById("form-read-btn");
  readBtn.onclick = function () {
    if (readBtn.classList.contains("not-read")) {
      readBtn.classList.remove("not-read");
      readBtn.classList.add("read");
    } else {
      readBtn.classList.remove("read");
      readBtn.classList.add("not-read");
    }
  };
  const title = document.getElementById("title");
  title.focus();
};

// Add a new book from the form to the library
const tickBtn = document.getElementById("form-tick-btn");
tickBtn.onclick = function (e) {
  e.preventDefault();
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const readBtn = document.getElementById("form-read-btn");
  if (title.value == "" || author.value == "" || pages.value == "") {
    alert("Complete all fields.");
    title.focus();
    return;
  }
  const newBook = new Book(title.value, author.value, pages.value, false);
  if (readBtn.classList.contains("read")) newBook.read = true;
  bookForm.style.display = "none";
  bookForm.reset();
  readBtn.classList.remove("read");
  readBtn.classList.add("not-read");
  addBookToLibrary(newBook, myLibrary.length);
  myLibrary.push(newBook);
};

renderBooks();

document.getElementById("login");
login.onclick = function () {
  console.log(myLibrary);
};
