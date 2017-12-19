import { throttle } from './helpers.js';

class ArticleNav {
  constructor() {
    this.init();
  }

  init() {
    this.$body            = $('body');
    this.$articleBody     = $('.article__wrapper');
    this.$progessBar      = $('.js--progress-bar');
    this.$progressHidden  = $('.js--progress-bar span');
    this.$articleNav      = $('.article-nav');
    this.$header          = $('.header');

    this.headerHeight     = 0;
    this.articleHeight    = 0;
    this.articleTop       = 0;

    this.lastScroll       = 0;
    this.scrollTop        = 0;
    this.documentHeight   = 0;
    this.windowWidth      = $(window).width();
    this.windowHeight     = $(window).height();
    this.direction        = '';

    this.hasRecirc = false;

    this.bindEvents();
    this.setTrackerHeight();
  }

  bindEvents() {
    $(window).on('scroll', throttle.bind(this, this.onScroll));
  }

  onScroll() {
    this.scrollTop       = $(window).scrollTop();
    this.documentHeight  = $(document).height();
    this.windowWidth     = $(window).width();
    this.windowHeight    = $(window).height();
    this.articleHeight   = this.$articleBody.height();
    this.articleTop      = this.$articleBody.offset().top;
    this.headerHeight    = this.$header.outerHeight() * 2;

    this.getScrollDirection();
    this.getScrollProgress();
    this.toggleNav();
  }

  setTrackerHeight() {
    $('.article__related').length ? this.hasRecirc = true : this.hasRecirc = false;
  }

  getScrollProgress() {
    let currentY = this.scrollTop - this.$articleBody.offset().top,
        scrollPercent;

    if(this.hasRecirc) {
      scrollPercent = parseFloat((currentY / (this.articleHeight - this.windowHeight / 2) * 100).toFixed(4));
    } else {
      scrollPercent = parseFloat((currentY / (this.articleHeight - this.windowHeight) * 100).toFixed(4));
    }

    if(this.scrollTop > this.articleTop && (this.articleTop + this.articleHeight) > this.scrollTop) {
      this.$progessBar.css({
        width: `${scrollPercent}%`
      });
      this.$progressHidden.text(`${scrollPercent}%`);
    } else if(this.scrollTop < (this.articleTop - this.windowHeight / 2)) {
      this.$progessBar.css({
        width: '0%'
      });
    } else if(this.scrollTop > this.articleTop) {
      this.$progessBar.css({
        width: '100%'
      });
    }
  }

  getScrollDirection() {
    let currentScroll = window.pageYOffset;

    if (currentScroll > this.lastScroll && currentScroll >= 1){
      this.direction = 'down';
    }
    else if (currentScroll < this.lastScroll && currentScroll <= (this.documentHeight - this.windowHeight) - 1){
      this.direction = 'up';
    }

    this.lastScroll = currentScroll;
    return this.direction;
  }

  toggleNav() {
    let trackerEnd;

    if(this.hasRecirc) {
      trackerEnd = this.articleTop + (this.articleHeight - this.windowHeight / 2);
    } else {
      trackerEnd = this.articleTop + (this.articleHeight - this.windowHeight);
    }

    if(this.direction == 'down') {
      if(this.scrollTop > (this.headerHeight) && (trackerEnd) > this.scrollTop) {
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
}

export default ArticleNav;
