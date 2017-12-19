class ScrollLock {
  constructor() {
    this.locked = false;
    this.prevScroll = {
      scrollTop: $(window).scrollTop()
    }
  }

  saveScroll() {
    this.prevScroll = {
      scrollTop: $(window).scrollTop()
    };
  }

  toggleLock() {
    this.locked = this.locked != true;

    if(this.locked){
      this.saveScroll();
    }
  }

  scrollPosition() {
    let _this = this;
    $(window).scrollTop(_this.prevScroll.scrollTop);
  }
}

export default ScrollLock;
