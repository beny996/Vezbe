const navigationHome = document.querySelector(".home");
const navigationBooks = document.querySelector(".books");
const bestRatingCard = document.querySelectorAll(".best-rating-container-item");
const mostReviewsCard = document.querySelectorAll(
  ".most-reviews-container-item"
);
const bestRatingImage = document.querySelectorAll(
  ".best-rating-container-item img"
);
const mostReviewsImage = document.querySelectorAll(
  ".most-reviews-container-item img"
);
const bestRatingName = document.querySelectorAll(
  ".best-rating-container-item-name"
);
const rating = document.querySelectorAll(".best-rating-container-item-rating");

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

getBooksData();

window.addEventListener("load", async () => {
  let books;
  try {
    books = await getBooksData();
  } catch (err) {
    throw new Error(err);
  }

  let allGenres = [];
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
  let booksWithGenre = [];

  books.record.results.forEach((book) => {
    if (book.genre.includes(randomGenre)) {
      booksWithGenre = [...booksWithGenre, book];
    }
  });

  const highestRatedBooks = booksWithGenre.sort((book1, book2) => {
    book1.rating < book2.rating ? 1 : book1.rating > book2.rating ? -1 : 0;
  });

  let bestRatingOrder = booksWithGenre.sort((r1, r2) =>
    r1.rating > r2.rating ? -1 : r1.rating < r2.rating ? 1 : 0
  );

  console.log(booksWithGenre);

  console.log(bestRatingOrder);

  const mostReviewsBooks = booksWithGenre.sort((book1, book2) => {
    return book2.reviews - book1.reviews;
  });

  console.log(highestRatedBooks);

  for (let i = 0; i < 4; i++) {
    if (highestRatedBooks[i]) {
      bestRatingImage[i].setAttribute("src", highestRatedBooks[i].img);
      bestRatingName[i].innerHTML = highestRatedBooks[i].title;
      rating[i].innerHTML = highestRatedBooks[i].rating;
      bestRatingCard[i].style.display = "unset";
    }
    if (mostReviewsBooks[i]) {
      mostReviewsImage[i].setAttribute("src", mostReviewsBooks[i].img);
      mostReviewsImage[i].innerHTML = mostReviewsBooks[i].title;
      rating[i].innerHTML = mostReviewsBooks[i].rating;
      mostReviewsCard[i].style.display = "unset";
    }
  }
});
