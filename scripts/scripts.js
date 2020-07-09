$(document).ready(function () {
  let isMobile = {
      Android:        function() { return navigator.userAgent.match(/Android/i) ? true : false; },
      BlackBerry:     function() { return navigator.userAgent.match(/BlackBerry/i) ? true : false; },
      iOS:            function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false; },
      Windows:        function() { return navigator.userAgent.match(/IEMobile/i) ? true : false; },
      any:            function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());  }
  };

  let currentPageNumber = 0;
  
  const FAQ = $('.page7-FAQ'),
    HEADER_PAGES = $('.header-pages'),
    SLIDER = $('.page-slider'),
    MODAL_CALLBACK = $('.modalCallback'),
    MODAL_CALLBACK_SHOW_BUTTON = $('.footer-contact__button'),
    MODAL_CALLBACK_CLOSE_BUTTON = $('.modalCallback-close'), 
    FORM = $('.modalCallback-form'),
    FORM_INPUT = $('.modalCallback-form__input'),
    SLIDER_OPTIONS = {
      accessibility: false,
      arrows: false,
      adaptiveHeight: true,
      dots: false,
      focusOnSelect: true,
      infinite: false,
      initialSlide: currentPageNumber,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 300,
      swipeToSlide: true,
      touchThreshold: 500,
      variableWidth: true,
      waitForAnimate: false,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            touchThreshold: 5
          }
        }
      ]
    }

  const setPagesWidth = () => {
    if (isMobile.any()) {
      let documentWidth = $(document).width();
      $('.page').width(documentWidth);
    } else {
      $('.page').width(375);
    }
  }

  const setPagesHeight = () => {
    const documentHeight = $(document).height();
    $(".page").each(function(indx) {
      const pageHeight = $(this).height();
      const emptySpace = documentHeight - pageHeight;
      if (emptySpace > 0) {
        const newPageHeight = emptySpace <= 157 ? pageHeight + emptySpace + 157 : pageHeight + emptySpace; 
        $(this).height(newPageHeight);
      }
    });
  }
  
  const showAnswer = (element) => {
    element.classList.add('page7-FAQ__block_active');
    element.querySelector('.page7-FAQ__toggle').textContent = "-";
  }
  
  const hideAnswer = (element) => {
    element.classList.remove('page7-FAQ__block_active');
    element.querySelector('.page7-FAQ__toggle').textContent = "+";
  }

  const checkLeftSideClick = (clientX) => {
    let documentWidth = $(document).width();
    let halfWidth = documentWidth / 2;

    return 0 <= clientX && clientX <= halfWidth;
  }

  const checkRightSideClick = (clientX) => {
    let documentWidth = $(document).width();
    let halfWidth = documentWidth / 2;

    return documentWidth - halfWidth <= clientX && clientX <= documentWidth;
  }

  const isWindowLandscape = () => {
    const width = $(document).width();
    const height = $(document).height();

    return width > height;
  }

  const toggleWarningBlock = () => {
    if (isMobile.any()) {
      let warningBlock = $('.warning');
      warningBlock.toggleClass('warning-active');
    }
  }

  const setPagesClickHandler = () => {
    $('.page').on('click', event => {
      clickPageHandler(event);
    });
  }

  const clickPageHandler = (event) => {
    let clientX = event.clientX;
    currentPageNumber = getCurrentSlide();    
  
      if (checkLeftSideClick(clientX)) {
        if (currentPageNumber == 7) return false;

        newPageNumber = currentPageNumber - 1;
        SLIDER.slick('slickGoTo', newPageNumber);
      } 
      if (checkRightSideClick(clientX)) {
        if (currentPageNumber == 7) return false;

        newPageNumber = currentPageNumber + 1;
        SLIDER.slick('slickGoTo', newPageNumber);
      }
  }

  const changePageIndicator = (newPageIndicatorNumber) => {
    let currentPageIndicator = $(`.header-pages__page_active`);
    let newPageIndicator = $(`.header-pages__page[data-number='${newPageIndicatorNumber}']`);
  
    currentPageIndicator.toggleClass('header-pages__page_active');
    newPageIndicator.toggleClass('header-pages__page_active');
  }

  const scrollToTop = () => {
    if ($('body')[0].__overlayScrollbars__.scroll().position.y <= 15) {
      $('body')[0].__overlayScrollbars__.scroll(0);
    } else {
      $('body')[0].__overlayScrollbars__.scroll(0);
    }
  }

  const toggleModalCallback = () => {
    MODAL_CALLBACK.toggleClass('modalCallback-active');
  }

  const enableSlider = (options) => {
    SLIDER.slick(options);
  }

  const getCurrentSlide = () => {
    return SLIDER.slick('slickCurrentSlide');
  }

  // Slider
  enableSlider(SLIDER_OPTIONS);

  SLIDER.on('click', event => {
    event.stopPropagation();
  });

  SLIDER.on('afterChange', (event, slick, currentPageNumber) => {
    scrollToTop();
    changePageIndicator(currentPageNumber);
  });

  // Header Navigation
  HEADER_PAGES.on('click', event => {
    let target = event.target;
    if (~target.className.indexOf('header-pages__page_active')) return false;

    if (target.className == 'header-pages__page') {
      let newPageNumber = $(target).data('number');
      SLIDER.slick('slickSetOption', 'speed', 1);
      SLIDER.slick('slickGoTo', newPageNumber);
      changePageIndicator(newPageNumber);
      SLIDER.slick('slickSetOption', 'speed', 300);
    }
  });

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
  });

  // Hide Scroll
  $("body").overlayScrollbars({
    clipAlways: false,
    scrollbars: {
      visibility: 'hidden',
      touchSupport: false
    }
  });

  // Window Events
  $(window)
    .on('orientationchange', () => {
      toggleWarningBlock();
    })
    .on('resize', () => {
      setPagesHeight();
      setPagesWidth();
    })
    
    // Form Phone
  function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    } else if (input.createTextRange) {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', selectionEnd);
      range.moveStart('character', selectionStart);
      range.select();
    }
  }

  function setCaretToPos(input, pos) {
    setSelectionRange(input, pos, pos);
  }

  $(".modalCallback-form__input").click(function() {
    setCaretToPos($(".modalCallback-form__input")[0], 3);
  });
  
  $(function(){
    $(".modalCallback-form__input").mask("+7 999 999-99-99", {
      placeholder: "+7 000 000-00-00"
    });
  });

  // Modal Callback
  MODAL_CALLBACK_CLOSE_BUTTON.on('click', () => {
    toggleModalCallback();
  });
  MODAL_CALLBACK_SHOW_BUTTON.on('click', () => {
    toggleModalCallback();
  });

  // FORM
  FORM.on('submit', event => {
    event.preventDefault();
  });
   
  if (isMobile.any()) {
    setPagesClickHandler();
  }
  setPagesHeight();
  setPagesWidth();
  
  if (isWindowLandscape()) {
    toggleWarningBlock();
  }
});

