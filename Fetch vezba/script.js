const inputField = document.querySelector("input");
const loadMealsButton = document.querySelector("button");
const showcase = document.querySelector(".showcase");
const mealDetails = document.querySelector(".meal-details");
const mealCategory = document.querySelector(".category");
const recipe = document.querySelector(".recipe");
const youtubeLink = document.querySelector("a");
const closeButton = document.querySelector(".meal-details-close");

const dataFetch = async (value) => {
  return (
    await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`)
  ).json();
};

const mealRecipe = async (value) => {
  return (
    await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${value}`)
  ).json();
};

const submitInput = async () => {
  showcase.innerHTML = "";
  if (inputField.value.trim()) {
    try {
      const data = await dataFetch(inputField.value);
      if (data.meals) {
        data.meals.forEach((meal) => {
          const mealParagraph = document.createElement("p");
          const text = document.createTextNode(`${meal.strMeal}`);
          const image = document.createElement("img");
          const readMore = document.createElement("button");
          image.setAttribute("src", meal.strMealThumb);
          readMore.innerHTML = "Read more";
          readMore.addEventListener("click", async () => {
            try {
              const data = await mealRecipe(meal.idMeal);
              mealCategory.innerHTML = data.meals[0].strCategory;
              recipe.innerHTML = data.meals[0].strInstructions;
              youtubeLink.setAttribute("href", data.meals[0].strYoutube);
              mealDetails.style.display = "flex";
              document.body.style.overflow = "hidden";
            } catch (err) {
              console.log(err);
            }
          });
          mealParagraph.append(image, text, readMore);
          mealParagraph.classList.add("meal-card");
          showcase.append(mealParagraph);
        });
      } else {
        const noMeal = document.createElement("p");
        noMeal.innerHTML = "There is no such meal!";
        showcase.append(noMeal);
      }
    } catch (error) {
      console.log(error);
    }

    inputField.value = "";
  } else {
    const noMeal = document.createElement("p");
    noMeal.innerHTML = "There is no such meal!";
    showcase.append(noMeal);
  }
};

loadMealsButton.addEventListener("click", submitInput);
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    submitInput();
  }
});

closeButton.addEventListener("click", () => {
  document.body.style.overflow = "";
  mealDetails.style.display = "";
});
