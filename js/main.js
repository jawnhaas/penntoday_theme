(function ($) {
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _slider = require('./modules/slider');

var _slider2 = _interopRequireDefault(_slider);

var _header = require('./modules/header');

var _header2 = _interopRequireDefault(_header);

var _search = require('./modules/search');

var _search2 = _interopRequireDefault(_search);

var _articleNav = require('./modules/article-nav');

var _articleNav2 = _interopRequireDefault(_articleNav);

var _toggleNav = require('./modules/toggle-nav');

var _toggleNav2 = _interopRequireDefault(_toggleNav);

var _infiniteScroll = require('./modules/infinite-scroll');

var _infiniteScroll2 = _interopRequireDefault(_infiniteScroll);

var _video = require('./modules/video');

var _video2 = _interopRequireDefault(_video);

var _newsletter = require('./modules/newsletter');

var _newsletter2 = _interopRequireDefault(_newsletter);

var _articleShare = require('./modules/article-share');

var _articleShare2 = _interopRequireDefault(_articleShare);

var _datepicker = require('./modules/datepicker');

var _datepicker2 = _interopRequireDefault(_datepicker);

var _toggleDropdown = require('./modules/toggle-dropdown');

var _toggleDropdown2 = _interopRequireDefault(_toggleDropdown);

var _insidePennScroll = require('./modules/inside-penn-scroll');

var _insidePennScroll2 = _interopRequireDefault(_insidePennScroll);

var _articleGallery = require('./modules/article-gallery');

var _articleGallery2 = _interopRequireDefault(_articleGallery);

var _modernizrDetect = require('./modules/modernizr-detect');

var _modernizrDetect2 = _interopRequireDefault(_modernizrDetect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Responsive image support
window.lazySizesConfig = window.lazySizesConfig || {};
// lazysizes loads all elements after the window onload event
window.lazySizesConfig.preloadAfterLoad = true;

/**
 * Create and initialize global site instance when document is ready.
 */

$(document).ready(function () {
  new _modernizrDetect2.default();
  new _header2.default();

  if (location.pathname.indexOf('/search/') >= 0) {
    new _search2.default();
  }
  if (location.pathname.indexOf('/content/') >= 0) {
    new _articleShare2.default('.article__body > *:not(".article__popular-stories, .article__reading-list")');
    new _articleGallery2.default('.img-container');
  }
  if (location.pathname.indexOf('/inside-penn/') >= 0) {
    new _insidePennScroll2.default();
  }
  if ($('.js-filter-toggle').length) {
    new _toggleDropdown2.default('.js-filter-toggle');
  }
  if ($('.slider').length) {
    new _slider2.default();
  }
  if ($('.article-nav').length) {
    new _articleNav2.default();
  }
  if ($('.js-toggle-nav')) {
    new _toggleNav2.default('.js-toggle-nav');
  }
  if ($('.js-infinite-scroll').length) {
    new _infiniteScroll2.default();
  }
  if ($('.video-container').length) {
    new _video2.default();
  }
  if ($('.newsletter-callout').length) {
    new _newsletter2.default();
  }
  if ($('.datepicker').length) {
    new _datepicker2.default();
  }
});

},{"./modules/article-gallery":2,"./modules/article-nav":3,"./modules/article-share":4,"./modules/datepicker":5,"./modules/header":6,"./modules/infinite-scroll":8,"./modules/inside-penn-scroll":9,"./modules/modernizr-detect":10,"./modules/newsletter":11,"./modules/search":13,"./modules/slider":14,"./modules/toggle-dropdown":15,"./modules/toggle-nav":16,"./modules/video":17}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scrollLock = require('./scroll-lock');

var _scrollLock2 = _interopRequireDefault(_scrollLock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArticleGallery = function () {
  function ArticleGallery(imageSelector) {
    _classCallCheck(this, ArticleGallery);

    this.$window = $(window);
    this.$body = $('body');
    this.$page = $('.page');
    this.$gallery = $('.js-article-gallery');
    this.$images = $(imageSelector);
    this.currentSlide = 0;
    this.scrollLock = new _scrollLock2.default();
    this.init();
  }

  _createClass(ArticleGallery, [{
    key: 'init',
    value: function init() {
      this.$images.click(this.createGallery.bind(this));
      this.setImageIndex();
    }
  }, {
    key: 'setImageIndex',
    value: function setImageIndex() {
      this.$images.each(function (index, el) {
        $(this).attr('data-index', index);
      });
    }
  }, {
    key: 'createGallery',
    value: function createGallery(evt) {
      if (!this.$gallery.length) {
        var galleryClose = '<div class="gallery__close-svg"><svg viewBox="0 0 25 25"><polygon fill="#FFFFFF" fill-rule="evenodd" points="40.712 455.057 51.114 465.459 49.459 467.114 39.057 456.712 28.655 467.112 27 465.457 37.402 455.057 27.002 444.655 28.658 443 39.057 453.402 49.459 443 51.114 444.655" transform="translate(-27 -443)"/></svg></div>';
        var galleryImageWrapper = '<div class="js-gallery-slider"></div>';
        var galleryHeadline = '<h2 class="article-gallery__headline">' + $('.article__header').text() + '</h2>';
        var galleryContainer = '<section class="js-article-gallery article-gallery">' + galleryClose + '<div class="article-gallery__container">' + galleryImageWrapper + '</div></section>';

        this.$page.append(galleryContainer);
        this.$gallery = $('.js-article-gallery');
        this.currentSlide = $(evt.currentTarget).data('index');
      }

      $('.gallery__close-svg').click(this.closeGallery.bind(this));

      this.cloneImages();
      setTimeout(this.initializeSlider.bind(this), 50);
    }
  }, {
    key: 'cloneImages',
    value: function cloneImages() {
      var clonedImages = this.$images.clone();
      clonedImages.removeAttr('class').addClass('img-container').find('img').removeAttr('class').addClass('lazyload blur-up');
      clonedImages.find('noscript').remove();

      clonedImages.appendTo('.js-gallery-slider');
    }
  }, {
    key: 'initializeSlider',
    value: function initializeSlider() {
      var _this = this;

      var gallerySlider = this.$gallery.find('.js-gallery-slider');
      this.scrollLock.saveScroll();
      gallerySlider.on('init', function () {
        this.$body.addClass('js-gallery-active');
      }.bind(this));
      this.$body.addClass('js-gallery-active');
      this.$gallery.find('.js-gallery-slider').slick({
        dots: false,
        infinite: true,
        fade: true,
        zIndex: 4,
        swipe: false
      });

      gallerySlider.slick('slickGoTo', this.currentSlide, true);
      gallerySlider.find('.slick-list').attr('tabindex', 0).focus();

      this.$window.resize(function () {
        _this.$gallery.find('.js-gallery-slider').slick('setPosition');
      });
      this.$window.on('keydown.gallery', this.escGallery.bind(this));

      this.objectFitPolyfill();
      this.addHoverArrows();
    }
  }, {
    key: 'objectFitPolyfill',
    value: function objectFitPolyfill() {
      if (!Modernizr.objectfit) {
        this.$gallery.find('.img-container').each(function () {
          var $container = $(this);
          var $img = $container.find('img');
          var imgUrl = '';

          if ($img.attr('data-srcset')) {
            imgUrl = $img.attr('data-srcset').split(",");
            imgUrl = imgUrl[imgUrl.length - 1].trim().split(" ")[0];
          } else {
            imgUrl = $img.prop('src');
          }

          if (imgUrl) {
            $container.addClass('js-object-fit').prepend('<div class="js-img"></div>');

            $container.find('.js-img').css('backgroundImage', 'url(' + imgUrl + ')');
          }
        });
      }
    }
  }, {
    key: 'addHoverArrows',
    value: function addHoverArrows() {
      this.$gallery.find('.img-container').each(function () {
        var $container = $(this);
        var $prevHoverSpan = '<span class="js-hover-arrow prev-arrow"></span>';
        var $nextHoverSpan = '<span class="js-hover-arrow next-arrow"></span>';

        $container.prepend($prevHoverSpan);
        $container.append($nextHoverSpan);

        $container.find('.prev-arrow').click(function () {
          $('.slick-prev').click();
        });
        $container.find('.next-arrow').click(function () {
          $('.slick-next').click();
        });
      });
    }
  }, {
    key: 'closeGallery',
    value: function closeGallery() {
      this.$gallery.find('.js-gallery-slider').slick('unslick');
      this.$gallery.remove();
      this.$gallery = [];
      this.$body.removeClass('js-gallery-active');
      this.scrollLock.scrollPosition();
      this.$window.off('keydown.gallery');
    }
  }, {
    key: 'escGallery',
    value: function escGallery(evt) {
      if (evt.which === 27) {
        evt.preventDefault();
        this.closeGallery();
      }
    }
  }]);

  return ArticleGallery;
}();

exports.default = ArticleGallery;

},{"./scroll-lock":12}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArticleNav = function () {
  function ArticleNav() {
    _classCallCheck(this, ArticleNav);

    this.init();
  }

  _createClass(ArticleNav, [{
    key: 'init',
    value: function init() {
      this.$body = $('body');
      this.$articleBody = $('.article__wrapper');
      this.$progessBar = $('.js--progress-bar');
      this.$progressHidden = $('.js--progress-bar span');
      this.$articleNav = $('.article-nav');
      this.$header = $('.header');

      this.headerHeight = 0;
      this.articleHeight = 0;
      this.articleTop = 0;

      this.lastScroll = 0;
      this.scrollTop = 0;
      this.documentHeight = 0;
      this.windowWidth = $(window).width();
      this.windowHeight = $(window).height();
      this.direction = '';

      this.hasRecirc = false;

      this.bindEvents();
      this.setTrackerHeight();
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      $(window).on('scroll', _helpers.throttle.bind(this, this.onScroll));
    }
  }, {
    key: 'onScroll',
    value: function onScroll() {
      this.scrollTop = $(window).scrollTop();
      this.documentHeight = $(document).height();
      this.windowWidth = $(window).width();
      this.windowHeight = $(window).height();
      this.articleHeight = this.$articleBody.height();
      this.articleTop = this.$articleBody.offset().top;
      this.headerHeight = this.$header.outerHeight() * 2;

      this.getScrollDirection();
      this.getScrollProgress();
      this.toggleNav();
    }
  }, {
    key: 'setTrackerHeight',
    value: function setTrackerHeight() {
      $('.article__related').length ? this.hasRecirc = true : this.hasRecirc = false;
    }
  }, {
    key: 'getScrollProgress',
    value: function getScrollProgress() {
      var currentY = this.scrollTop - this.$articleBody.offset().top,
          scrollPercent = void 0;

      if (this.hasRecirc) {
        scrollPercent = parseFloat((currentY / (this.articleHeight - this.windowHeight / 2) * 100).toFixed(4));
      } else {
        scrollPercent = parseFloat((currentY / (this.articleHeight - this.windowHeight) * 100).toFixed(4));
      }

      if (this.scrollTop > this.articleTop && this.articleTop + this.articleHeight > this.scrollTop) {
        this.$progessBar.css({
          width: scrollPercent + '%'
        });
        this.$progressHidden.text(scrollPercent + '%');
      } else if (this.scrollTop < this.articleTop - this.windowHeight / 2) {
        this.$progessBar.css({
          width: '0%'
        });
      } else if (this.scrollTop > this.articleTop) {
        this.$progessBar.css({
          width: '100%'
        });
      }
    }
  }, {
    key: 'getScrollDirection',
    value: function getScrollDirection() {
      var currentScroll = window.pageYOffset;

      if (currentScroll > this.lastScroll && currentScroll >= 1) {
        this.direction = 'down';
      } else if (currentScroll < this.lastScroll && currentScroll <= this.documentHeight - this.windowHeight - 1) {
        this.direction = 'up';
      }

      this.lastScroll = currentScroll;
      return this.direction;
    }
  }, {
    key: 'toggleNav',
    value: function toggleNav() {
      var trackerEnd = void 0;

      if (this.hasRecirc) {
        trackerEnd = this.articleTop + (this.articleHeight - this.windowHeight / 2);
      } else {
        trackerEnd = this.articleTop + (this.articleHeight - this.windowHeight);
      }

      if (this.direction == 'down') {
        if (this.scrollTop > this.headerHeight && trackerEnd > this.scrollTop) {
          this.$body.addClass('article-nav--is-in-view');
          this.$body.addClass('border--blue');
        } else {
          this.$body.removeClass('article-nav--is-in-view');
          this.$body.removeClass('border--blue');
        }
      } else {
        this.$body.removeClass('article-nav--is-in-view');
        this.$body.removeClass('border--blue');
      }
    }
  }]);

  return ArticleNav;
}();

exports.default = ArticleNav;

},{"./helpers.js":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArticleShare = function () {
  function ArticleShare(selector) {
    _classCallCheck(this, ArticleShare);

    this.$window = $(window);
    this.selectableString = selector;
    this.selectable = $(selector);
    this.shareTool = $('.js-share-tool');
    this.shareToolPos = { minTop: window.innerHeight, minLeft: window.innerWidth, maxRight: 0, firstSelectLineLeft: null };

    this.init();
  }

  _createClass(ArticleShare, [{
    key: 'init',
    value: function init() {
      document.addEventListener('selectionchange', _helpers.throttle.bind(this, this.getSelectedRange));
      this.$window.on('scroll', _helpers.throttle.bind(this, this.hideShareTool));
    }
  }, {
    key: 'getSelectedRange',
    value: function getSelectedRange() {
      if (this.$window.width() <= 768) {
        return;
      }

      this.shareTool.find('a').off();

      var selection = window.getSelection();
      this.$window.one('mousedown', function (evt) {
        if (!$(evt.target).parents('.js-share-tool').length) {
          this.hideShareTool();
        }
      }.bind(this));

      var range = selection.rangeCount && selection.getRangeAt(0);

      if (!this.isSelectable(range)) {
        this.hideShareTool();
        return;
      }

      this.appendShareTool(range);
      this.applySelectedText(selection);
    }
  }, {
    key: 'applySelectedText',
    value: function applySelectedText(selection) {
      if (selection) {
        var encodedSelectionText = encodeURI(window.getSelection().toString());

        this.shareTool.find('.article__social-link--twitter').attr('href', 'https://twitter.com/intent/tweet?text=' + encodedSelectionText);
      }
    }
  }, {
    key: 'appendShareTool',
    value: function appendShareTool(range) {
      var clientRects = range.getClientRects();
      this.shareToolPos = {
        minTop: window.innerHeight,
        minLeft: window.innerWidth,
        maxRight: 0
      };

      Object.keys(clientRects).forEach(function (key) {
        var rect = clientRects[key];

        if (key === '0') {
          this.shareToolPos.firstSelectLineLeft = rect.left;
        }

        this.shareToolPos.minTop = Math.min(this.shareToolPos.minTop, rect.top);
        this.shareToolPos.minLeft = Math.min(this.shareToolPos.minLeft, rect.left);
        this.shareToolPos.maxRight = Math.max(this.shareToolPos.maxRight, rect.right);
      }.bind(this));

      var midPoint = (this.shareToolPos.maxRight - this.shareToolPos.minLeft) / 2 + this.shareToolPos.minLeft;

      if (this.shareToolPos.firstSelectLineLeft > midPoint) {
        var shareToolWidth = parseInt(this.shareTool.css('width'));

        this.styleShareTool(this.shareToolPos.minTop, this.shareToolPos.firstSelectLineLeft + shareToolWidth / 2);
      } else {
        this.styleShareTool(this.shareToolPos.minTop, midPoint);
      }
    }
  }, {
    key: 'styleShareTool',
    value: function styleShareTool(minTop, midPoint) {
      var shareToolHeight = this.shareTool.css('height');
      var shareToolWidth = this.shareTool.css('width');

      this.shareTool.css({
        display: 'block',
        position: 'fixed',
        top: minTop - parseInt(shareToolHeight),
        left: midPoint - parseInt(shareToolWidth) / 2
      });
    }
  }, {
    key: 'hideShareTool',
    value: function hideShareTool() {
      this.shareTool.css('display', 'none');
    }
  }, {
    key: 'isSelectable',
    value: function isSelectable(range) {
      return range && !range.collapsed && range.getClientRects().length && $(range.startContainer).parents(this.selectableString).length && $(range.endContainer).parents(this.selectableString).length;
    }
  }]);

  return ArticleShare;
}();

exports.default = ArticleShare;

},{"./helpers.js":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DatePicker = function () {
  function DatePicker() {
    _classCallCheck(this, DatePicker);

    this.init();
  }

  _createClass(DatePicker, [{
    key: 'init',
    value: function init() {
      $('.datepicker').datepicker();
    }
  }]);

  return DatePicker;
}();

exports.default = DatePicker;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = function () {
  function Header() {
    _classCallCheck(this, Header);

    this.$body = $('body');
    this.$window = $(window);
    this.$document = $(document);
    this.$header = $('.header');
    this.$searchOverlay = $('.search-bar__overlay');
    this.$menuButton = $('.js-menu-toggle');
    this.$menuLinks = $('.menu__overlay').find('a, button');
    this.$searchToggle = $('.js-search-bar-toggle');
    this.$searchButton = $('.js-search-bar-button');
    this.$searchInput = $('.js-search-bar-input');
    this.$searchText = $('.js-search-text');
    this.scrollItems = $('.menu__main-nav-wrapper, .l-site-nav__events');
    this.headerHeight = this.$header.outerHeight();
    this.lastScroll = 0;
    this.scrollTop = 0;
    this.documentHeight = 0;
    this.windowWidth = 0;
    this.windowHeight = 0;
    this.direction = '';

    this.init();
  }

  _createClass(Header, [{
    key: 'init',
    value: function init() {
      this.deactivateHiddenFocus();
      this.trapMenuFocus();

      this.$menuButton.click(this.toggleMenu.bind(this));
      this.$searchOverlay.click(this.toggleSearchBar.bind(this));
      this.$searchToggle.click(this.toggleSearchBar.bind(this));
      this.$searchButton.click(this.searchRedirect.bind(this));
      this.$window.on('scroll', _helpers.throttle.bind(this, this.onScroll));

      this.showHeader();
    }
  }, {
    key: 'toggleMenu',
    value: function toggleMenu(evt) {
      evt.preventDefault();

      if (!this.$body.hasClass('js-menu-open') && this.$window.width() >= 768) {
        this.scrollItems.scrollTop(0);
      }

      if (this.$body.hasClass('js-menu-open')) {
        this.deactivateMenuFocus();
        this.$body.removeClass('js-menu-open');
        this.$window.off('keydown.menu');
      } else {
        this.activateMenuFocus();
        this.$body.addClass('js-menu-open');
        this.$window.on('keydown.menu', this.escMenu.bind(this));
      }
    }
  }, {
    key: 'escMenu',
    value: function escMenu(evt) {
      if (evt.which === 27) {
        evt.preventDefault();
        this.deactivateMenuFocus();
        this.$body.removeClass('js-menu-open');
      }
    }
  }, {
    key: 'deactivateHiddenFocus',
    value: function deactivateHiddenFocus() {
      this.deactivateMenuFocus();
      $('.header-condensed').find('a, input, button').attr('tabindex', '-1');
      $('.search-bar').find('a, input, button').attr('tabindex', '-1');
    }
  }, {
    key: 'deactivateMenuFocus',
    value: function deactivateMenuFocus() {
      $('.menu__overlay .menu__close').attr('tabindex', '-1');
      this.$menuLinks.attr('tabindex', '-1');
    }
  }, {
    key: 'activateMenuFocus',
    value: function activateMenuFocus() {
      $('.menu__overlay').attr('tabindex', '0').focus();
      this.$menuLinks.attr('tabindex', '0');
    }
  }, {
    key: 'trapMenuFocus',
    value: function trapMenuFocus() {
      var lastTabbable = this.$menuLinks.last();
      var firstTabbable = this.$menuLinks.first();

      lastTabbable.on('keydown', function (e) {
        if (e.which === 9 && !e.shiftKey) {
          e.preventDefault();
          firstTabbable.focus();
        }
      });

      firstTabbable.on('keydown', function (e) {
        if (e.which === 9 && e.shiftKey) {
          e.preventDefault();
          lastTabbable.focus();
        }
      });
    }
  }, {
    key: 'toggleSearchBar',
    value: function toggleSearchBar(evt) {
      evt.preventDefault();

      if (this.$body.hasClass('js-search-open')) {
        this.$body.removeClass('js-search-open');
        $('.search-bar').find('a, input, button').attr('tabindex', '-1');
        this.$window.off('keydown.search');
      } else {
        this.$body.addClass('js-search-open');
        this.focusSearch();
        $('.search-bar').find('a, input, button').attr('tabindex', '0');
        this.$window.on('keydown.search', this.escSearch.bind(this));
      }

      this.toggleSearchText();
    }
  }, {
    key: 'escSearch',
    value: function escSearch(evt) {
      if (evt.which === 27) {
        evt.preventDefault();
        this.$body.removeClass('js-search-open');
        this.toggleSearchText();
      }
    }
  }, {
    key: 'focusSearch',
    value: function focusSearch() {
      if (this.$body.hasClass('js-header-in-view') && Modernizr.mobilesafari) {
        return;
      } else {
        $('.search-bar--main').find('.js-search-bar-input').focus();
      }
    }
  }, {
    key: 'toggleSearchText',
    value: function toggleSearchText() {
      if (this.$body.hasClass('js-search-open')) {
        this.$searchText.text('Close');
      } else {
        this.$searchText.text('Search');
      }
    }
  }, {
    key: 'searchRedirect',
    value: function searchRedirect(evt) {
      evt.preventDefault();
      this.$window.location.assign('/search/?term=' + this.$searchInput.val());
    }
  }, {
    key: 'onScroll',
    value: function onScroll() {
      this.scrollTop = this.$window.scrollTop();
      this.documentHeight = this.$document.height();
      this.windowWidth = this.$window.width();
      this.windowHeight = this.$window.height();
      this.headerHeight = this.$header.outerHeight();

      this.getScrollDirection();
      this.showHeader();
      this.closeSearch();
    }
  }, {
    key: 'getScrollDirection',
    value: function getScrollDirection() {
      var currentScroll = this.$window.pageYOffset;

      if (currentScroll > this.lastScroll && currentScroll >= 1) {
        this.direction = 'down';
      } else if (currentScroll < this.lastScroll && currentScroll <= this.documentHeight - this.windowHeight - 1) {
        this.direction = 'up';
      }

      this.lastScroll = currentScroll;
      return this.direction;
    }
  }, {
    key: 'showHeader',
    value: function showHeader() {
      if (this.$window.width() >= 768) {
        if (this.$window.scrollTop() <= this.headerHeight * 2) {
          this.$body.removeClass('js-header-in-view');
          $('.header-condensed').find('a, input, button').attr('tabindex', '-1');
        } else {
          this.$body.addClass('js-header-in-view');
          $('.header-condensed').find('a, input, button').attr('tabindex', '0');
        }
      }
    }
  }, {
    key: 'closeSearch',
    value: function closeSearch() {
      if (!Modernizr.mobilesafari) {
        this.$body.removeClass('js-search-open');
        this.toggleSearchText();
      }
    }
  }]);

  return Header;
}();

exports.default = Header;

},{"./helpers.js":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function throttle(func) {
  var _this = this;

  if (this.ticking) {
    window.requestAnimationFrame(function () {
      func.call(_this);
      _this.ticking = false;
    });
  }
  this.ticking = true;
}

exports.throttle = throttle;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InfiniteScroll = function () {
  function InfiniteScroll() {
    _classCallCheck(this, InfiniteScroll);

    this.container = $('.js-infinite-scroll');
    this.scrollTrigger = 0.80;
    this.isLoading = false;
    this.lastPage = false;

    this.init();
  }

  _createClass(InfiniteScroll, [{
    key: 'init',
    value: function init() {
      $(window).on('scroll', _helpers.throttle.bind(this, this.onScroll));
    }
  }, {
    key: 'onScroll',
    value: function onScroll() {
      var scrollTop = $(window).scrollTop();
      var documentHeight = $(document).height();
      var windowHeight = $(window).height();

      if (scrollTop / (documentHeight - windowHeight) > this.scrollTrigger) {

        if (this.lastPage === false && this.isLoading === false) {
          this.simulateAjaxCall();
        }
      }
    }
  }, {
    key: 'simulateAjaxCall',
    value: function simulateAjaxCall() {
      this.isLoading = true;
      this.container.addClass('js-loading');
      this.container.append('<div class="js-loading-message"><p class="js-loading-message-text">Loading more stories...</p></div>');

      if ($('.inside-penn-article__item').length > 30) {
        this.lastPage = true;
      }
      // to show the loading effect
      setTimeout(this.addMoreElements.bind(this), 1500);
    }
  }, {
    key: 'addMoreElements',
    value: function addMoreElements() {
      var exampleContent = ['<li class="inside-penn-article__item"><article class="inside-penn-article__content"><div class="inside-penn-article__image"><img src="/static/img/inside-penn-images/guttman-zheng.jpg" alt="Ambassador Zhang Qiyue speaking to President Amy Gutmann at a table."></div><p class="inside-penn-article__date">July 28, 2016</p><h2 class="inside-penn-article__head"><a class="inside-penn-article__link" href="https://www.flickr.com/photos/universityofpennsylvania/sets/72157671639608215" target="_blank">Gutmann Welcomes Chinese Dignitaries to Penn</a></h2><p class="inside-penn-article__summary">On July 27, President Amy Gutmann hosted Ambassador Zhang Qiyue, consul general of the People’s Republic of China in New York, and Education Counselor Xu Yongji to the University of Pennsylvania. They discussed the importance of U.S.-China collaboration and especially the critical role education plays in relations between the two countries.</p><p class="inside-penn-article__source">Full story at <a class="inside-penn-article__source-link" href="https://www.flickr.com/photos/universityofpennsylvania/sets/72157671639608215" target="_blank">Penn Flickr</a></p></article></li>', '<li class="inside-penn-article__item"><article class="inside-penn-article__content"><p class="inside-penn-article__date">December 20, 2016</p><h2 class="inside-penn-article__head"><a class="inside-penn-article__link" href="http://www.annenbergpublicpolicycenter.org/journalist-andrew-rosenthal-joins-appc-as-professional-in-residence/" target="_blank">Andrew Rosenthal Joins APPC as Professional in Residence</a></h2><p class="inside-penn-article__summary">Andrew Rosenthal, an op-ed columnist and former editor and correspondent for The New York Times, has joined the Annenberg Public Policy Center for the 2017 spring semester as a professional in residence. He’ll be writing a memoir about his life in journalism, from the pre-internet era to today.</p><p class="inside-penn-article__source">Full story at <a class="inside-penn-article__source-link" href="http://www.annenbergpublicpolicycenter.org/journalist-andrew-rosenthal-joins-appc-as-professional-in-residence/" target="_blank">Annenberg Policy Center →</a></p></li>', '<li class="inside-penn-article__item"><article class="inside-penn-article__content"><div class="inside-penn-article__image"><img src="http://sportslabs-webproxy.imgix.net/http%3A%2F%2Fstatic.silverchalice.co%2Fpenn-prod%2F2017%2F03%2F05%2F1488750795601-reeham_and_marie.jpg?fit=clip&amp;h=1065&amp;w=1600&amp;s=7e1b33bbfa33f31e556e69329fd9f8c1" alt=""></div><p class="inside-penn-article__date">March 6, 2017</p><h2 class="inside-penn-article__head"><a class="inside-penn-article__link" href="http://www.pennathletics.com/news/salah-and-stephan-earn-all-america-honors-for-women-s-squash-03-05-2017" target="_blank">Salah and Stephan Earn All-America Honors for Women\'s Squash</a></h2><p class="inside-penn-article__summary">Salah, who is a first-team All-America for a second-straight season, rattled off three victories before falling in the championship match. The sophomore began her run on Friday with a 3-0 win over Stanford’s Casey Wong. She followed with sweeps over Jenny Scherl of Yale and Kayley Leonard of Harvard on Saturday. Stephan posted a pair of victories before also dropping a matchup to Kennedy in the semifinals. Stephan had to comeback from two sets down to defeat Trinity’s Salma Alam Eldin in the first round before tallying a 3-0 win over the Bantams’ Raneem Sharaf.</p><p class="inside-penn-article__source">Full story at <a class="inside-penn-article__source-link" href="http://www.pennathletics.com/news/salah-and-stephan-earn-all-america-honors-for-women-s-squash-03-05-2017" target="_blank">Penn Athletics →</a></p></article></li>', '<li class="inside-penn-article__item"><article class="inside-penn-article__content"><p class="inside-penn-article__date">February 13, 2017</p><h2 class="inside-penn-article__head"><a class="inside-penn-article__link" href="http://www.pennathletics.com/news/hatler-runs-sub-four-minute-mile-men-s-dmr-wins-at-millrose-games-02-12-2017" target="_blank">Hatler Runs Sub-Four-Minute Mile, Men\'s DMR Wins at Millrose Games</a></h2><p class="inside-penn-article__summary">At the Millrose Games in New York, senior Chris Hatler became just the second Quaker ever to run a sub-four minute mile. The DMR team of Elias Graca, Calvary Rogers, Jeff Wiseman and Ross Wilson took home first place.</p><p class="inside-penn-article__source">Full story at <a class="inside-penn-article__source-link" href="http://www.pennathletics.com/news/hatler-runs-sub-four-minute-mile-men-s-dmr-wins-at-millrose-games-02-12-2017" target="_blank">Penn Athletics →</a></p></article></li>', '<li class="inside-penn-article__item"><article class="inside-penn-article__content"><p class="inside-penn-article__date">December 20, 2016</p><h2 class="inside-penn-article__head"><a class="inside-penn-article__link" href="http://www.annenbergpublicpolicycenter.org/journalist-andrew-rosenthal-joins-appc-as-professional-in-residence/" target="_blank">Andrew Rosenthal Joins APPC as Professional in Residence</a></h2><p class="inside-penn-article__summary">Andrew Rosenthal, an op-ed columnist and former editor and correspondent for The New York Times, has joined the Annenberg Public Policy Center for the 2017 spring semester as a professional in residence. He’ll be writing a memoir about his life in journalism, from the pre-internet era to today.</p><p class="inside-penn-article__source">Full story at <a class="inside-penn-article__source-link" href="http://www.annenbergpublicpolicycenter.org/journalist-andrew-rosenthal-joins-appc-as-professional-in-residence/" target="_blank">Annenberg Policy Center →</a></p></article></li>'];

      this.container.append(exampleContent);

      this.container.removeClass('js-loading');
      $('.js-loading-message').remove();
      this.isLoading = false;
    }
  }]);

  return InfiniteScroll;
}();

exports.default = InfiniteScroll;

},{"./helpers.js":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InsidePennScroll = function () {
  function InsidePennScroll() {
    _classCallCheck(this, InsidePennScroll);

    this.pageHeight = $(document).height();
    this.$window = $(window);
    this.fixedContent = $('.js-fixed-content');
    this.footer = $('.footer');

    this.init();
  }

  _createClass(InsidePennScroll, [{
    key: 'init',
    value: function init() {
      this.$window.on('scroll', _helpers.throttle.bind(this, this.stickElement));
    }
  }, {
    key: 'stickElement',
    value: function stickElement(containerHeight) {
      var footerOffset = this.footer.offset().top;

      if (footerOffset - this.$window.height() < this.$window.scrollTop()) {
        this.fixedContent.addClass('js-stick');
      } else {
        this.fixedContent.removeClass('js-stick');
      }
    }
  }]);

  return InsidePennScroll;
}();

exports.default = InsidePennScroll;

},{"./helpers.js":7}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModernizrDetect = function () {
  function ModernizrDetect() {
    _classCallCheck(this, ModernizrDetect);

    this.init();
  }

  _createClass(ModernizrDetect, [{
    key: 'init',
    value: function init() {
      this.detectMobileSafari();
      this.detectWindowsFirefox();
      this.detectIE11();
    }
  }, {
    key: 'detectMobileSafari',
    value: function detectMobileSafari() {
      Modernizr.addTest('mobilesafari', function () {
        return (/iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i.test(navigator.userAgent)
        );
      });
    }
  }, {
    key: 'detectWindowsFirefox',
    value: function detectWindowsFirefox() {
      Modernizr.addTest('windowsfirefox', function () {
        return (/Windows.+Firefox/i.test(navigator.userAgent)
        );
      });
    }
  }, {
    key: 'detectIE11',
    value: function detectIE11() {
      Modernizr.addTest('ie11', function () {
        return (/Trident.*rv:11\./i.test(navigator.userAgent)
        );
      });
    }
  }]);

  return ModernizrDetect;
}();

;

exports.default = ModernizrDetect;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Newsletter = function () {
  function Newsletter() {
    _classCallCheck(this, Newsletter);

    this.$newsletterForm = $('#newsletter-form');
    this.$emailField = $('.newsletter-form__email');
    this.$submitButton = $('.newsletter-form__submit');

    this.init();
  }

  _createClass(Newsletter, [{
    key: 'init',
    value: function init() {
      this.$emailField.on('input', this.inputOnChange.bind(this));
      this.$emailField.on('click', this.clearInput.bind(this));
      this.$newsletterForm.on('submit', this.newsletterOnSubmit.bind(this));
    }

    //  Submission
    //----------------------------------------------------------------------------

  }, {
    key: 'newsletterOnSubmit',
    value: function newsletterOnSubmit(evt) {
      evt.preventDefault();

      if (this.validateEmail()) {
        //before send so you can't submit more than once
        this.onBeforeSend();
        // send email
        this.onSuccess();
      } else {
        this.$newsletterForm.addClass('js-has-error');
        this.onError('Please input a valid email');
      }
    }

    //  Validation
    //----------------------------------------------------------------------------

  }, {
    key: 'validateEmail',
    value: function validateEmail() {
      return Boolean(this.$emailField.val().match(/[^@]+@[^@]+\.[a-z]/));
    }
  }, {
    key: 'clearInput',
    value: function clearInput() {
      this.$emailField.val('');
    }
  }, {
    key: 'inputOnChange',
    value: function inputOnChange(evt) {
      this.$newsletterForm.removeClass('js-has-error js-success');
      if (this.$submitButton.val() !== 'subscribe') this.$submitButton.val('subscribe');

      if (this.validateEmail()) {
        this.$submitButton.addClass('js-active');
      } else {
        this.$submitButton.removeClass('js-active');
      }
    }

    //  Submission Handler
    //----------------------------------------------------------------------------

  }, {
    key: 'onBeforeSend',
    value: function onBeforeSend() {
      this.$submitButton.attr('disabled', true);
    }
  }, {
    key: 'onError',
    value: function onError(txt) {
      this.$submitButton.attr('disabled', false).val('Whoops! Something doesn’t look quite right');;
      this.$newsletterForm.addClass('js-has-error');
    }
  }, {
    key: 'onSuccess',
    value: function onSuccess(res) {
      this.$submitButton.attr('disabled', false).val('subscribed!');
      this.$newsletterForm.addClass('js-success');
    }
  }]);

  return Newsletter;
}();

exports.default = Newsletter;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollLock = function () {
  function ScrollLock() {
    _classCallCheck(this, ScrollLock);

    this.locked = false;
    this.prevScroll = {
      scrollTop: $(window).scrollTop()
    };
  }

  _createClass(ScrollLock, [{
    key: "saveScroll",
    value: function saveScroll() {
      this.prevScroll = {
        scrollTop: $(window).scrollTop()
      };
    }
  }, {
    key: "toggleLock",
    value: function toggleLock() {
      this.locked = this.locked != true;

      if (this.locked) {
        this.saveScroll();
      }
    }
  }, {
    key: "scrollPosition",
    value: function scrollPosition() {
      var _this = this;
      $(window).scrollTop(_this.prevScroll.scrollTop);
    }
  }]);

  return ScrollLock;
}();

exports.default = ScrollLock;

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Search = function () {
  function Search() {
    _classCallCheck(this, Search);

    this.$searchForm = $('.js-search-page-form');
    this.$searchInput = $('.js-search-page-input');
    this.$numResults = $('.js-num-results');
    this.$filterOptions = $('.js-filter-option');
    this.$articles = $('.js-filterable .tease');
    this.$filterList = $('.filter-results__list');

    this.init();
  }

  _createClass(Search, [{
    key: 'init',
    value: function init() {
      var searchTerm = this.parseUrl('term');

      if (searchTerm) {
        this.$searchInput.val(decodeURIComponent(searchTerm));
      }
      this.$searchForm.submit(this.searchRedirect.bind(this));
      this.$searchInput.click(this.clearSearch.bind(this));

      var numArticles = this.$articles.length;
      this.$numResults.text(numArticles);

      this.$filterOptions.click(this.filter.bind(this));
    }
  }, {
    key: 'clearSearch',
    value: function clearSearch() {
      this.$searchInput.val('');
    }
  }, {
    key: 'searchRedirect',
    value: function searchRedirect(evt) {
      evt.preventDefault();
      window.location.assign('/search/?term=' + this.$searchInput.val());
    }
  }, {
    key: 'parseUrl',
    value: function parseUrl(name) {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results ? results[1] : 0;
    }
  }, {
    key: 'filter',
    value: function filter(evt) {
      evt.preventDefault();

      var $activeFilter = $(evt.target);
      var filterTerm = $activeFilter.text();

      this.$filterOptions.removeClass('js-active-filter');
      this.$articles.removeClass('js-filtered');

      var notMatchedArticlesArray = this.$articles.filter(function (i, article) {
        var category = $(article).find('.tease__category').text();
        return category !== filterTerm;
      });

      var numArticles = this.$articles.length - notMatchedArticlesArray.length;
      this.$numResults.text(numArticles);

      $activeFilter.addClass('js-active-filter');
      notMatchedArticlesArray.addClass('js-filtered');

      this.addFilterTag($activeFilter.text());
    }
  }, {
    key: 'addFilterTag',
    value: function addFilterTag(filterText) {
      var filterTagHTML = '<li class="filter-results__item"><span class="filter-results__label">Filter(s) applied:</span> <span class="filter-results__text">' + filterText + '</span>&nbsp;<div class="filter-results__clear">\xD7</div></li>';
      this.$filterList.html(filterTagHTML);

      $('.filter-results__item').click(this.removeFilters.bind(this));
    }
  }, {
    key: 'removeFilters',
    value: function removeFilters(evt) {
      this.$filterOptions.removeClass('js-active-filter');
      this.$articles.removeClass('js-filtered');

      this.$numResults.text(this.$articles.length);

      $('.filter-results__item').remove();
    }
  }]);

  return Search;
}();

;

exports.default = Search;

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slider = function () {
  function Slider() {
    _classCallCheck(this, Slider);

    this.$imageSlider = $('.slider--image');
    this.$newsSlider = $('.slider--news');

    this.breakpoint = {
      mobile: 500,
      mobileHoriz: 600,
      tablet: 768,
      tabletHoriz: 1080,
      desktop: 1200,
      desktopXl: 1440
    };

    this.init();
  }

  _createClass(Slider, [{
    key: 'init',
    value: function init() {
      this.$imageSlider.slick({
        dots: true,
        infinite: true
      });
      this.createNewsSlider();

      $(document).find('.slick-list').attr('tabindex', 0);
    }
  }, {
    key: 'createNewsSlider',
    value: function createNewsSlider() {
      this.$newsSlider.slick({
        centerMode: true,
        slidesToShow: 5,
        arrows: true,
        dots: true,

        responsive: [{

          breakpoint: this.breakpoint.desktopXl,
          settings: {
            centerMode: true,
            slidesToShow: 4
          }
        }, {

          breakpoint: this.breakpoint.desktop,
          settings: {
            centerMode: true,
            slidesToShow: 3
          }
        }, {

          breakpoint: this.breakpoint.tabletHoriz,
          settings: {
            centerMode: true,
            slidesToShow: 3
          }
        }, {

          breakpoint: this.breakpoint.tablet,
          settings: {
            centerMode: true,
            slidesToShow: 2,
            arrows: false
          }
        }, {

          breakpoint: this.breakpoint.mobileHoriz,
          settings: {
            centerMode: true,
            slidesToShow: 2,
            arrows: false
          }
        }, {

          breakpoint: this.breakpoint.mobile,
          settings: {
            centerMode: true,
            slidesToShow: 1,
            arrows: false
          }
        }]
      });
    }
  }]);

  return Slider;
}();

;

exports.default = Slider;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToggleDropdown = function () {
  function ToggleDropdown(el) {
    _classCallCheck(this, ToggleDropdown);

    this.$toggleClick = $(el);
    this.init();
  }

  _createClass(ToggleDropdown, [{
    key: 'init',
    value: function init() {
      this.$toggleClick.click(this.toggleFilter.bind(this));
    }
  }, {
    key: 'toggleFilter',
    value: function toggleFilter(evt) {
      var $activeItem = $(evt.target).parent();
      $activeItem.toggleClass('filter-list--in-view');

      var $activeContent = $activeItem.next();

      if ($activeItem.hasClass('filter-list--in-view')) {
        $activeContent.slideDown('fast');
      } else {
        $activeContent.slideUp('fast');
      }
    }
  }]);

  return ToggleDropdown;
}();

exports.default = ToggleDropdown;

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToggleNav = function () {
  function ToggleNav(el) {
    _classCallCheck(this, ToggleNav);

    this.toggleNav = $(el);
    this.init();
  }

  _createClass(ToggleNav, [{
    key: 'init',
    value: function init() {
      this.toggleNav.on('click', this.switchTabs.bind(this));
      $('.toggle-navigation__item').first().css({
        display: 'block'
      });
    }
  }, {
    key: 'switchTabs',
    value: function switchTabs(evt) {
      var $currentLink = $(evt.target);
      var $currentFilterItem = $currentLink.text();

      $('.js-toggle-nav li button').not($currentLink).removeClass('toggle-navigation__button--active');
      $currentLink.addClass('toggle-navigation__button--active');

      $('.toggle-navigation__item').removeClass('toggle-navigation__item--active');
      $('.toggle-navigation__item[data-toggle=\'' + $currentFilterItem + '\']').addClass('toggle-navigation__item--active');

      $('.toggle-navigation__item[data-toggle=\'' + $currentFilterItem + '\']').addClass('toggle-navigation__item--active');

      if ($('.js-toggle-fade[data-toggle-unactive=\'' + $currentFilterItem + '\']').length) {
        $('.js-toggle-fade[data-toggle-unactive=\'' + $currentFilterItem + '\']').addClass('toggle-item-fade--active');
      } else {
        $('.js-toggle-fade').removeClass('toggle-item-fade--active');
      }

      this.animateItems();
    }
  }, {
    key: 'animateItems',
    value: function animateItems() {
      $('.toggle-navigation__item').each(function (index, el) {
        if ($(this).hasClass('toggle-navigation__item--active')) {
          $(this).fadeIn('fast');
        } else {
          $(this).fadeOut('fast');
        }
      });
    }
  }]);

  return ToggleNav;
}();

exports.default = ToggleNav;

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Video = function () {
  function Video() {
    _classCallCheck(this, Video);

    this.video = $('.js-video');
    this.videoContainer = this.video.parent('.video-container');
    this.playButton = this.videoContainer.find('.js-play-video');

    this.init();
  }

  _createClass(Video, [{
    key: 'init',
    value: function init() {
      this.videoContainer.mouseenter(this.showControls.bind(this));
      this.videoContainer.mouseleave(this.hideControls.bind(this));
      this.playButton.click(this.togglePlay.bind(this));
    }
  }, {
    key: 'showControls',
    value: function showControls() {
      this.videoContainer.addClass('js-video--show-controls');
      this.video.attr('controls', 'controls');
    }
  }, {
    key: 'hideControls',
    value: function hideControls() {
      this.videoContainer.removeClass('js-video--show-controls');
      this.video.attr('controls', null);
    }
  }, {
    key: 'togglePlay',
    value: function togglePlay(evt) {
      var video = $(evt.target).parents('.video-container').find('video')[0];

      if (video.paused) {
        video.play();
        this.videoContainer.addClass('js-video--play');
      } else {
        video.pause();
        this.videoContainer.removeClass('js-video--play');
      }
    }
  }]);

  return Video;
}();

;

exports.default = Video;

},{}]},{},[1])
}(jQuery));


//# sourceMappingURL=main.js.map
