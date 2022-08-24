function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {}

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list"),
    row = document.createElement("tr");

  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class='delete'>X</a></td>
  `;
  list.appendChild(row);
};

UI.prototype.showAlert = function (message, className) {
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));

  const container = document.querySelector(".container"),
    form = document.querySelector("#book-form");

  container.insertBefore(div, form);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.clearFields = function () {
  title.value = "";
  author.value = "";
  isbn.value = "";
};

UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

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

    ui.showAlert("Book Removed!", "info");

    event.preventDefault();
  });
