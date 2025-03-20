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

const learnMore = document.querySelectorAll('.learn_more');
const info = document.querySelector('.info_wrapper');
const cards = document.querySelectorAll('.card_opt');
const option = document.querySelectorAll('.option');
console.log('карточки найдены:', cards);

option.forEach(button => {
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


// пагинация

const petCards = Array.from(document.querySelectorAll('li.option'));
console.log('карточки:', petCards);

const allGroups = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] =  [array[j], array[i]];
  }
  return array;
}

function isSameOrder(newgroup, allGroups) {

  for(const group of allGroups) {
    let isSame = true;

 for(let i = 0; i < newgroup.length; i++){
  if (newgroup[i].id !== group[i].id){
    isSame = false;

    break;
  }
 }
 if (isSame) {
  return false;
 }
}
return true;
}

const firstGroup = shuffleArray([...petCards]);
allGroups.push(firstGroup);
console.log('первая группа:', firstGroup);

for (let i =0; i < 5; i++) {
  let newgroup;
  let attempts = 0;

  do{
    newgroup = shuffleArray([...petCards]);
    console.log(`попытка ${attempts + 1}:`, newgroup);

    if(isSameOrder(newgroup, allGroups)) {
      allGroups.push(newgroup);
      console.log(`добавлена новая группа:`, newgroup)
      break;
    }
    attempts++;
    if(attempts > 100){
      console.error('превышено максимальное кол-во попыток!');
      break;
    }

  } while (true);
};


function getCardsPerPage() {
  const screenWidth = window.innerWidth;

  if( screenWidth >= 1261) {
    return 8;
  } else if (screenWidth >= 768) {
    return 6;
  } else {
    return 3;
  }
}

const cardsPerPage = getCardsPerPage();
console.log(`карточек на странице: ${cardsPerPage}`);

function splitPages (array, pageSize) {
  const pages = [];
  for(let i = 0; i < array.length; i += pageSize) {
    const page = array.slice(i, i + pageSize);
    pages.push(page);
  }
  return pages;
}
const petsArray = allGroups.flat();
let pages = splitPages(petsArray, cardsPerPage);
console.log('все страницы:', pages);

const petsWrapper = document.querySelector('.carusel');

function updateDOMOrder(pageNum) {
  petsWrapper.innerHTML = '';
  console.log(pageNum, 'pageNum')

pages[pageNum].forEach(card => {
    petsWrapper.appendChild(card);
  });
}






const firstPageBtn = document.getElementById('first-page');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const lastPageBtn = document.getElementById('last-page');
const card = document.querySelectorAll('.option');

const pageN = document.querySelector('.page');

let currentPage = 0;
const totalPages = pages.length;

function renderPage(pageIndex) {
  if(!pages[pageIndex]) {
    console.error(`стрвница ${pageIndex} не существует!`);
    return;
  }
  console.log(`рендеринг страницы ${pageIndex}:`, pages[pageIndex]);

  updateDOMOrder(pageIndex)
  petCards.forEach(card => {
    card.style.display = 'none';
  });
  pages[pageIndex].forEach(card => {
    console.log('показываем карточку:', card);
  })
  pages[pageIndex].forEach(card => {
    card.style.display = 'flex';
  })
}
renderPage(currentPage);


function updatePageNumber() {
  pageN.textContent = currentPage + 1;
}

function updateButtons() {
  if(currentPage === 0) {
    firstPageBtn.disabled = true;
    prevPageBtn.disabled = true;
  } else {
    firstPageBtn.disabled = false;
    prevPageBtn.disabled = false;
  }

  if(currentPage === totalPages - 1) {
    nextPageBtn.disabled = true;
    lastPageBtn.disabled = true;
  } else {
    nextPageBtn.disabled = false;
    lastPageBtn.disabled = false;
  }
  
}

firstPageBtn.addEventListener('click', () => {
  if(currentPage !== 0) {
    currentPage = 0;
    console.log(`перехлд на страницу ${currentPage}`);
    renderPage(currentPage);
    updatePageNumber();
    updateButtons();
  }
});

prevPageBtn.addEventListener('click', () => {
  if(currentPage > 0) {
    currentPage --;
    console.log(`перехлд на страницу ${currentPage}`);
    renderPage(currentPage);
    updatePageNumber();
    updateButtons();
  }
});

nextPageBtn.addEventListener('click', () => {
  if(currentPage < totalPages - 1) {
    currentPage ++;
    console.log(`перехлд на страницу ${currentPage}`);
    renderPage(currentPage);
    updatePageNumber();
    updateButtons();
  }
});

lastPageBtn.addEventListener('click', () => {
  if(currentPage !== totalPages - 1) {
    currentPage = totalPages - 1;
    console.log(`перехлд на страницу ${currentPage}`);
    renderPage(currentPage);
    updatePageNumber();
    updateButtons();
  }
});

function handleResize() {
  const newCardsPerPage = getCardsPerPage();
  if(newCardsPerPage !== cardsPerPage) {
    cardsPerPage = newCardsPerPage;
    pages = splitPages(petsArray, cardsPerPage);
    renderPage(currentPage);
    updatePageNumber();
    updateButtons();
  }
}

window.addEventListener('resize', handleResize);

renderPage(currentPage);
updatePageNumber();
updateButtons();
console.log(petCards);
console.log(petsArray);
console.log(pages);