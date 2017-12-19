class Video {
  constructor() {
    this.video = $('.js-video');
    this.videoContainer = this.video.parent('.video-container');
    this.playButton = this.videoContainer.find('.js-play-video');

    this.init();
  }

  init() {
    this.videoContainer.mouseenter( this.showControls.bind(this) );
    this.videoContainer.mouseleave( this.hideControls.bind(this) );
    this.playButton.click( this.togglePlay.bind(this) );
  }

  showControls() {
    this.videoContainer.addClass('js-video--show-controls');
    this.video.attr('controls', 'controls')
  }

  hideControls() {
    this.videoContainer.removeClass('js-video--show-controls');
    this.video.attr('controls', null)
  }

  togglePlay(evt) {
    let video = $(evt.target).parents('.video-container').find('video')[0];

    if (video.paused) {
      video.play();
      this.videoContainer.addClass('js-video--play');
    } else {
      video.pause();
      this.videoContainer.removeClass('js-video--play');
    }
  }
};

export default Video;
