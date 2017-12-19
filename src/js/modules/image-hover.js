class ImageHover {
  constructor() {
    this.$imageHoverSections = $('.js-image-hover');

    this.init();
  }

  init() {
    this.$imageHoverSections.mousemove( this.showImageOnHover )
      .hover( this.showImage, this.removeImage );
  }

  showImageOnHover(evt) {
    let $hoveredTopic = $(this);

    if ($hoveredTopic.hasClass('show-image')) {
      let $hoverImage = $hoveredTopic.find('.js-img-follow');
      $hoverImage.css({
        'left': evt.clientX + 'px',
        'top': evt.clientY + 'px'
      });
    }
  }

  showImage() {
    $(this).addClass('show-image');
  }

  removeImage() {
    $(this).removeClass('show-image');
  }

}

export default ImageHover;
