$(document).ready(function () {
  
  const FAQ = $('.page7-FAQ');
  let currentPage = $('.page-active');
  let documentWidth = $(document).width(),
    oneThirdWidth = documentWidth / 3;
  
  
  const showAnswer = (element) => {
    element.classList.add('page7-FAQ__block_active');
    element.querySelector('.page7-FAQ__toggle').textContent = "-";
  }
  
  const hideAnswer = (element) => {
    element.classList.remove('page7-FAQ__block_active');
    element.querySelector('.page7-FAQ__toggle').textContent = "+";
  }

  const checkLeftSideClick = (clientX) => {
    return 0 <= clientX && clientX <= oneThirdWidth;
  }

  const checkRightSideClick = (clientX) => {
    return documentWidth - oneThirdWidth <= clientX && clientX <= documentWidth;
  }

  const setCurrentPageClickHandler = () => {
    currentPage.on('click', event => {
      clickPageHandler(event);
    });
  }

  const clickPageHandler = (event) => {
    let clientX = event.clientX,
      currentPageNumber = currentPage.data('number'),
      newPageNumber;
      
    if (checkLeftSideClick(clientX)) {
      if (currentPageNumber == 1) return false;

      newPageNumber = currentPageNumber - 1;
      changePage(newPageNumber);
      changePageIndicator(newPageNumber);
    }
    
    if (checkRightSideClick(clientX)) {
      if (currentPageNumber == 8) return false;

      newPageNumber = currentPageNumber + 1;
      changePage(newPageNumber);
      changePageIndicator(newPageNumber);
    }
  }

  const changePage = (newPageNumber) => {
    currentPage.toggleClass('page-active');
    currentPage.off('click');
    currentPage = $(`.page[data-number='${newPageNumber}']`);
    currentPage.toggleClass('page-active');

    setCurrentPageClickHandler();
  }
  
  const changePageIndicator = (newPageIndicatorNumber) => {
    let currentPageIndicator = $(`.header-pages__page_active`);
    let newPageIndicator = $(`.header-pages__page[data-number='${newPageIndicatorNumber}']`);
  
    currentPageIndicator.toggleClass('header-pages__page_active');
    newPageIndicator.toggleClass('header-pages__page_active');
  }

  // FAQ
  FAQ.on('click', (event) => {
    let target = event.target;
    if (target.className == 'page7-FAQ__question') {
      let targetParent = target.parentElement;
      Object.values(targetParent.classList).includes('page7-FAQ__block_active') ? hideAnswer(targetParent) : showAnswer(targetParent);
    }
  });

  setCurrentPageClickHandler();
});

