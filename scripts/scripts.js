$(document).ready(function () {

  const FAQ = $('.page7-FAQ'),
    HEADER_PAGES = $('.header-pages'),
    SLIDER = $('.page-slider');

  let documentWidth = $(document).width(),
    halfWidth = documentWidth / 2;
    // screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;

  const setPagesWidth = () => {
    $('.page').width(documentWidth);
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
    return 0 <= clientX && clientX <= halfWidth;
  }

  const checkRightSideClick = (clientX) => {
    return documentWidth - halfWidth <= clientX && clientX <= documentWidth;
  }

  // const goToNewPage = (direction, currentPageNumber) => {
  //   let newPageNumber;
    
  //   if (direction == 'left') {
  //     if (currentPageNumber == 1) return false;

  //     newPageNumber = currentPageNumber - 1;
  //     changePage(newPageNumber);
  //     changePageIndicator(newPageNumber);
  //   } else {
  //     if (currentPageNumber == 8) return false;

  //     newPageNumber = currentPageNumber + 1;
  //     changePage(newPageNumber);
  //     changePageIndicator(newPageNumber);
  //   }
  // }

  const setPagesClickHandler = () => {
    $('.page').on('click', event => {
      clickPageHandler(event);
    });
  }

  const clickPageHandler = (event) => {
    let clientX = event.clientX,
      currentPageNumber = SLIDER.slick('slickCurrentSlide');    
  
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
      // goToNewPage(direction, currentPageNumber);
  }

  // const changePage = (newPageNumber) => {
    // currentPage.toggleClass('page-active');
    // currentPage.off('click');
    // currentPage.off('swipe');
    // currentPage = $(`.page[data-number='${newPageNumber}']`);
    // currentPage.toggleClass('page-active');

    // setCurrentPageClickHandler();
    // setCurrentPageSwipeHandler();
    // changeBodyBackgroungImage(newPageNumber);
    // changePageIndicator(newPageNumber);
    // scrollToTop();
  // }
  
  const changePageIndicator = (newPageIndicatorNumber) => {
    let currentPageIndicator = $(`.header-pages__page_active`);
    let newPageIndicator = $(`.header-pages__page[data-number='${newPageIndicatorNumber}']`);
  
    currentPageIndicator.toggleClass('header-pages__page_active');
    newPageIndicator.toggleClass('header-pages__page_active');
  }

  const changeBodyBackgroungImage = (pageNumber) => {
    if (pageNumber == 0) {
      $('body').css('background-image', 'url(./img/main/bg.png)')
    } else {
      $('body').css('background-image', 'url(./img/main/bg2.png)')
    }
  }

  const setSlickTrackHeight = (currentPageNumber) => {
    // let height = $(`.page[data-slick-index='${currentPageNumber}']`).height();
    // $('.slick-track').height(height);
    // $('.slick-list').height(height);
  }

  const scrollToTop = () => {
    if ($('body')[0].__overlayScrollbars__.scroll().position.y <= 15) {
      $('body')[0].__overlayScrollbars__.scroll(0);
    } else {
      $('body')[0].__overlayScrollbars__.scroll(0, 100);
    }
  }

  // Slider
  SLIDER.slick({
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    accessibility: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 300,
          swipeToSlide: true,
          waitForAnimate: false,
          variableWidth: true,
          focusOnSelect: true,
          infinite: false,
          adaptiveHeight: true
        }
      }
    ]
  });

  SLIDER.on('click', event => {
    event.stopPropagation();
  });

  SLIDER.on('afterChange', (event, slick, currentPageNumber) => {
    console.log(event, slick, currentPageNumber);
    scrollToTop();
    changePageIndicator(currentPageNumber);
    // changeBodyBackgroungImage(currentPageNumber);
    setSlickTrackHeight(currentPageNumber);
  });

  SLIDER.on('setPosition', (event, slick) => {
    console.log(event, slick);
  });

  // Header Navigation
  HEADER_PAGES.on('click', event => {
    let target = event.target;
    if (~target.className.indexOf('header-pages__page_active')) return false;

    if (target.className == 'header-pages__page') {
      let newPageNumber = $(target).data('number');
      SLIDER.slick('slickSetOption', 'speed', 1);
      SLIDER.slick('slickGoTo', newPageNumber);
      // changePage(newPageNumber);
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
    event.preventDefault();
  });


  // Swipe
  /**
   * @param {object} element - DOM-объект
   * @param {object} settings - Предварительные настройки для свайпа.
  */
  // const swipe = function (element, settings) {
  //   const isTouch = () => {
  //     return (
  //       !!(typeof window.orientation !== "undefined" || 
  //         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
  //         "ontouchstart" in window || navigator.msMaxTouchPoints || "maxTouchPoint" in window.navigator > 1 || 
  //         "msMaxTouchPoints" in window.navigator > 1)
  //     )
  //   }

  //   // настройки по умолчанию
  //   settings = Object.assign({}, {
  //     minDist: 60,  // минимальная дистанция, которую должен пройти указатель, чтобы жест считался как свайп (px)
  //     maxDist: 120, // максимальная дистанция, не превышая которую может пройти указатель, чтобы жест считался как свайп (px)
  //     maxTime: 700, // максимальное время, за которое должен быть совершен свайп (ms)
  //     minTime: 50   // минимальное время, за которое должен быть совершен свайп (ms)
  //   }, settings);

  //   let dir,                            // направление свайпа (horizontal)
  //     swipeType,                        // тип свайпа (left, right)
  //     dist,                             // дистанция, пройденная указателем
  //     startX = 0,                       // начало координат по оси X (pageX)
  //     distX = 0,                        // дистанция, пройденная указателем по оси X
  //     startTime = 0,                    // время начала касания
  //     support = {                       // поддерживаемые браузером типы событий
  //       touch: isTouch()
  //     };

  //   // коррекция времени при ошибочных значениях
  //   if (settings.maxTime < settings.minTime) settings.maxTime = settings.minTime + 500;
  //   if (settings.maxTime < 100 || settings.minTime < 50) {
  //     settings.maxTime = 700;
  //     settings.minTime = 50;
  //   }

  //   /**
  //   * Опредление доступных в браузере событий: pointer, touch.
  //   * @returns {object} - возвращает объект с названиями событий.
  //   */
  //   const getSupportedEvents = () => {
  //     let events; 
  //     let support = {
  //       touch: isTouch()
  //     };
      
  //     switch (true) {
  //       case support.touch:
  //         events = {
  //           type:   "touch",
  //           start:  "touchstart",
  //           move:   "touchmove",
  //           end:    "touchend",
  //           cancel: "touchcancel"
  //         };
  //         break;
  //       default:
  //         events = {};
  //         break;
  //     }

  //     return events;
  //   };

    
  //   /**
  //   * Объединение событий touch.
  //   * @param {object} event - принимает в качестве аргумента событие.
  //   * @returns {TouchList | event} возвращает либо TouchList, либо оставляет событие без изменения.
  //   */
  //   const eventsUnify = event => {
  //     return event.changedTouches ? event.changedTouches[0] : event;
  //   };

  //   /**
  //    * Обрабочик начала касания указателем.
  //    * @param {Event} event - получает событие.
  //    */
  //   const checkStart = event => {
  //     const swipeEvent = eventsUnify(event);

  //     if (support.touch && typeof swipeEvent.touches !== "undefined" && swipeEvent.touches.length !== 1) return; // игнорирование касания несколькими пальцами
      
  //     dir = "none";
  //     swipeType = "none";
  //     dist = 0;
  //     startX = swipeEvent.pageX;
  //     startTime = new Date().getTime();
  //   };

  //   /**
  //    * Обработчик движения указателя.
  //    * @param {Event} event - получает событие.
  //    */
  //   const checkMove = function (event) {
  //     const swipeEvent = eventsUnify(event);
  //     distX = swipeEvent.pageX - startX;
  //     dir = (distX < 0) ? "right" : "left";
  //   };

  //   /**
  //    * Обработчик окончания касания указателем.
  //    * @param {Event} event - получает событие.
  //    */
  //   const checkEnd = function (event) {
  //     let endTime = new Date().getTime();
  //     let time = endTime - startTime;

  //     // проверка времени жеста
  //     if (time >= settings.minTime && time <= settings.maxTime) {
  //       if (Math.abs(distX) >= settings.minDist) {
  //         swipeType = dir; // опредление типа свайпа как "left" или "right"
  //       }
  //     }

  //      // опредление пройденной указателем дистанции
  //     if(["left", "right"].includes(dir)) {
  //       dist = Math.abs(distX)
  //     }

  //     // генерация кастомного события swipe
  //     if (swipeType !== "none" && dist >= settings.minDist) {
  //       const swipeEvent = new CustomEvent("swipe", {
  //           bubbles: true,
  //           cancelable: true,
  //           detail: {
  //             full: event, // полное событие Event
  //             dir:  swipeType, // направление свайпа
  //             dist: dist, // дистанция свайпа
  //             time: time // время, потраченное на свайп
  //           }
  //         });
  //       element[0].dispatchEvent(swipeEvent);
  //     }
  //   };

  //   // добавление поддерживаемых событий
  //   const events = getSupportedEvents();

  //   // добавление обработчиков на элемент
  //   element.on(events.start, checkStart);
  //   element.on(events.move, checkMove);
  //   element.on(events.end, checkEnd);
  // }

  // const swipeHandler = (event) => {
  //   if (~event.target.className.indexOf('page-slider')) return false;
  //   if (event.detail.full.target.tagName == 'IMG') return false;

  //   let currentPageNumber = currentPage.data('number'),
  //     direction = event.detail.dir;
    
  //   goToNewPage(direction, currentPageNumber);
  // }

  // const setCurrentPageSwipeHandler = () => {
  //   const initialSettings = {
  //     maxTime: 1000,
  //     minTime: 100,
  //     maxDist: 150,
  //     minDist: 60
  //   }

  //   swipe(currentPage, initialSettings);

  //   currentPage.on('swipe', event => {
  //     swipeHandler(event);
  //   });
  // }
  
  // setCurrentPageSwipeHandler();
  setPagesClickHandler();

  $("body").overlayScrollbars({
    clipAlways: false,
    scrollbars: {
      visibility: 'hidden',
      touchSupport: false
    }
   });
   
  setPagesHeight();
  setPagesWidth();
  setSlickTrackHeight(0);
  screen.orientation.lock('portrait-primary');
});

