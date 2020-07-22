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
  let playerDuration;
  let playerBig;

  const FAQ = $('.page7-FAQ'),
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
    PLAYER_MINI = new Plyr('.player-mini', {
      controls: [],
      muted: true
    }),
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
      touchThreshold: 5,
      variableWidth: true,
      waitForAnimate: false
    };

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
    if (event.isDefaultPrevented()) return false;

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
    $('.modalCallback-content').toggleClass('modalCallback-content-active');
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
  
  const setOverflowPageSlider = () => {
    const OS_CONTENT = $('.os-content');
    const SLICK_LIST = $('.slick-list');
    const SLICK_TRACK = $('.slick-track');
    const innerHeight = window.innerHeight;
    
    $(OS_CONTENT).css('height', `${innerHeight}px`);
    $(SLICK_LIST).css('height', `${innerHeight}px`);
    $(SLICK_TRACK).css('height', `${innerHeight}px`);

    SLIDER.animate({
      'opacity': '0'
    }, 500);
  }
  
  const offOverflowPageSlider = () => {    
    const OS_CONTENT = $('.os-content');
    const SLICK_LIST = $('.slick-list');
    const SLICK_TRACK = $('.slick-track');
    
    $(OS_CONTENT).css('height', '100%');
    $(SLICK_LIST).css('height', $(`.page${getCurrentSlide() + 1}`).height());
    $(SLICK_TRACK).css('height', '100%');

    SLIDER.animate({
      'opacity': '1'
    }, 500);
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
  FAQ.on('click', function (event) {
    event.stopPropagation();
    event.preventDefault();
    
    const target = event.target;
    const faqBlock = $(target).hasClass('page7-FAQ__block') ? $(target) : $(target).parents('.page7-FAQ__block');
    
    faqBlock.hasClass('page7-FAQ__block_active') ? hideAnswer(faqBlock) : showAnswer(faqBlock);
  });

  // Links
  $('a').on('click', event => {
    event.stopImmediatePropagation();
  });

  // Hide Scroll
  OverlayScrollbars($("body"), {
    clipAlways: false,
    scrollbars: {
      visibility: 'hidden'
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
      placeholder: "+7 000 000-00-00",
      completed: function () {
        FORM.find('button').prop('disabled', false);
        FORM.find('button').toggleClass('button-disabled');
      }
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
    setOverflowPageSlider();
    scrollToTop();
    MODAL_CALLBACK.scrollTop(1);
    return false;
  });

  MODAL_CALLBACK_CLOSE_BUTTON.on('click', () => {
    toggleModalCallback();
    offOverflowPageSlider();
    scrollToTop();
    setPagesHeight();
  });
  
  // Modal Video
  MODAL_VIDEO_SHOW_BUTTON.on('click', () => {
    if ($('.player-big').length === 0) {
      MODAL_VIDEO_CLOSE_BUTTON.after(`
        <video class="player-big" playsinline>
          <source src="./video/video.mp4" type="video/mp4" />
        </video>
      `);

      playerBig = new Plyr('.player-big', {
        controls: ['play-large', 'play', 'progress', 'current-time']
      });
      playerDuration = Math.floor(playerBig.duration);
    }

    playerBig.muted = false;
    playerBig.volume = 1;
    PLAYER_MINI.stop();
    playerBig.play();
    
    toggleModalVideo();
    scrollToTop();
    toggleOverflowOsContent();
    return false;
  });
  
  MODAL_VIDEO_CLOSE_BUTTON.on('click', () => {
    const bigPlayerTime = Math.floor(playerBig.currentTime);
    playerBig.muted = true;
    playerBig.volume = 0;
    playerBig.stop();
    
    toggleModalVideo();
    scrollToTop();
    toggleOverflowOsContent();

    PLAYER_MINI.volume = 0;
    PLAYER_MINI.play();
    if (bigPlayerTime !== playerDuration) {
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
});

