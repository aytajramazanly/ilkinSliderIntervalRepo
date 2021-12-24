let login = document.querySelector("#login");
let loginBtn = document.querySelector("#login button");
let inputName = document.querySelector("input");
let imgDiv = document.querySelector(".images");
let gallery = document.querySelector("#gallery");
let popup = document.querySelector(".popup");
let closeIcon = document.querySelector(".close-icon");
let bigImg = document.querySelector(".popup .inner img");
let prevBtn = document.querySelector(".arrows .prev");
let nextBtn = document.querySelector(".arrows .next");
let uploadIcon = document.querySelector(".upload-icon");
let uploadBtn = document.querySelector(".upload-btn");

uploadIcon.addEventListener("click", () => {
  uploadBtn.click();
});

uploadBtn.addEventListener("change", function (e) {
  const { files } = e.target;

  for (const file of files) {
    let fileReader = new FileReader();
    fileReader.onloadend = function (e) {
      const { result } = e.target;

      let a = document.createElement("a");
      let ilkin = document.createElement("img");
      a.href = fileReader.result;
      ilkin.src = fileReader.result;
      a.append(ilkin);
      imgDiv.append(a);
    };
    fileReader.readAsDataURL(file);
    let images = document.querySelectorAll(".images a");

    images.forEach((image) => {
      image.addEventListener("click", function (e) {
        e.preventDefault();
        doOpen();
        changableImage(this);
        this.classList.add("showSlide");

        setInterval(() => {
          let showSlide = document.querySelector(".showSlide");
          nextElemSib(showSlide);
        }, 4000);
      });
    });
  }
});

let c = 45;

function draw() {
  document.documentElement.style.setProperty("--direction", c++ + "deg");
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

loginBtn.addEventListener("click", () => {
  if (inputName.value.split("").some((item) => item !== " ")) {
    login.style.transform = "translateY(100%)";
    WelcomeOpen();
  } else {
    let span = document.createElement("span");
    span.innerText = "Adınızı daxil edin!";
    document.querySelector(".login").appendChild(span);
  }
});

function WelcomeOpen() {
  gallery.style.display = "block";
  let userName = document.createElement("h2");
  userName.innerText = inputName.value;
  document.querySelector(".welcome-title").appendChild(userName);
}

nextBtn.addEventListener("click", function () {
  let showSlide = document.querySelector(".showSlide");
  nextElemSib(showSlide);
});

prevBtn.addEventListener("click", function () {
  let showSlide = document.querySelector(".showSlide");
  prevElemSib(showSlide);
});

function doOpen() {
  popup.style.display = "flex";
}

function doClose() {
  popup.style.display = "none";
}

closeIcon.addEventListener("click", function () {
  doClose();
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && popup.style.display === "flex") {
    doClose();
  }
});

popup.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup")) {
    doClose();
  }
});

function changableImage(item) {
  let imgSrc = item.getAttribute("href");
  bigImg.setAttribute("src", imgSrc);
}

function nextElemSib(item) {
  if (item.nextElementSibling !== null) {
    item.nextElementSibling.classList.add("showSlide");
    changableImage(item.nextElementSibling);
  } else {
    item.parentElement.children[0].classList.add("showSlide");
    changableImage(item.parentElement.children[0]);
  }

  item.classList.remove("showSlide");
}

function prevElemSib(item) {
  let length = item.parentElement.children.length;

  console.log(length);
  if (item.previousElementSibling !== null) {
    item.previousElementSibling.classList.add("showSlide");
    changableImage(item.previousElementSibling);
  } else {
    item.parentElement.children[length - 1].classList.add("showSlide");
    changableImage(item.parentElement.children[length - 1]);
  }
  item.classList.remove("showSlide");
}
