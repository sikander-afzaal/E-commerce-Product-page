const track = document.querySelector(".big-image");
const slides = document.querySelectorAll(".shown");
const btn = document.querySelectorAll(".slider-img-div");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const amount = document.querySelector(".amount");
const cartBtn = document.querySelector(".cart");
const cartModal = document.querySelector(".cart-expand");
const divItem = document.querySelector(".items");
const addToCart = document.querySelector(".right-btn");
const span = document.querySelector(".span");
const nextMobile = document.querySelector(".next-mobile");
const prevMobile = document.querySelector(".prev-mobile");
const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const menu = document.querySelector(".ul-mobile");
//laying out all the slides
const width = slides[0].getBoundingClientRect().width;
console.log(width);
slides.forEach((slide, index) => {
  slide.style.left = index * width + "px";
});

//function for moving slides
const moving = (activeSlide, targetSlide, track) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  activeSlide.classList.remove("active-slide");
  targetSlide.classList.add("active-slide");
};
//next button for mobile
nextMobile.addEventListener("click", () => {
  const activeSlide = document.querySelector(".active-slide");
  const targetSlide = activeSlide.nextElementSibling;
  moving(activeSlide, targetSlide, track);
});

//previous button for mobile
prevMobile.addEventListener("click", () => {
  const activeSlide = document.querySelector(".active-slide");
  const targetSlide = activeSlide.previousElementSibling;
  moving(activeSlide, targetSlide, track);
});

//buttons to slect desired image
btn.forEach((button) => {
  button.addEventListener("click", (e) => {
    const activeSlide = document.querySelector(".active-slide");
    const activeBtn = document.querySelector(".selected");
    const targetBtn = e.target.parentElement;
    //finding index of the dot clicked
    const indexOfTargetBtn = Array.from(btn).findIndex(
      (btns) => btns === targetBtn
    );

    const targetSlide = slides[indexOfTargetBtn];
    moving(activeSlide, targetSlide, track);
    activeBtn.classList.remove("selected");
    targetBtn.classList.add("selected");
  });
});

//counter function

const counter = (number) => {
  let value = parseInt(amount.innerText);
  if (number == -1) {
    if (value <= 0) {
      return;
    } else {
      value += number;
    }
  } else {
    value += number;
  }
  amount.innerText = value;
};

plus.addEventListener("click", () => {
  counter(1);
});
minus.addEventListener("click", () => {
  counter(-1);
});

//opening cart modal -------------------------------
cartBtn.addEventListener("click", () => {
  cartModal.classList.toggle("open");
});

//adding items to cart
addToCart.addEventListener("click", () => {
  let value = parseInt(amount.innerText);
  divItem.innerHTML = `
    <img
          class="small"
          src="./images/image-product-1-thumbnail.jpg"
          alt=""
        />
        <div class="desc-cart">
          <p>Fall Limited Edition Sneakers</p>
          <p>$125.00 x ${value} <strong>$${value * 125}.00</strong></p>
        </div>
        <img src="./images/icon-delete.svg" alt="" class="trash" />
  `;
  //deleting items from cart ---------------------------
  const trash = document.querySelector(".trash");
  trash.addEventListener("click", () => {
    divItem.innerHTML = `<p class="empty">Your cart is empty</p>`;
    span.innerText = 0;
  });
  //updating small value above cart image--------------------------
  span.innerText = value;
});
//light box starts here--------------------------------------
const trackLight = document.querySelector(".big-image-light");
const slidesLight = document.querySelectorAll(".shown-light");
const btnLight = document.querySelectorAll(".slider-img-div-light");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
//function for limiting the slides
const limit = (nextSlide) => {
  const indexOfSlide = Array.from(slidesLight).findIndex(
    (slide) => slide === nextSlide
  );
  if (indexOfSlide === 0) {
    prev.classList.add("hidden");
    next.classList.remove("hidden");
  } else if (indexOfSlide === slides.length - 1) {
    prev.classList.remove("hidden");
    next.classList.add("hidden");
  } else {
    prev.classList.remove("hidden");
    next.classList.remove("hidden");
  }
};
// moving for light box
const movingLight = (activeSlide, targetSlide, track) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  activeSlide.classList.remove("active-slide-light");
  targetSlide.classList.add("active-slide-light");
};
//buttons to slect desired image in light box

btnLight.forEach((button) => {
  button.addEventListener("click", (e) => {
    const activeSlide = document.querySelector(".active-slide-light");
    const activeBtn = document.querySelector(".selected-light");
    const targetBtn = e.target.parentElement;
    //finding index of the dot clicked
    const indexOfTargetBtn = Array.from(btnLight).findIndex(
      (btns) => btns === targetBtn
    );

    const targetSlide = slides[indexOfTargetBtn];
    movingLight(activeSlide, targetSlide, trackLight);
    activeBtn.classList.remove("selected-light");
    targetBtn.classList.add("selected-light");
    limit(targetSlide);
  });
});
//next btn ------------------------------------------------
next.addEventListener("click", () => {
  const activeSlide = document.querySelector(".active-slide-light");
  const targetSlide = activeSlide.nextElementSibling;
  const activeBtn = document.querySelector(".selected-light");
  const targetBtn = activeBtn.nextElementSibling;
  movingLight(activeSlide, targetSlide, trackLight);
  activeBtn.classList.remove("selected-light");
  targetBtn.classList.add("selected-light");
  limit(targetSlide);
});
//prev btn ------------------------------------------------
prev.addEventListener("click", () => {
  const activeSlide = document.querySelector(".active-slide-light");
  const targetSlide = activeSlide.previousElementSibling;
  const activeBtn = document.querySelector(".selected-light");
  const targetBtn = activeBtn.previousElementSibling;
  movingLight(activeSlide, targetSlide, trackLight);
  activeBtn.classList.remove("selected-light");
  targetBtn.classList.add("selected-light");
  limit(targetSlide);
});
// when you click thumbnail so it opens and slides get layed out---------------------
track.addEventListener("click", () => {
  document.querySelector(".light-box-div").style.display = "block";
  document.querySelector(".overlay").style.display = "block";
  const widthLight = slidesLight[0].getBoundingClientRect().width;
  slidesLight.forEach((slide, index) => {
    slide.style.left = index * widthLight + "px";
  });
});
//closing the light box -----------------------------------
document.querySelector(".cross").addEventListener("click", () => {
  document.querySelector(".light-box-div").style.display = "none";
  document.querySelector(".overlay").style.display = "none";
});

limit(slidesLight[0]);
// opening menu ----------------------------------
openMenu.addEventListener("click", () => {
  menu.classList.add("translate");
  document.querySelector("body").style.overflow = "hidden";
  document.querySelector(".overlay").style.display = "block";
});
closeMenu.addEventListener("click", () => {
  menu.classList.remove("translate");
  document.querySelector("body").style.overflow = "visible";
  document.querySelector(".overlay").style.display = "none";
});
