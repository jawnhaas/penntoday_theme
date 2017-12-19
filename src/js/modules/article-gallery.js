import ScrollLock from './scroll-lock';

class ArticleGallery {
  constructor(imageSelector) {
    this.$window      = $(window);
    this.$body        = $('body');
    this.$page        = $('.page');
    this.$gallery     = $('.js-article-gallery');
    this.$images      = $(imageSelector);
    this.currentSlide = 0;
    this.scrollLock   = new ScrollLock();
    this.init();
  }

  init() {
    this.$images.click( this.createGallery.bind(this) );
    this.setImageIndex();
  }

  setImageIndex() {
    this.$images.each(function(index, el) {
      $(this).attr('data-index', index);
    });
  }

  createGallery(evt) {
    if (!this.$gallery.length) {
      const galleryClose = '<div class="gallery__close-svg"><svg viewBox="0 0 25 25"><polygon fill="#FFFFFF" fill-rule="evenodd" points="40.712 455.057 51.114 465.459 49.459 467.114 39.057 456.712 28.655 467.112 27 465.457 37.402 455.057 27.002 444.655 28.658 443 39.057 453.402 49.459 443 51.114 444.655" transform="translate(-27 -443)"/></svg></div>';
      const galleryImageWrapper = '<div class="js-gallery-slider"></div>';
      const galleryHeadline = `<h2 class="article-gallery__headline">${$('.article__header').text()}</h2>`;
      const galleryContainer = `<section class="js-article-gallery article-gallery">${galleryClose}<div class="article-gallery__container">${galleryImageWrapper}</div></section>`;


      this.$page.append(galleryContainer);
      this.$gallery = $('.js-article-gallery');
      this.currentSlide = $(evt.currentTarget).data('index');
    }

    $('.gallery__close-svg').click(this.closeGallery.bind(this));

    this.cloneImages();
    setTimeout( this.initializeSlider.bind(this), 50);
  }

  cloneImages() {
    let clonedImages = this.$images.clone();
    clonedImages.removeAttr('class').addClass('img-container').find('img').removeAttr('class').addClass('lazyload blur-up');
    clonedImages.find('noscript').remove();

    clonedImages.appendTo('.js-gallery-slider');
  }

  initializeSlider() {
    let gallerySlider = this.$gallery.find('.js-gallery-slider');
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

    this.$window.resize(() => {this.$gallery.find('.js-gallery-slider').slick('setPosition')});
    this.$window.on('keydown.gallery', this.escGallery.bind(this));

    this.objectFitPolyfill();
    this.addHoverArrows();
  }

  objectFitPolyfill() {
    if ( !Modernizr.objectfit ) {
      this.$gallery.find('.img-container').each( function() {
        let $container = $(this);
        let $img = $container.find('img');
        let imgUrl = '';

        if ($img.attr('data-srcset')) {
          imgUrl = $img.attr('data-srcset').split(",");
          imgUrl = imgUrl[imgUrl.length-1].trim().split(" ")[0];
        }
        else {
          imgUrl = $img.prop('src');
        }

        if (imgUrl) {
          $container
          .addClass('js-object-fit')
          .prepend('<div class="js-img"></div>');

          $container.find('.js-img')
          .css('backgroundImage', 'url(' + imgUrl + ')');
        }
      });
    }
  }

  addHoverArrows() {
    this.$gallery.find('.img-container').each( function() {
      let $container = $(this);
      let $prevHoverSpan = '<span class="js-hover-arrow prev-arrow"></span>'
      let $nextHoverSpan = '<span class="js-hover-arrow next-arrow"></span>'

      $container.prepend($prevHoverSpan);
      $container.append($nextHoverSpan);

      $container.find('.prev-arrow').click( () => { $('.slick-prev').click() });
      $container.find('.next-arrow').click( () => { $('.slick-next').click() });
    })
  }

  closeGallery() {
    this.$gallery.find('.js-gallery-slider').slick('unslick');
    this.$gallery.remove();
    this.$gallery = [];
    this.$body.removeClass('js-gallery-active');
    this.scrollLock.scrollPosition();
    this.$window.off('keydown.gallery');
  }

  escGallery(evt) {
    if (evt.which === 27) {
      evt.preventDefault();
      this.closeGallery();
    }
  }

}

export default ArticleGallery;
