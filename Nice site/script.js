const expertise = document.querySelector(".expertise");
const expertiseHeading = document.querySelector(".expertise-heading");
const expertiseImages = document.querySelectorAll(
  ".expertise-container-item-image img"
);
const expertiseText = document.querySelectorAll(".expertise-container-right");
const testimonials = document.querySelector(".testimonials");
const testimonialsCircles = document.querySelectorAll(".circle");
const testimonialsImages = document.querySelectorAll(".testimonials-image img");
const testimonialsCards = document.querySelectorAll(".testimonials-item");
const design = document.querySelector(".design");
const designBall = document.querySelector(".design-top-images .image1");
const designCurl = document.querySelector(".design-top-images .image2");
const designCube = document.querySelector(".design .cube");
const designRing = document.querySelector(".design .ring");
const desingHalfRing = document.querySelector(".design .half-ring");
const designCard = document.querySelector(".design-card");
const whatWeDo = document.querySelector(".what-we-do");
const whatWeDoHalfRing = document.querySelector(
  ".what-we-do-content .half-ring"
);
const whatWeDoBall = document.querySelector(".what-we-do-content .ball");
const whatWeDoCard = document.querySelector(".what-we-do-content-card");
const whatWeDoBox = document.querySelector(".what-we-do-content .box");
const whatWeDoCurl = document.querySelector(".what-we-do-content .curl");
const team = document.querySelector(".team");
const teamFirstCard = document.querySelector(".team .first");
const teamSecondCard = document.querySelector(".team .second");
const container = document.querySelector(".container");
const menuBars = document.querySelector(".navbar-menu");
const menuClose = document.querySelector(".close");
const menu = document.querySelector(".menu");

const expertiseObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      expertiseHeading.classList.add("heading-animation");
      expertiseImages.forEach((image) => {
        image.classList.add("image-animation");
      });
      expertiseText.forEach((text) => {
        text.classList.add("text-animation");
      });
      return;
    } else {
      expertiseHeading.classList.remove("heading-animation");
      expertiseImages.forEach((image) => {
        image.classList.remove("image-animation");
      });
      expertiseText.forEach((text) => {
        text.classList.remove("text-animation");
      });
    }
  });
});

const testimonialsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      testimonialsCircles.forEach((circle) => {
        circle.classList.add("circle-animation");
      });
      testimonialsImages.forEach((image, index) => {
        image.classList.add(`image-animation${index + 1}`);
      });
      testimonialsCards.forEach((card, index) => {
        if (index % 2 === 0) {
          card.classList.add("card-animation1");
        } else {
          card.classList.add("card-animation2");
        }
      });
    } else {
      testimonialsCircles.forEach((circle) => {
        circle.classList.remove("circle-animation");
      });
      testimonialsImages.forEach((image, index) => {
        image.classList.remove(`image-animation${index + 1}`);
      });
      testimonialsCards.forEach((card, index) => {
        if (index % 2 === 0) {
          card.classList.remove("card-animation1");
        } else {
          card.classList.remove("card-animation2");
        }
      });
    }
  });
});

const designObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      designBall.classList.add("ball-animation");
      designCube.classList.add("cube-animation");
      designCurl.classList.add("curl-animation");
      designRing.classList.add("ring-animation");
      desingHalfRing.classList.add("half-ring-animation");
      designCard.classList.add("card-animation");
    } else {
      designBall.classList.remove("ball-animation");
      designCube.classList.remove("cube-animation");
      designCurl.classList.remove("curl-animation");
      designRing.classList.remove("ring-animation");
      desingHalfRing.classList.remove("half-ring-animation");
      designCard.classList.remove("card-animation");
    }
  });
});

const whatWeDoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      whatWeDoBall.classList.add("what-we-do-ball-animation");
      whatWeDoBox.classList.add("what-we-do-box-animation");
      whatWeDoCard.classList.add("what-we-do-card-animation");
      whatWeDoCurl.classList.add("what-we-do-curl-animation");
      whatWeDoHalfRing.classList.add("what-we-do-half-ring-animation");
    } else {
      whatWeDoBall.classList.remove("what-we-do-ball-animation");
      whatWeDoBox.classList.remove("what-we-do-box-animation");
      whatWeDoCard.classList.remove("what-we-do-card-animation");
      whatWeDoCurl.classList.remove("what-we-do-curl-animation");
      whatWeDoHalfRing.classList.remove("what-we-do-half-ring-animation");
    }
  });
});

const teamObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      teamFirstCard.classList.add("team-card-rotate-animation");
      teamSecondCard.classList.add("team-card-fly-in-animation");
    } else {
      teamFirstCard.classList.remove("team-card-rotate-animation");
      teamSecondCard.classList.remove("team-card-fly-in-animation");
    }
  });
});

expertiseObserver.observe(expertise);
testimonialsObserver.observe(testimonials);
designObserver.observe(design);
teamObserver.observe(team);
whatWeDoObserver.observe(whatWeDo);

menuBars.addEventListener("click", () => {
  menu.style.visibility = "unset";
});

menuClose.addEventListener("click", () => {
  menu.style.visibility = "hidden";
});
