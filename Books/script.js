const navigationHome = document.querySelector(".navigation-home");
const navigationBooks = document.querySelector(".navigation-books");
const bestRatingContainer = document.querySelector(".best-rating-container");
const mostReviewsContainer = document.querySelector(".most-reviews-container");
const allBooks = document.querySelector(".books-all");
const genres = document.querySelector(".books-all-genres");
const allBooksItems = document.querySelector(".books-all-items");
const homePage = document.querySelector(".books-home");
const singleBook = document.querySelector(".book");
const singleBookImage = document.querySelector(".book-image img");
const singleBookData = document.querySelector(".book-data");
const singleBookDescription = document.querySelector(".book-description");
const singleBookInfo = document.querySelector(".book-info");
const back = document.querySelector(".book-back");
const searchInput = document.querySelector(".header-search input");
const searchButton = document.querySelector(".header-search button");
const mostReviewsHeading = document.querySelector(".most-reviews-heading");
const checkbox = document.querySelector(".checkbox");
const checkboxLabel = document.querySelector("label");

let allGenres = [];
const adultGenres = [
  "adult",
  "lgbt",
  "erotic",
  "lgbt",
  "glbt",
  "abuse",
  "alcohol",
  "lesbian",
  "gay",
];
let books;
let filteredBooks;

let averageRating = 0;

let activePage = "Home";

// const getBooksData = async () => {
//   return (
//     await fetch("https://api.jsonbin.io/v3/b/63a0e753dfc68e59d56c71ec/latest", {
//       method: "GET",
//       headers: {
//         "X-Master-Key":
//           "$2b$10$viPOiL/.5Te1ctsEnmquLuBHKGeK09Vp0SxT2m7wkH68/e1537nUK",
//       },
//     })
//   ).json();
// };

const getBooksData = async () => {
  return (await fetch("./books.json")).json();
};

const createCard = (book, category, container) => {
  const card = document.createElement("div");
  const cardImage = document.createElement("img");
  const cardName = document.createElement("div");
  const cardRating = document.createElement("div");

  cardImage.setAttribute("src", book.img || "./images/book.jpg");
  cardName.innerHTML = book.title;
  cardRating.innerHTML = `Rating : ${book.rating}`;
  card.classList.add(`${category}-item`);
  cardName.classList.add(`${category}-item-name`);
  cardRating.classList.add(`${category}-item-rating`);
  card.append(cardImage, cardName, cardRating);
  container.append(card);
};

const createBookInfo = (book) => {
  singleBookInfo.innerHTML = "";
  const title = document.createElement("div");
  const genre = document.createElement("div");
  const pages = document.createElement("div");
  const rating = document.createElement("div");

  title.innerHTML = `Title : ${book.title}`;
  genre.innerHTML = `Genres : ${book.genre}`;
  pages.innerHTML = `Pages : ${book.pages}`;
  rating.innerHTML = `Rating : ${book.rating}`;

  rating.classList.add("book-info-rating");

  rating.style.backgroundColor = book.rating < averageRating ? "red" : "green";

  singleBookInfo.append(title, genre, pages, rating);
};

const showBookInfo = (book, index, container) => {
  document
    .querySelectorAll(`.${container}`)
    [index].addEventListener("click", () => {
      singleBook.style.display = "unset";
      if (activePage === "Books") {
        allBooks.style.display = "none";
      } else {
        homePage.style.display = "none";
      }

      singleBookImage.setAttribute("src", book.img || "./images/book.jpg");
      createBookInfo(book);
      singleBookDescription.innerHTML = `Description: </br> </br>${book.desc}`;
    });
};

const showBooks = (books, container) => {
  allBooksItems.innerHTML = "";
  books.forEach((book, index) => {
    createCard(book, "books-all", allBooksItems);
    showBookInfo(book, index, container);
  });
};

const createGenresList = (genre) => {
  const genreItem = document.createElement("p");
  genreItem.innerHTML = genre;
  genres.append(genreItem);
};

const search = () => {
  if (searchInput.value) {
    if (activePage === "Home") {
      allBooks.style.display = "flex";
      homePage.style.display = "none";
    }
    // let searchedBook = books.record.results.filter((book) => {
    // return book.title.toLowerCase().includes(searchInput.value.toLowerCase());
    // });
    let searchedBook = books.results.filter((book) => {
      if (book.title) {
        return book.title
          .toString()
          .toLowerCase()
          .includes(searchInput.value.toLowerCase());
      }
    });
    if (searchedBook.length > 0) {
      allBooksItems.innerHTML = "";
      showBooks(searchedBook, "books-all-item");
    } else {
      alert("There is no such book!");
    }
    searchInput.value = "";
  }
};

const filterByGenre = () => {
  document.querySelectorAll(".books-all-genres p").forEach((genre) => {
    genre.addEventListener("click", () => {
      currentGenre = genre.innerHTML;

      // let filteredBooksByGenre = books.record.results.filter((book) =>
      //   book.genre.includes(genre.innerHTML)
      // );
      let filteredBooksByGenre = books.results.filter((book) =>
        book.genre.includes(genre.innerHTML)
      );

      allBooksItems.innerHTML = "";
      if (genre.innerHTML === "Default") {
        // showBooks(books.record.results);
        if (checkbox.checked) {
          showBooks(books.results, "books-all-item");
        } else {
          showBooks(filteredBooks, "books-all-item");
        }
      } else {
        showBooks(filteredBooksByGenre, "books-all-item");
      }
    });
  });
};

const defaultGenre = () => {
  genres.innerHTML = "Genres :";
  const defaultGenreP = document.createElement("p");
  defaultGenreP.innerHTML = "Default";
  genres.append(defaultGenreP);
};

window.addEventListener("load", async () => {
  try {
    books = await getBooksData();
  } catch (err) {
    throw new Error(err);
  }

  filteredBooks = books.results.filter((book) => {
    return !adultGenres.some((genre) => {
      return book.genre.toLowerCase().includes(genre);
    });
  });

  // books.record.results.forEach((book) => {
  //   averageRating += book.rating;
  // });
  books.results.forEach((book) => {
    averageRating += book.rating;
  });

  // averageRating = averageRating / books.record.results.length;
  averageRating = averageRating / books.results.length;

  // books.record.results.forEach((book) => {
  // const bookGenres = book.genre.split(",");
  // bookGenres.forEach((genre) => {
  // if (!allGenres.includes(genre)) {
  // allGenres = [...allGenres, genre];
  // }
  // });
  // });
  books.results.forEach((book) => {
    const bookGenres = book.genre.split(",");
    bookGenres.forEach((genre) => {
      if (!allGenres.includes(genre)) {
        allGenres = [...allGenres, genre];
      }
    });
  });

  const randomGenreIndex = Math.floor(Math.random() * allGenres.length - 1);
  const randomGenre = allGenres[randomGenreIndex];
  // let booksWithGenre = books.record.results.filter((book) =>
  // book.genre.includes(randomGenre)
  // );
  let booksWithGenre = books.results.filter((book) =>
    book.genre.includes(randomGenre)
  );

  mostReviewsHeading.innerHTML += ` by genre "${randomGenre}"`;

  // const highestRatedBooks = [...books.record.results].sort((a, b) => {
  //   return a.rating < b.rating ? 1 : a.rating > b.rating ? -1 : 0;
  // });
  const highestRatedBooks = [...books.results].sort((a, b) => {
    return a.rating < b.rating ? 1 : a.rating > b.rating ? -1 : 0;
  });

  const mostReviewsBooks = [...booksWithGenre].sort((a, b) => {
    return a.reviews < b.reviews ? 1 : a.reviews > b.reviews ? -1 : 0;
  });

  for (let i = 0; i < 4; i++) {
    if (highestRatedBooks[i]) {
      createCard(
        highestRatedBooks[i],
        "best-rating-container",
        bestRatingContainer
      );
      showBookInfo(highestRatedBooks[i], i, "best-rating-container-item");
    }
    if (mostReviewsBooks[i]) {
      createCard(
        mostReviewsBooks[i],
        "most-reviews-container",
        mostReviewsContainer
      );
      showBookInfo(mostReviewsBooks[i], i, "most-reviews-container-item");
    }
  }

  allGenres
    .filter((allGenre) => {
      return !adultGenres.some((genre) => {
        return allGenre.toLowerCase().includes(genre);
      });
    })
    .sort()
    .forEach((genre) => {
      createGenresList(genre);
    });
});

navigationBooks.addEventListener("click", () => {
  checkbox.style.display = "unset";
  checkboxLabel.style.display = "unset";
  activePage = "Books";
  allBooks.style.display = "flex";
  homePage.style.display = "none";
  singleBook.style.display = "none";
  currentGenre = "";
  // showBooks(books.record.results);
  if (checkbox.checked) {
    showBooks(books.results, "books-all-item");
  } else {
    showBooks(filteredBooks, "books-all-item");
  }

  search();

  filterByGenre();
});

navigationHome.addEventListener("click", () => {
  checkbox.style.display = "none";
  checkboxLabel.style.display = "none";
  singleBook.style.display = "none";
  activePage = "Home";
  allBooks.style.display = "none";
  homePage.style.display = "flex";
});

back.addEventListener("click", () => {
  singleBook.style.display = "none";
  if (activePage === "Books") {
    allBooks.style.display = "flex";
  } else {
    homePage.style.display = "flex";
  }
});

searchButton.addEventListener("click", search);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    search();
  }
});

checkbox.addEventListener("change", () => {
  genres.innerHTML = "";

  if (checkbox.checked) {
    showBooks(books.results, "books-all-item");
    defaultGenre();
    allGenres.sort().forEach((genre) => {
      createGenresList(genre);
    });
  } else {
    showBooks(filteredBooks, "books-all-item");
    let filteredGenres = allGenres.filter((allGenre) => {
      return !adultGenres.some((genre) => {
        return allGenre.toLowerCase().includes(genre);
      });
    });
    defaultGenre();
    filteredGenres.sort().forEach((genre) => {
      createGenresList(genre);
    });
  }

  filterByGenre();
});
