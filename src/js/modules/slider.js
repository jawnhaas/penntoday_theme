class Slider {
  constructor() {
    this.$imageSlider = $('.slider--image');
    this.$newsSlider  = $('.slider--news');

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

  init() {
    this.$imageSlider.slick({
      dots: true,
      infinite: true,
    });
    this.createNewsSlider();

    $(document).find('.slick-list').attr('tabindex', 0);
  }

  createNewsSlider() {
    this.$newsSlider.slick({
      centerMode: true,
      slidesToShow: 5,
      arrows: true,
      dots: true,

      responsive: [{

        breakpoint: this.breakpoint.desktopXl,
        settings: {
          centerMode: true,
          slidesToShow: 4,
        }
      }, {

        breakpoint: this.breakpoint.desktop,
        settings: {
          centerMode: true,
          slidesToShow: 3,
        }
      }, {

        breakpoint: this.breakpoint.tabletHoriz,
        settings: {
          centerMode: true,
          slidesToShow: 3,
        }
      }, {

        breakpoint: this.breakpoint.tablet,
        settings: {
          centerMode: true,
          slidesToShow: 2,
          arrows: false,
        }
      }, {

        breakpoint: this.breakpoint.mobileHoriz,
        settings: {
          centerMode: true,
          slidesToShow: 2,
          arrows: false,
        }
      }, {

        breakpoint: this.breakpoint.mobile,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          arrows: false,
        }
      }]
    });
  }

};

export default Slider;
