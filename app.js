const myLibrary = [];

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
    const str = `${this.title} by ${this.author}, ${this.pages} pages, ${readString}`;
    return str;
  };

  this.toggleRead = () => {
    this.read = !this.read;
  };
}

function addBookToLibrary(b) {
  return myLibrary.push(b);
}

function bookListHeader() {
  const booklist = document.querySelector("#booklist");
  const header = document.createElement("div");
  header.classList.add("booklist-header");

  const testBook = new Book("T", "T", 1, true);
  Object.keys(testBook).forEach((key) => {
    if (!(typeof testBook[key] === "function")) {
      // Only add non-function properties
      const newp = document.createElement("p");
      newp.textContent = `${key.toUpperCase()}`;
      newp.classList.add(key);

      if (key === "pages") {
        newp.classList.add("right-align");
      }
      header.appendChild(newp);
    }
  });

  const buttonsHeader = "Actions";
  const newp = document.createElement("p");
  newp.textContent = `${buttonsHeader.toUpperCase()}`;
  header.appendChild(newp);
  booklist.appendChild(header);
}

function displayBooks() {
  // Clear current display
  const booklist = document.querySelector("#booklist");
  while (booklist.firstChild) {
    booklist.removeChild(booklist.lastChild);
  }

  // Add header
  bookListHeader();

  // Add an entry for each book
  let idx = 0;
  myLibrary.forEach((book) => {
    const bookcard = document.createElement("div");
    bookcard.classList.add("bookcard");
    bookcard.setAttribute("data-book-index", idx);

    // Loop through all properties of Book
    Object.keys(book).forEach((key) => {
      if (!(typeof book[key] === "function")) {
        // Only add non-function properties
        const newp = document.createElement("p");

        console.log(typeof book[key]);
        console.log(typeof book[key] === "boolean");
        if (typeof book[key] === "boolean") {
          newp.textContent = book[key] ? "Yes" : "No";
        } else {
          newp.textContent = `${book[key]}`;
        }

        newp.classList.add(key);
        if (key === "pages") {
          newp.classList.add("right-align");
        }
        bookcard.appendChild(newp);
      }
    });

    // Add buttons div to remove and read
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("entry-buttons");

    let newb = document.createElement("button");
    newb.textContent = "❌";
    newb.addEventListener("click", removeBook);
    buttonDiv.appendChild(newb);

    newb = document.createElement("button");
    newb.textContent = book.read ? "📕" : "📖";
    newb.addEventListener("click", eventToggleRead);
    buttonDiv.appendChild(newb);

    bookcard.appendChild(buttonDiv);
    booklist.appendChild(bookcard);

    idx++;
  });
}

function removeBook(e) {
  // Find index stored in bookcard data attribute
  const button = e.target;
  const buttonContainer = button.parentElement;
  const bookcard = buttonContainer.parentElement;
  const idx = bookcard.dataset.bookIndex;

  // Remove said index from library and update display
  myLibrary.splice(idx, 1); // Remove ONE element, starting on index 'idx'
  displayBooks();
}

function eventToggleRead(e) {
  // Find index stored in bookcard data attribute
  const button = e.target;
  const buttonContainer = button.parentElement;
  const bookcard = buttonContainer.parentElement;
  const idx = bookcard.dataset.bookIndex;

  // Update said book's read state and update display
  myLibrary[idx].toggleRead();
  displayBooks();
}

function toggleForm(e) {
  const form = document.querySelector("#newbookform");
  form.classList.toggle("hidden");
}
function newBookListener() {
  const btn = document.querySelector("#newbook");
  console.log("clickevent");
  btn.addEventListener("click", toggleForm);
}
newBookListener();

// Prevent default submitting behaviour of trying to send data to the server
function submitBook(e) {
  e.preventDefault(); // Avoid sending to server (default behaviour)
  console.log(e);

  const form = document.querySelector("#newbookform");
  const formData = new FormData(form);
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

  const newBook = new Book(
    formData.get("booktitle"),
    formData.get("bookauthor"),
    formData.get("bookpages"),
    bookread
  );
  addBookToLibrary(newBook);
  displayBooks();
}

function submitFormListener() {
  const form = document.querySelector("#newbookform");
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
