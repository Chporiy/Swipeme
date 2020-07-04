$(document).ready(function () {
  
  const FAQ = $('.page7-FAQ'),
    HEADER_PAGES = $('.header-pages'),
    SLIDER = $('.page-slider'),
    SLIDER_BLOCK = $('.page-slider__block');

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
    changeBodyBackgroungImage(newPageNumber);
    scrollToTop();
  }
  
  const changePageIndicator = (newPageIndicatorNumber) => {
    let currentPageIndicator = $(`.header-pages__page_active`);
    let newPageIndicator = $(`.header-pages__page[data-number='${newPageIndicatorNumber}']`);
  
    currentPageIndicator.toggleClass('header-pages__page_active');
    newPageIndicator.toggleClass('header-pages__page_active');
  }

  const changeBodyBackgroungImage = (pageNumber) => {
    if (pageNumber == 1) {
      $('body').css('background-image', 'url(./img/main/bg.png)')
    } else {
      $('body').css('background-image', 'url(./img/main/bg2.png)')
    }
  }

  const scrollToTop = () => {
    if ($('body, html').scrollTop() <= 15) {
      $('body, html').scrollTop(0);
    } else {
      $('body, html').animate({
        scrollTop: 0
      }, 100);
    }
  }

  // Slider
  SLIDER.slick({
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          variableWidth: true,
          focusOnSelect: true
        }
      }
    ]
  });

  SLIDER.on('click', event => {
    event.stopPropagation();
  })

  // Header Navigation
  HEADER_PAGES.on('click', event => {
    let target = event.target;
    if (~target.className.indexOf('header-pages__page_active')) return false;

    if (target.className == 'header-pages__page') {
      let newPageNumber = $(target).data('number');
      changePage(newPageNumber);
      changePageIndicator(newPageNumber);
    }
  })

  // FAQ
  FAQ.on('click', event => {
    let target = event.target;
    if ('page7-FAQ__question' == target.className || ~target.className.indexOf('page7-FAQ__block')) {
      let targetParent = ~target.className.indexOf('page7-FAQ__block') ? target : target.parentElement;
      ~targetParent.className.indexOf('page7-FAQ__block_active') ? hideAnswer(targetParent) : showAnswer(targetParent);
    }
    return false;
  });

  // Links
  $('a').on('click', event => {
    event.stopImmediatePropagation();
    event.preventDefault();
  })

  setCurrentPageClickHandler();
});

