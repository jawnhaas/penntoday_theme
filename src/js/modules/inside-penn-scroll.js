import { throttle } from './helpers.js';

class InsidePennScroll {
  constructor() {
    this.pageHeight   = $(document).height();
    this.$window      = $(window);
    this.fixedContent = $('.js-fixed-content');
    this.footer       = $('.footer');

    this.init();
  }

  init() {
    this.$window.on('scroll', throttle.bind(this, this.stickElement));
  }

  stickElement(containerHeight) {
    let footerOffset = this.footer.offset().top;

    if ((footerOffset - this.$window.height()) < this.$window.scrollTop()) {
      this.fixedContent.addClass('js-stick');
    } else {
      this.fixedContent.removeClass('js-stick');
    }
  }
}

export default InsidePennScroll;
