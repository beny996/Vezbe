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
const headings = document.querySelectorAll(".books-item-heading");

let allGenres = [];
let books;

let averageRating = 0;

const getBooksData = async () => {
  return (
    await fetch("https://api.jsonbin.io/v3/b/63a0e753dfc68e59d56c71ec/latest", {
      method: "GET",
      headers: {
        "X-Master-Key":
          "$2b$10$viPOiL/.5Te1ctsEnmquLuBHKGeK09Vp0SxT2m7wkH68/e1537nUK",
      },
    })
  ).json();
};

const createCard = (book, category, container) => {
  const card = document.createElement("div");
  const cardImage = document.createElement("img");
  const cardName = document.createElement("div");
  const cardRating = document.createElement("div");

  cardImage.setAttribute("src", book.img);
  cardName.innerHTML = book.title;
  cardRating.innerHTML = book.rating;
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

const showBooks = (books) => {
  books.forEach((book, index) => {
    createCard(book, "books-all", allBooksItems);
    document
      .querySelectorAll(".books-all-item")
      [index].addEventListener("click", () => {
        singleBook.style.display = "unset";
        allBooks.style.display = "none";
        singleBookImage.setAttribute("src", book.img);
        createBookInfo(book);
        singleBookDescription.innerHTML = `Description: </br> </br>${book.desc}`;
      });
  });
};

const search = () => {
  let searchedBook = books.record.results.filter((book) => {
    return book.title.toLowerCase().includes(searchInput.value);
  });
  if (searchedBook.length > 0) {
    allBooksItems.innerHTML = "";
    showBooks(searchedBook);
  } else {
    alert("There is no such book!");
  }
  searchInput.value = "";
};

window.addEventListener("load", async () => {
  try {
    books = await getBooksData();
  } catch (err) {
    throw new Error(err);
  }

  books.record.results.forEach((book) => {
    averageRating += book.rating;
  });

  averageRating = averageRating / books.record.results.length;

  books.record.results.forEach((book) => {
    const bookGenres = book.genre.split(",");
    bookGenres.forEach((genre) => {
      if (!allGenres.includes(genre)) {
        allGenres = [...allGenres, genre];
      }
    });
  });

  const randomGenreIndex = Math.floor(Math.random() * allGenres.length - 1);
  const randomGenre = allGenres[randomGenreIndex];
  let booksWithGenre = books.record.results.filter((book) =>
    book.genre.includes(randomGenre)
  );

  headings.forEach((heading) => {
    heading.innerHTML += ` by genre "${randomGenre}"`;
  });

  const highestRatedBooks = [...booksWithGenre].sort((a, b) => {
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
    }
    if (mostReviewsBooks[i]) {
      createCard(
        mostReviewsBooks[i],
        "most-reviews-container",
        mostReviewsContainer
      );
    }
  }

  allGenres.forEach((genre) => {
    const genreItem = document.createElement("p");
    genreItem.innerHTML = genre;
    genres.append(genreItem);
  });
});

navigationBooks.addEventListener("click", () => {
  allBooks.style.display = "flex";
  homePage.style.display = "none";
  singleBook.style.display = "none";
  currentGenre = "";
  showBooks(books.record.results);
  search();

  document.querySelectorAll(".books-all-genres p").forEach((genre) => {
    genre.addEventListener("click", () => {
      currentGenre = genre.innerHTML;

      let filteredBooks = books.record.results.filter((book) =>
        book.genre.includes(genre.innerHTML)
      );

      allBooksItems.innerHTML = "";
      if (genre.innerHTML === "Default") {
        showBooks(books.record.results);
      } else {
        showBooks(filteredBooks);
      }
    });
  });
});

navigationHome.addEventListener("click", () => {
  allBooks.style.display = "none";
  homePage.style.display = "flex";
});

back.addEventListener("click", () => {
  singleBook.style.display = "none";
  allBooks.style.display = "flex";
});

searchButton.addEventListener("click", search);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    search();
  }
});
