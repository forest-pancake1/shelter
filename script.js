const burger = document.querySelector('.burger');
const nav = document.querySelector('.navigation');
const logo = document.querySelector('.logo_description');
const navLink = document.querySelectorAll('.nav_link');

burger.addEventListener('click', () => {
nav.classList.toggle('navigation_active');
logo.classList.toggle('logo_description_active');
burger.classList.toggle('burger_active');
});

navLink.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('navigation_active');
    logo.classList.remove('logo_description_active');
    burger.classList.remove('burger_active');
  })
})


const carousel = document.querySelector('.carusel');
const option = document.querySelectorAll('.option');
const next = document.querySelector('.next');
const back = document.querySelector('.back');
const firstOpt = document.querySelector('.option');

if(!carousel || !option || !next || !back || !firstOpt){
  console.error('один из элементов не найден')
} else {
  console.log('все элементы найдены')
}

let currentIndex = 0;
let cardWidth;
let gap;

const updateGap = () => {
  cardWidth = 270;
  const gapValue = window.getComputedStyle(carousel).gap;
  gap = parseFloat(gapValue);
}

console.log(`cardWidth= ${cardWidth} px, gap: ${gap}px`);

const updateCurousel = () => {
  updateGap();
  const offset = -currentIndex * (cardWidth + gap);
  carousel.style.transform = `translateX(${offset}px)`;
};

 const checkArrows = () => {
 if(currentIndex === 0){
  back.disabled = true;
  back.style.opacity = '0.5';
 } else {
  back.disabled = false;
  back.style.opacity = '1';
 }

 if(currentIndex >= option.length - 3) {
  next.disabled = true;
  next.style.opacity = '0.5'
 } else {
  next.disabled = false;
  next.style.opacity = '1';
 }
 };

 window.addEventListener('resize', () => {
  updateGap();
  updateCurousel();
  checkArrows();
})


back.addEventListener('click', () =>{
  if(currentIndex > 0) {
    currentIndex--;
    updateCurousel();
  }
  checkArrows();
});

next.addEventListener('click', () => {
 if(currentIndex < option.length - 3){
  currentIndex++;
  updateCurousel();
 }
 checkArrows();
});

