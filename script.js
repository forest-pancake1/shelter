const burger = document.querySelector('.burger');
const nav = document.querySelector('.navigation');
const logo = document.querySelector('.logo_description');
const navLink = document.querySelectorAll('.nav_link');
const overlay = document.querySelector('.overlay');

burger.addEventListener('click', () => {
nav.classList.toggle('navigation_active');
logo.classList.toggle('logo_description_active');
burger.classList.toggle('burger_active');
overlay.classList.toggle('overlay_active');
document.body.classList.toggle('no_scroll');
});

overlay.addEventListener('click', function() {
  nav.classList.remove('navigation_active');
  logo.classList.remove('logo_description_active');
  burger.classList.remove('burger_active');
  overlay.classList.remove('overlay_active');
  document.body.classList.remove('no_scroll'); 
} )

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

const getVisibleCards = () => {
  if(window.innerWidth >= 1261) {
    return 3;
  } else if(window.innerWidth >= 768) {
    return 2;
  } else {
    return 1;
  }
}

 const checkArrows = () => {
  const visibleCards = getVisibleCards();

 if(currentIndex === 0){
  back.disabled = true;
  back.style.opacity = '0.5';
 } else {
  back.disabled = false;
  back.style.opacity = '1';
 }

 if(currentIndex >= option.length - visibleCards) {
  next.disabled = true;
  next.style.opacity = '0.5'
 } else {
  next.disabled = false;
  next.style.opacity = '1';
 }
 };
 window.addEventListener('DOMContentLoaded', () => {
  updateGap();
  updateCurousel();
  checkArrows();
});

 window.addEventListener('resize', () => {
  updateGap();
  updateCurousel();
  checkArrows();
});


back.addEventListener('click', () =>{
  if(currentIndex > 0) {
    currentIndex--;
    updateCurousel();
  }
  checkArrows();
});

next.addEventListener('click', () => {
  const visibleCards = getVisibleCards();
 if(currentIndex < option.length - visibleCards){
  currentIndex++;
  updateCurousel();
 }
 checkArrows();
});

const pets = document.querySelectorAll('.option');
const learnMore = document.querySelectorAll('.learn_more');
const info = document.querySelector('.info_wrapper');
const cards = document.querySelectorAll('.card_opt');

pets.forEach(button => {
  button.addEventListener('click', () => {
    info.classList.add('info_open');

  const buttonType = button.id;

  cards.forEach(card => {
    if(buttonType === card.id){
      card.classList.add('card_opt_open');
    } else {
      card.classList.remove('card_opt_open');
    }
  })
  })
})

const close = document.querySelector('.close_btn');

close.addEventListener('click', () => {
  info.classList.remove('info_open');
  cards.classList.remove('card_opt_open');
})
info.addEventListener('click', function() {
  info.classList.remove('info_open');
  cards.classList.remove('card_opt_open');
})
