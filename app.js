let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = () => {
    let readString = "";
    if (this.read) {
      readString = "already read";
    } else {
      readString = "not read yet";
    }
    let str = `${this.title} by ${this.author}, ${this.pages} pages, ${readString}`;
    return str;
  };
}

function addBookToLibrary(b) {
  return myLibrary.push(b);
}

function displayBooks() {
  // Clear current display
  let booklist = document.querySelector("#booklist");
  while (booklist.firstChild) {
    booklist.removeChild(booklist.lastChild);
  }

  // Add an entry for each book
  let idx = 0;
  myLibrary.forEach((book) => {
    let bookcard = document.createElement("div");
    bookcard.classList.add("bookcard");
    bookcard.setAttribute('data-book-index', idx);

    // Loop through all properties of Book
    Object.keys(book).forEach((key) => {
      if (!(typeof book[key] === "function")) {
        // Only add non-function properties
        let newp = document.createElement("p");
        newp.textContent = `${book[key]}`;
        newp.classList.add(key);
        bookcard.appendChild(newp);
      }
    });

    // Add buttons div to remove and read
    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("entry-buttons");
  
    let newb = document.createElement("button");
    newb.textContent = "Remove";
    newb.addEventListener('click', removeBook);
    buttonDiv.appendChild(newb);

    newb = document.createElement("button");
    newb.textContent = "Read";
    buttonDiv.appendChild(newb);

    bookcard.appendChild(buttonDiv);
    booklist.appendChild(bookcard);

    idx++;
  });
}

function removeBook(e) {
  // Find index stored in bookcard data attribute
  let button = e.target;
  let buttonContainer = button.parentElement;
  let bookcard = buttonContainer.parentElement;
  let idx = bookcard.dataset.bookIndex;

  // Remove said index from library and update display
  myLibrary.splice(idx, 1); // Remove ONE element, starting on index 'idx' 
  displayBooks();
}

function toggleForm(e) {
  let form = document.querySelector("#newbookform");
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
  } else {
    form.classList.add("hidden");
  }
}
function newBookListener() {
  let btn = document.querySelector("#newbook");
  console.log("clickevent");
  btn.addEventListener("click", toggleForm);
}
newBookListener();

// Prevent default submitting behaviour of trying to send data to the server
function submitBook(e) {
  e.preventDefault(); // Avoid sending to server (default behaviour)
  console.log(e);

  let form = document.querySelector("#newbookform");
  formData = new FormData(form);
  for (const p of formData.entries()) {
    console.log(p);
  }
  let bookread = false;
  if (formData.get("bookread")) {
    bookread = true;
    console.log(formData.get("bookread"));
  } else {
    bookread = false;
    console.log("Not read");
  }
  form.reset();

  let newBook = new Book(formData.get("booktitle"), formData.get("bookauthor"), formData.get("bookpages"), bookread);
  addBookToLibrary(newBook);
  displayBooks();
}

function submitFormListener() {
  let form = document.querySelector("#newbookform");
  form.addEventListener("submit", submitBook);
}
submitFormListener();







addBookToLibrary(new Book("The Hobbit", "J.R.R Tolkien", 295, false));
addBookToLibrary(
  new Book("Memórias Póstumas de Brás Cubas", "Machado de Assis", 320, false)
);
addBookToLibrary(
  new Book("20,000 Leagues Under the Sea", "Jules Verne", 316, true)
);
displayBooks();
// console.log(myLibrary);
