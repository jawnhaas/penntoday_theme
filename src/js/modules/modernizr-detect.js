class ModernizrDetect {
  constructor() {
    this.init();
  }

  init() {
    this.detectMobileSafari();
    this.detectWindowsFirefox();
    this.detectIE11();
  }

  detectMobileSafari() {
    Modernizr.addTest('mobilesafari', () => {
      return /iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i.test(navigator.userAgent);
    });
  }

  detectWindowsFirefox() {
    Modernizr.addTest('windowsfirefox', () => {
      return /Windows.+Firefox/i.test(navigator.userAgent);
    });
  }

  detectIE11() {
    Modernizr.addTest('ie11', () => {
      return /Trident.*rv:11\./i.test(navigator.userAgent);
    })
  }
};

export default ModernizrDetect;
