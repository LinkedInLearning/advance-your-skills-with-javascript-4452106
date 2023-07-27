class Book {
  constructor(title, author, publicationYear) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
    this.status = "available"; // Added status property
  }

  getDetails() {
    return `Title: ${this.title}, Author: ${this.author}, Publication Year: ${this.publicationYear}, Status: ${this.status}`;
  }
}

class Fiction extends Book {
  constructor(title, author, publicationYear, genre) {
    super(title, author, publicationYear);
    this.genre = genre;
  }

  getDetails() {
    return `${super.getDetails()}, Genre: ${this.genre}`;
  }
}

class NonFiction extends Book {
  constructor(title, author, publicationYear, subject) {
    super(title, author, publicationYear);
    this.subject = subject;
  }

  getDetails() {
    return `${super.getDetails()}, Subject: ${this.subject}`;
  }
}

class Library {
  constructor() {
    this.books = [];
    this.users = [];
    this.librarian = null; // single librarian
  }

  addBook(book) {
    this.books.push(book);
    // return how many books are in the library now that a new one is added
    return `Book "${book.title}" added. There are now ${this.books.length} books in the library.`;
  }

  removeBook(title) {
    // remove the book from the library if it exists.
    // return how many books are in the library now that one is removed
    if (this.books.find((book) => book.title === title)) {
      this.books = this.books.filter((book) => book.title !== title);
      return `Book "${title}" removed. There are now ${this.books.length} books in the library.`;
    } else {
      return `Book "${title}" not found.`;
    }
  }

  addUser(user) {
    this.users.push(user);
  }

  setLibrarian(librarian) {
    if (!this.librarian) {
      // only set if there's no librarian yet
      this.librarian = librarian;
      return "Librarian added.";
    } else {
      return "A librarian already exists.";
    }
  }

  findBook(title) {
    return this.books.find((book) => book.title === title);
  }

  findUser(name) {
    return this.users.find((user) => user.name === name);
  }
}

class LibraryUser {
  constructor(name) {
    this.name = name;
    this.borrowedBooks = [];
  }

  checkAvailability(library, title) {
    const book = library.findBook(title);
    if (book) {
      if (book.status === "available") {
        return `Book is available: ${book.getDetails()}`;
      } else {
        return `"${title}" is currently on loan.`;
      }
    } else {
      return `Book titled "${title}" not found.`;
    }
  }

  loanBook(library, title) {
    const librarian = library.librarian;
    const book = library.findBook(title);
    if (this.suspended) {
      return `${this.name} is suspended and cannot borrow books.`;
    }
    if (book) {
      if (book.status === "available") {
        // Check if book is available
        this.borrowedBooks.push(book);
        book.status = "on loan"; // Change book status
        return `${this.name} has borrowed the book "${title}" from ${librarian.name}.`;
      } else {
        return `"${title}" is currently on loan.`;
      }
    } else {
      return `Book titled "${title}" not found.`;
    }
  }
}

class Librarian extends LibraryUser {
  constructor(name) {
    super(name);
  }

  returnBook(library, title, userName) {
    const book = library.findBook(title);
    const user = library.findUser(userName);

    if (book && user) {
      const bookIndex = user.borrowedBooks.findIndex((b) => b.title === title);
      if (bookIndex !== -1) {
        user.borrowedBooks.splice(bookIndex, 1);
        book.status = "available"; // Change book status back to available
        return `${this.name} has checked in the book "${title}" from ${userName}.`;
      } else {
        return `"${title}" not found in user's borrowed books.`;
      }
    } else {
      return "Book or user not found.";
    }
  }

  suspendUser(library, userName) {
    const user = library.findUser(userName);

    if (user) {
      user.suspended = true;
      return `${this.name} has suspended ${userName}.`;
    } else {
      return "User not found.";
    }
  }
}

const book01 = {
  title: "Odyssey",
  author: "Homer",
  pubYear: 1726,
  genre: "Coming of Age",
};

const book02 = {
  title: "The Yellow Wallpaper",
  author: "Charlotte Perkins Gilman",
  pubYear: 1892,
  genre: "Womens rights",
};

const book03 = {
  title: "The Book of Bread",
  author: "Owen Simmons",
  pubYear: 1903,
  genre: "Baking",
};

// Create a library with books, a librarian, and users
const library = new Library();
library.addBook(
  new Fiction(book01.title, book01.author, book01.pubYear, book01.genre)
);
library.addBook(
  new Fiction(book02.title, book02.author, book02.pubYear, book02.genre)
);
library.addBook(
  new NonFiction(book03.title, book03.author, book03.pubYear, book03.genre)
);
const librarian = new Librarian("Alice"); // only one librarian
library.setLibrarian(librarian); // set the librarian
const user001 = new LibraryUser("Simran");
library.addUser(user001);
const user002 = new LibraryUser("Maiken");
library.addUser(user002);
const librarian2 = new Librarian("Bob");

// Test capabilities of different actors
const result = () => {
  console.log(library.setLibrarian(librarian2)); // A librarian already exists.
  console.log(user001.checkAvailability(library, book01.title)); // Book is available: Title: ${book01.title}, Author: ${book01.author}, Publication Year: ${book01.pubYear}, Status: available, Genre: ${book01.genre}
  console.log(user001.checkAvailability(library, "Silo")); // Book titled "Silo" not found.
  console.log(user001.loanBook(library, book01.title)); // Simran has borrowed the book "${book01.title}" from Alice.
  console.log(user002.loanBook(library, book01.title)); // "${book01.title}" is currently on loan.
  console.log(librarian.returnBook(library, book01.title, "Simran")); // Alice has checked in the book "${book02.title}" from Simran.
  console.log(user002.loanBook(library, book01.title)); // "${book02.title}" not found in user's borrowed books.
  console.log(librarian.returnBook(library, book02.title, "Maiken")); // Alice has suspended Maiken.
  console.log(librarian.suspendUser(library, "Maiken")); // Maiken is suspended and cannot borrow books.
  console.log(user002.loanBook(library, book02.title)); // Book titled "Annihilation" not found.
  console.log(user001.loanBook(library, "Annihilation")); // Book titled "Annihilation" not found.
  return ""
};

console.log(result());
