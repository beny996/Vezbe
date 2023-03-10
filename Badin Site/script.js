const gallery = document.querySelector(".gallery-images");
const imageArrows = document.querySelectorAll(".image-arrow");
const cardsContainer = document.querySelector(".clients-words-cards");
const cards = document.querySelectorAll(".clients-words-cards-image > img");
const paragraph = document.querySelectorAll(".outter");
const menu = document.querySelector(".menu");
const bars = document.querySelectorAll(".menu-bars-item");
const images = document.querySelectorAll(".image");
const zoomedImage = document.querySelector(".zoomed-image");
const zoomedDiv = document.querySelector(".zoomed");
const arrows = document.querySelectorAll(".arrow");
const container = document.querySelector(".container-inner");
const closeMenu = document.querySelector(".container-inner-close");
const navigation = document.querySelector(".container-inner-buttons");
let currentPage = document.querySelector(".first-item");
const menuItems = document.querySelectorAll(".container-inner-buttons-item");
const trustedBy = document.querySelectorAll(".trusted-by-desktop img");
const trustedContainer = document.querySelector(".trusted-by-desktop");
const trustedByHeading = document.querySelector(".trusted-by-heading");

//Observers
const galleryObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const left = entry.target.querySelector(".gallery-container-left");
    const right = entry.target.querySelector(".gallery-container-right");
    if (entry.isIntersecting) {
      left.classList.add("move");
      right.classList.add("move");
      return;
    }
    left.classList.remove("move");
    right.classList.remove("move");
  });
});

const menuObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        menu.classList.add("black-text");
        bars.forEach((bar) => {
          bar.classList.add("black-bars");
        });
      } else {
        menu.classList.remove("black-text");
        bars.forEach((bar) => {
          bar.classList.remove("black-bars");
        });
      }
    });
  },
  {
    root: null,
    rootMargin: "-50% 0px",
  }
);

galleryObserver.observe(gallery);
menuObserver.observe(document.querySelector(".expertise"));
menuObserver.observe(document.querySelector(".hero-container"));

//Gallery
let imageIndex;

if (window.innerWidth >= 768) {
  for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("click", () => {
      zoomedDiv.style.cssText = "visibility: visible";
      zoomedImage.setAttribute("src", images[i].getAttribute("src"));
      imageIndex = i;
      hideArrow();
    });
  }

  zoomedDiv.addEventListener("click", () => {
    zoomedDiv.style.cssText = "visibility: hidden";
  });

  const hideArrow = () => {
    if (imageIndex === 0) {
      arrows[0].style.cssText = "visibility: hidden";
      arrows[1].style.cssText = "visibility: inherit";
    } else if (imageIndex === 5) {
      arrows[1].style.cssText = "visibility: hidden";
      arrows[0].style.cssText = "visibility: inherit";
    } else {
      arrows[0].style.cssText = "visibility: inherit";
      arrows[1].style.cssText = "visibility: inherit";
    }
  };

  arrows[0].addEventListener("click", (e) => {
    zoomedImage.setAttribute("src", images[imageIndex - 1].getAttribute("src"));
    imageIndex -= 1;
    e.stopPropagation();
    hideArrow();
  });

  arrows[1].addEventListener("click", (e) => {
    zoomedImage.setAttribute("src", images[imageIndex + 1].getAttribute("src"));
    imageIndex += 1;
    e.stopPropagation();
    hideArrow();
  });
}

//Clients words
let currentImageIndex = 0;

cards[0].classList.add("first");
paragraph[0].style.opacity = 1;

imageArrows[0].addEventListener("click", () => {
  if (currentImageIndex !== 0) {
    currentImageIndex--;
    cards[currentImageIndex + 1].classList.remove("first");
    cards[currentImageIndex].classList.add("first");
    paragraph[currentImageIndex + 1].style.opacity = 0;
    paragraph[currentImageIndex].style.opacity = 1;
    const slideWidth = cards[currentImageIndex].clientWidth;
    cardsContainer.scrollLeft -= slideWidth - 35;
  } else {
    return;
  }
});

imageArrows[1].addEventListener("click", () => {
  if (currentImageIndex !== cards.length - 1) {
    currentImageIndex++;
    cards[currentImageIndex - 1].classList.remove("first");
    cards[currentImageIndex].classList.add("first");
    paragraph[currentImageIndex - 1].style.opacity = 0;
    paragraph[currentImageIndex].style.opacity = 1;
    const slideWidth = cards[currentImageIndex].clientWidth;
    cardsContainer.scrollLeft += slideWidth - 35;
  } else {
    return;
  }
});

cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    if (index > currentImageIndex) {
      cardsContainer.scrollLeft +=
        (cards[currentImageIndex].clientWidth - 35) *
        (index - currentImageIndex);
      cards[currentImageIndex].classList.remove("first");
      card.classList.add("first");
      paragraph[currentImageIndex].style.opacity = 0;
      paragraph[index].style.opacity = 1;
      currentImageIndex = index;
    } else if (index < currentImageIndex) {
      cardsContainer.scrollLeft -=
        (cards[currentImageIndex].clientWidth - 35) *
        (index - currentImageIndex);
      cards[currentImageIndex].classList.remove("first");
      card.classList.add("first");
      paragraph[currentImageIndex].style.opacity = 0;
      paragraph[index].style.opacity = 1;
      currentImageIndex = index;
    } else {
      return;
    }
  });
});

//Back to top
const scrollValueCalc = () => {
  let progress = document.querySelector(".back-to-top");
  let position = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((position * 100) / calcHeight);

  if (position > 100) {
    progress.style.display = "grid";
  } else {
    progress.style.display = "none";
  }
  progress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
  progress.style.background = `conic-gradient(#1f70e0 ${scrollValue}%, #000 ${scrollValue}%)`;
};

window.onscroll = scrollValueCalc;
window.onload = scrollValueCalc;

//Menu
menu.addEventListener("mouseover", () => {
  container.classList.add("shrink");
});

menu.addEventListener("mouseout", () => {
  container.classList.remove("shrink");
});

menu.addEventListener("click", () => {
  container.classList.add("shrink2");
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "unset";
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("blur");
  });
  setTimeout(() => {
    navigation.style.display = "unset";
  }, 500);
  menuItems.forEach((item, index) => {
    item.style.animation = `menuNavigation 0.${index + 1}s ease`;
    setTimeout(() => {
      item.style.animation = "";
    }, 1600);
  });
});

closeMenu.addEventListener("click", () => {
  container.classList.remove("shrink2");
  document.body.style.cssText = "overflow-x: hidden;";
  document.documentElement.style.cssText = "overflow-x: hidden;";
  document.querySelectorAll("section").forEach((section) => {
    section.classList.remove("blur");
  });
  navigation.style.display = "none";
});

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (!item.classList.contains("first-item")) {
      currentPage.classList.remove("first-item");
      item.classList.add("first-item");
      currentPage = item;
    }
  });
});

//Trusted by
const trustedByArray = Array.from(trustedBy);
setInterval(() => {
  trustedByArray.forEach((item) => {
    item.style.animation = "";
    item.style.display = "none";
  });

  const spliced = trustedByArray.splice(0, 5);

  trustedContainer.innerHTML = "";

  trustedContainer.appendChild(trustedByHeading);
  spliced.forEach((item, index) => {
    item.style.animation = `trustedBy ${index}.5s ease-in`;
    item.style.display = "inline-block";
    trustedContainer.appendChild(item);
  });
  trustedByArray.splice(9, 0, ...spliced);
}, 4000);
