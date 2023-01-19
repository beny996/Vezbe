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

const observer3 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        bars.forEach((bar) => {
          bar.classList.remove("black-bars");
        });
        menu.classList.remove("black-text");
      }
    });
  },
  { rootMargin: "20px" }
);

observer3.observe(document.querySelector(".hero"));

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
