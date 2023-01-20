const gallery = document.querySelector(".gallery-images");

const observer = new IntersectionObserver((entries) => {
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

observer.observe(gallery);

const menu = document.querySelector(".menu");
const bars = document.querySelectorAll(".menu-bars-item");

const observer2 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        bars.forEach((bar) => {
          bar.classList.add("black-bars");
        });
        menu.classList.add("black-text");
        return;
      }
    });
  },
  { rootMargin: "-40%" }
);

observer2.observe(document.querySelector(".clients"));

const images = document.querySelectorAll(".image");
const zoomedImage = document.querySelector(".zoomed-image");
const zoomedDiv = document.querySelector(".zoomed");
const arrows = document.querySelectorAll(".arrow");

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

const observer3 = new IntersectionObserver(
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

observer3.observe(document.querySelector(".hero-container"));
observer3.observe(document.querySelector(".expertise"));

const imageArrows = document.querySelectorAll(".image-arrow");
const cardsContainer = document.querySelector(".clients-words-cards");
const cards = document.querySelectorAll(".clients-words-cards-image > img");
const paragraph = document.querySelectorAll(".outter");

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
    currentImage = cards[currentImageIndex];
    const slideWidth = currentImage.clientWidth;
    cardsContainer.scrollLeft += slideWidth - 35;
  } else {
    return;
  }
});

const scrollValue = () => {
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
  progress.style.background = `conic-gradient(#03cc65 ${scrollValue}%, #000 ${scrollValue}%)`;
};

window.onscroll = scrollValue;
window.onload = scrollValue;
