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
  if (booklist.hasChildNodes()) {
    booklist.childNodes.forEach((child) => booklist.removeChild(child));
  }

  // Add an entry for each book
  myLibrary.forEach((book) => {
    let bookcard = document.createElement("div");

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
    booklist.appendChild(bookcard);
  });
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
// TODO: data submission via JS
function submitFormListener() {
  let btn = document.querySelector("#submitform");
  btn.addEventListener("click", e => e.preventDefault());
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
