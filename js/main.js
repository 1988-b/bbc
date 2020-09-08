"use strict";

const defaultSet = {
  headerMid: document.querySelector(".header__mid"),
  text: document.querySelectorAll(".text"),
  imgs: document.querySelectorAll(".item"),
  contains: document.querySelector(".img__position"),
};

let currentItem;
let ioIndex;

const io = new IntersectionObserver((entries, observer) => {
  ioIndex = entries[0].target.dataset.index * 1;
});

function gnbMotion() {
  defaultSet.headerMid.classList.toggle("on");
}

addEventListener("click", () => {
  gnbMotion();
});

for (let i = 0; i < defaultSet.text.length; i++) {
  io.observe(defaultSet.text[i]);
  defaultSet.text[i].dataset.index = i;
  defaultSet.imgs[i].dataset.index = i;
}

addEventListener("scroll", () => {
  let text;
  let boundingRect;
  for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
    text = defaultSet.text[i];
    if (!text) continue;
    boundingRect = text.getBoundingClientRect();
    if (
      boundingRect.top > innerHeight * 0.1 &&
      boundingRect.top < innerHeight * 0.8
    ) {
      if (currentItem) {
        currentItem.classList.remove("on");
      }
      currentItem = defaultSet.imgs[text.dataset.index];
      currentItem.classList.add("on");
    }
  }
});

addEventListener("load", () => {
  defaultSet.contains.style.height = `${innerHeight}px`;
  addEventListener("resize", () => {
    defaultSet.contains.style.height = `${innerHeight}px`;
  });
});
