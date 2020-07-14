$(document).ready(function () {
  let isMobile = {
      Android:        function() { return navigator.userAgent.match(/Android/i) ? true : false; },
      BlackBerry:     function() { return navigator.userAgent.match(/BlackBerry/i) ? true : false; },
      iOS:            function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false; },
      Windows:        function() { return navigator.userAgent.match(/IEMobile/i) ? true : false; },
      any:            function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());  }
  };

  let currentPageNumber = 0;
  let activePageNumber = 0;

  const FAQ_BLOCK = $('.page7-FAQ__block'),
    HEADER_PAGES = $('.header-pages'),
    SLIDER = $('.page-slider'),
    MODAL_CALLBACK = $('.modalCallback'),
    MODAL_CALLBACK_SHOW_BUTTON = $('.footer-contact__button'),
    MODAL_CALLBACK_CLOSE_BUTTON = $('.modalCallback-close'), 
    FORM = $('.modalCallback-form'),
    FORM_INPUT = $('.modalCallback-form__input'),
    MODAL_VIDEO = $('.modalVideo'),
    MODAL_VIDEO_SHOW_BUTTON = $('.footer-video'),
    MODAL_VIDEO_CLOSE_BUTTON = $('.modalVideo-close'),
    MODAL_SWIPEME = $('.modalSwipeme'),
    MODAL_SWIPEME_SHOW_BUTTON = $('.footer-contact__text'),
    MODAL_SWIPEME_CLOSE_BUTTON = $('.modalSwipeme-close'),
    MODAL_SITE = $('.modalSite'),
    MODAL_SITE_SHOW_BUTTON = $('.page4-yoursite__button'),
    MODAL_SITE_CLOSE_BUTTON = $('.modalSite-close'),
    PLAYER_BIG = new Plyr('.player-big', {
      controls: ['play-large', 'play', 'progress', 'current-time'],
      setting: ['captions', 'quality', 'speed', 'loop'],
      quality: { 
        default: 576, 
        options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] 
      }
    });
    PLAYER_MINI = new Plyr('.player-mini', {
      controls: [],
      muted: true
      // autoplay: true
    });
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
      // useTransform: false,
      waitForAnimate: false,
      // responsive: [
      //   {
      //     breakpoint: 1000,
      //     settings: {
      //       touchThreshold: 5
      //     }
      //   }
      // ]
    },
    PLAYER_DURATION = Math.floor(PLAYER_BIG.duration);

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
      $()
    });
    MODAL_VIDEO.height(documentHeight);
  }

  // const setModalCallbackHeight = () => {
  //   const documentHeight = $(document).height();
  //   const pageHeight = $(`.page${getCurrentSlide() + 1}`).height();
  //   const emptySpace = pageHeight - documentHeight;
  //   if (emptySpace > 0) {
  //     const newModalHeight = emptySpace <= 157 ? documentHeight + emptySpace + 157 : documentHeight + emptySpace; 
  //     MODAL_CALLBACK.height(newModalHeight);
  //   } else {
  //     resetModalCallbackHeight();
  //   }
  // }

  // const resetModalCallbackHeight = () => {
  //   const documentHeight = $(document).height();
  //   MODAL_CALLBACK.height(documentHeight);
  // }
  
  const showAnswer = (element) => {
    element.addClass('page7-FAQ__block_active');
    element.find('.page7-FAQ__toggle').text("-");
  }
  
  const hideAnswer = (element) => {
    element.removeClass('page7-FAQ__block_active');
    element.find('.page7-FAQ__toggle').text("+");
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
    return ~screen.orientation.type.indexOf('landscape')
  }

  const toggleWarningBlock = () => {
    if (isMobile.any()) {
      let warningBlock = $('.warning');
      warningBlock.toggleClass('warning-active');
    }
  }

  const setPagesClickHandler = () => {
    $('.page-slider, .footer').on('click', event => {
      clickPageHandler(event);
    });
  }

  const clickPageHandler = (event) => {
    let clientX = event.clientX;
    currentPageNumber = getCurrentSlide();    
  
      if (checkLeftSideClick(clientX)) {
        if (currentPageNumber == 0) return false;

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
    $('body')[0].__overlayScrollbars__.scroll(0);
  }

  const toggleModalCallback = () => {
    MODAL_CALLBACK.toggleClass('modalCallback-active');
  }

  const toggleModalVideo = () => {
    MODAL_VIDEO.toggleClass('modalVideo-active');
  }

  const enableSlider = (options) => {
    SLIDER.slick(options);
  }

  const getCurrentSlide = () => {
    return SLIDER.slick('slickCurrentSlide');
  }

  const toggleOverflowOsContent = () => {
    const OS_CONTENT = $('.os-content');
    OS_CONTENT.css('overflow', OS_CONTENT.css('overflow') === 'visible' ? 'hidden' : 'visible');
  }

  const toggleModalSwipeme = () => {
    $('.modalOverlay').toggleClass('modalOverlay-active');
    MODAL_SWIPEME.toggleClass('modalSwipeme-active');
  }

  const toggleModalSite = () => {
    $('.modalOverlay').toggleClass('modalOverlay-active');
    MODAL_SITE.toggleClass('modalSite-active');
  }
 
 // Slider
  enableSlider(SLIDER_OPTIONS);

  SLIDER.on('click', event => {
    event.stopPropagation();
  });

  SLIDER.on('afterChange', (event, slick, currentPageNumber) => {
    console.log('afterChange')
    scrollToTop();
    changePageIndicator(currentPageNumber);
    activePageNumber = currentPageNumber;
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
  FAQ_BLOCK.on('click', function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    $(this).hasClass('page7-FAQ__block_active') ? hideAnswer($(this)) : showAnswer($(this));
    return false;
  });

  // Links
  $('a').on('click', event => {
    event.stopImmediatePropagation();
  });

  // Hide Scroll
  OverlayScrollbars($("body"), {
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
      toggleOverflowOsContent();
    })
    .on('resize', () => {
      if (!isWindowLandscape()) {
        setPagesHeight();
        setPagesWidth();
      }
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
  
  // FORM
  FORM.on('submit', function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    console.log(data);
    $.ajax({
      type: "POST",
      url: "send.php",
      data: data
    }).done(function() {
      console.log(data);
      alert("Заявка отправлена!");
    });
    return false;
  });
  
  // Modal Callback
  MODAL_CALLBACK_SHOW_BUTTON.on('click', () => {
    toggleModalCallback();
    // setModalCallbackHeight();
    toggleOverflowOsContent();
    scrollToTop();
    return false;
  });

  MODAL_CALLBACK_CLOSE_BUTTON.on('click', () => {
    toggleModalCallback();
    // resetModalCallbackHeight();
    toggleOverflowOsContent();
    scrollToTop();
  });
  
  // Modal Video
  MODAL_VIDEO_SHOW_BUTTON.on('click', () => {
    PLAYER_BIG.volume = 1;
    PLAYER_MINI.stop();
    PLAYER_BIG.play();
    
    toggleModalVideo();
    scrollToTop();
    toggleOverflowOsContent();
    return false;
  });
  
  MODAL_VIDEO_CLOSE_BUTTON.on('click', () => {
    const bigPlayerTime = Math.floor(PLAYER_BIG.currentTime);
    PLAYER_BIG.volume = 0;
    PLAYER_BIG.stop();
    
    toggleModalVideo();
    scrollToTop();
    toggleOverflowOsContent();

    PLAYER_MINI.play();
    if (bigPlayerTime !== PLAYER_DURATION) {
      PLAYER_MINI.forward(bigPlayerTime);
    }
  });
  
  // MODAL SWIPEME
  MODAL_SWIPEME_SHOW_BUTTON.on('click', () => {
    toggleModalSwipeme();
    scrollToTop();
    toggleOverflowOsContent();
    return false;
  });
  
  MODAL_SWIPEME_CLOSE_BUTTON.on('click', () => {
    toggleModalSwipeme();
    scrollToTop();
    toggleOverflowOsContent();
  });

  // MODAL SITE
  MODAL_SITE_SHOW_BUTTON.on('click', (event) => {
    event.stopImmediatePropagation();
    toggleModalSite();
    scrollToTop();
    toggleOverflowOsContent();
  });
  
  MODAL_SITE_CLOSE_BUTTON.on('click', () => {
    toggleModalSite();
    scrollToTop();
    toggleOverflowOsContent();
  });

  if (isMobile.any()) {
    setPagesClickHandler();
  }
  setPagesHeight();
  setPagesWidth();
  
  if (isWindowLandscape()) {
    toggleWarningBlock();
    toggleOverflowOsContent();
  }

  PLAYER_MINI.volume = 0;
  PLAYER_MINI.loop = true;
  PLAYER_MINI.on('canplay', event => {
    // console.log(event.detail.plyr)
    PLAYER_MINI.play();
  });
  PLAYER_MINI.on('canplaythrough', event => {
    // console.log(event.detail.plyr)
    PLAYER_MINI.play();
  });

  // if (document.documentElement.requestFullscreen) {
  //   document.documentElement.requestFullscreen();
  // } else if (document.documentElement.webkitrequestFullscreen) {
  //   document.documentElement.webkitrequestFullscreen();
  // } else if (document.documentElement.mozrequestFullscreen) {
  //   document.documentElement.mozrequestFullscreen();
  // } else if (document.documentElement.msrequestFullscreen) {
  //   document.documentElement.msrequestFullscreen();
  // }

  // function toggleFullScreen() {
  //   var doc = window.document;
  //   var docEl = doc.documentElement;
    
  //   var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen;
  //   var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen;
    
  //   if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement) { 
  //     requestFullScreen.call(docEl);
  //   }
  //   else {
  //     cancelFullScreen.call(doc);  
  //   }
  // }

  // $('body').on('click', () => {
    // toggleFullScreen()
  // });
  


});

