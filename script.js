class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  constructor() {}

  addBookToList(book) {
    const list = document.getElementById("book-list"),
      row = document.createElement("tr");

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class='delete'>X</a></td>
  `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container"),
      form = document.querySelector("#book-form");

    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  clearFields() {
    title.value = "";
    author.value = "";
    isbn.value = "";
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => {
      const ui = new UI();

      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

document.addEventListener("DOMContentLoaded", Store.displayBooks);
document
  .getElementById("book-form")
  .addEventListener("submit", function (event) {
    const title = document.getElementById("title").value,
      author = document.getElementById("author").value,
      isbn = document.getElementById("isbn").value;

    const book = new Book(title, author, isbn),
      ui = new UI();

    if (title === "" || author === "" || isbn === "") {
      ui.showAlert("Please fill in all fields.", "error");
    } else {
      ui.addBookToList(book);
      Store.addBook(book);
      ui.showAlert("Book Added!", "success");
      ui.clearFields();
    }

    event.preventDefault();
  });

document
  .getElementById("book-list")
  .addEventListener("click", function (event) {
    const ui = new UI();
    ui.deleteBook(event.target);

    Store.removeBook(
      event.target.parentElement.previousElementSibling.textContent
    );

    ui.showAlert("Book Removed!", "info");

    event.preventDefault();
  });
