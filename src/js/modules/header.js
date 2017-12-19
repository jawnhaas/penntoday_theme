import { throttle } from './helpers.js';

class Header {
  constructor() {
    this.$body          = $('body');
    this.$window        = $( window );
    this.$document      = $( document );
    this.$header        = $('.header');
    this.$searchOverlay = $('.search-bar__overlay');
    this.$menuButton    = $('.js-menu-toggle');
    this.$menuLinks     = $('.menu__overlay').find('a, button');
    this.$searchToggle  = $('.js-search-bar-toggle');
    this.$searchButton  = $('.js-search-bar-button');
    this.$searchInput   = $('.js-search-bar-input');
    this.$searchText    = $('.js-search-text');
    this.scrollItems    = $('.menu__main-nav-wrapper, .l-site-nav__events');
    this.headerHeight   = this.$header.outerHeight();
    this.lastScroll     = 0;
    this.scrollTop      = 0;
    this.documentHeight = 0;
    this.windowWidth    = 0;
    this.windowHeight   = 0;
    this.direction      = '';

    this.init();
  }

  init() {
    this.deactivateHiddenFocus();
    this.trapMenuFocus();

    this.$menuButton.click( this.toggleMenu.bind(this) );
    this.$searchOverlay.click( this.toggleSearchBar.bind(this) );
    this.$searchToggle.click( this.toggleSearchBar.bind(this) );
    this.$searchButton.click( this.searchRedirect.bind(this) );
    this.$window.on('scroll', throttle.bind(this, this.onScroll) );

    this.showHeader();
  }

  toggleMenu(evt) {
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

  escMenu(evt) {
    if (evt.which === 27) {
      evt.preventDefault();
      this.deactivateMenuFocus();
      this.$body.removeClass('js-menu-open');
    }
  }

  deactivateHiddenFocus() {
    this.deactivateMenuFocus();
    $('.header-condensed').find('a, input, button').attr('tabindex','-1');
    $('.search-bar').find('a, input, button').attr('tabindex','-1');
  }

  deactivateMenuFocus() {
    $('.menu__overlay .menu__close').attr('tabindex','-1');
    this.$menuLinks.attr('tabindex','-1');
  }

  activateMenuFocus() {
    $('.menu__overlay').attr('tabindex','0').focus();
    this.$menuLinks.attr('tabindex','0');
  }

  trapMenuFocus() {
    let lastTabbable = this.$menuLinks.last();
    let firstTabbable = this.$menuLinks.first();

    lastTabbable.on('keydown', function (e) {
      if ((e.which === 9 && !e.shiftKey)) {
        e.preventDefault();
        firstTabbable.focus();
      }
    });

    firstTabbable.on('keydown', function (e) {
      if ((e.which === 9 && e.shiftKey)) {
        e.preventDefault();
        lastTabbable.focus();
      }
    });
  }

  toggleSearchBar(evt) {
    evt.preventDefault();

    if (this.$body.hasClass('js-search-open')) {
      this.$body.removeClass('js-search-open');
      $('.search-bar').find('a, input, button').attr('tabindex','-1');
      this.$window.off('keydown.search');
    } else {
      this.$body.addClass('js-search-open');
      this.focusSearch();
      $('.search-bar').find('a, input, button').attr('tabindex','0');
      this.$window.on('keydown.search', this.escSearch.bind(this));
    }

    this.toggleSearchText();
  }

  escSearch(evt) {
    if (evt.which === 27) {
      evt.preventDefault();
      this.$body.removeClass('js-search-open');
      this.toggleSearchText();
    }
  }

  focusSearch() {
    if (this.$body.hasClass('js-header-in-view') && Modernizr.mobilesafari) {
      return;
    } else {
      $('.search-bar--main').find('.js-search-bar-input').focus();
    }
  }

  toggleSearchText() {
    if (this.$body.hasClass('js-search-open')) {
      this.$searchText.text('Close');
    } else {
      this.$searchText.text('Search');
    }
  }

  searchRedirect(evt) {
    evt.preventDefault();
    this.$window.location.assign(`/search/?term=${ this.$searchInput.val() }`);
  }

  onScroll() {
    this.scrollTop       = this.$window.scrollTop();
    this.documentHeight  = this.$document.height();
    this.windowWidth     = this.$window.width();
    this.windowHeight    = this.$window.height();
    this.headerHeight    = this.$header.outerHeight();

    this.getScrollDirection();
    this.showHeader();
    this.closeSearch();
  }

  getScrollDirection() {
    let currentScroll = this.$window.pageYOffset;

    if (currentScroll > this.lastScroll && currentScroll >= 1) {
      this.direction = 'down';
    }
    else if (currentScroll < this.lastScroll && currentScroll <= (this.documentHeight - this.windowHeight) - 1) {
      this.direction = 'up';
    }

    this.lastScroll = currentScroll;
    return this.direction;
  }

  showHeader() {
    if (this.$window.width() >= 768) {
      if (this.$window.scrollTop() <= (this.headerHeight * 2)) {
        this.$body.removeClass('js-header-in-view');
        $('.header-condensed').find('a, input, button').attr('tabindex','-1');

      } else {
        this.$body.addClass('js-header-in-view');
        $('.header-condensed').find('a, input, button').attr('tabindex','0');
      }
    }
  }

  closeSearch() {
    if (!Modernizr.mobilesafari) {
      this.$body.removeClass('js-search-open');
      this.toggleSearchText();
    }
  }
}

export default Header;
