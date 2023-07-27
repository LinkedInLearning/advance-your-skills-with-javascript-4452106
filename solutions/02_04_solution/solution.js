class Book {
  constructor(title, author, publicationYear) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
    this.status = "available";
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

  findBook(title) {
    // If book is found, return the book object
    // If book is not found, return a message
    const book = this.books.find((book) => book.title === title);
    if (book) {
      return `Book titled ${title} is in the library`;
    } else {
      return `Book titled "${title}" not found.`;
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
console.log(
  library.addBook(
    new Fiction(book01.title, book01.author, book01.pubYear, book01.genre)
  )
);
console.log(
  library.addBook(
    new Fiction(book02.title, book02.author, book02.pubYear, book02.genre)
  )
);
console.log(
  library.addBook(
    new NonFiction(book03.title, book03.author, book03.pubYear, book03.genre)
  )
);

// Test capabilities of the library
const result = () => {
  console.log(library.findBook("Odyssey")); // Book titled "Odyssey" is in the library
  console.log(library.findBook("Silo")); // Book titled "Silo" not found.
  console.log(library.removeBook("Odyssey")); // Book "Odyssey" removed. There are now 2 books in the library.
  return "";
};

console.log(result());
