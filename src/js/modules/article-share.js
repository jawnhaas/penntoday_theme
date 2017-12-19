import { throttle } from './helpers.js';

class ArticleShare {
  constructor(selector) {
    this.$window           = $(window);
    this.selectableString = selector
    this.selectable       = $(selector);
    this.shareTool        = $('.js-share-tool');
    this.shareToolPos     = {minTop: window.innerHeight, minLeft: window.innerWidth, maxRight: 0, firstSelectLineLeft: null};

    this.init();
  }

  init() {
    document.addEventListener('selectionchange', throttle.bind(this, this.getSelectedRange));
    this.$window.on('scroll', throttle.bind(this, this.hideShareTool));
  }

  getSelectedRange() {
    if (this.$window.width() <= 768) {
      return;
    }

    this.shareTool.find('a').off();

    const selection = window.getSelection();
    this.$window.one('mousedown', function(evt){
      if(!$(evt.target).parents('.js-share-tool').length) {
        this.hideShareTool();
      }
    }.bind(this));

    const range = selection.rangeCount && selection.getRangeAt(0);

    if (!this.isSelectable(range)) {
      this.hideShareTool();
      return;
    }

    this.appendShareTool(range);
    this.applySelectedText(selection);
  }

  applySelectedText(selection) {
    if (selection) {
      let encodedSelectionText = encodeURI( window.getSelection().toString() );

      this.shareTool.find('.article__social-link--twitter').attr('href', `https://twitter.com/intent/tweet?text=${encodedSelectionText}`);
    }
  }

  appendShareTool(range) {
    let clientRects = range.getClientRects();
    this.shareToolPos = {
      minTop: window.innerHeight,
      minLeft: window.innerWidth,
      maxRight: 0
    };

    Object.keys(clientRects).forEach( function(key) {
      let rect = clientRects[key];

      if (key === '0') {
        this.shareToolPos.firstSelectLineLeft = rect.left
      }

      this.shareToolPos.minTop = Math.min( this.shareToolPos.minTop, rect.top);
      this.shareToolPos.minLeft = Math.min( this.shareToolPos.minLeft, rect.left);
      this.shareToolPos.maxRight = Math.max( this.shareToolPos.maxRight, rect.right);

    }.bind(this));

    const midPoint = (this.shareToolPos.maxRight-this.shareToolPos.minLeft)/2 + this.shareToolPos.minLeft;

    if ( this.shareToolPos.firstSelectLineLeft > midPoint ) {
      const shareToolWidth = parseInt(this.shareTool.css('width'));

      this.styleShareTool(this.shareToolPos.minTop, this.shareToolPos.firstSelectLineLeft + shareToolWidth/2);
    } else {
      this.styleShareTool(this.shareToolPos.minTop, midPoint);
    }
  }

  styleShareTool(minTop, midPoint) {
    const shareToolHeight = this.shareTool.css('height');
    const shareToolWidth = this.shareTool.css('width');

    this.shareTool.css({
      display: 'block',
      position: 'fixed',
      top: minTop - parseInt(shareToolHeight),
      left: midPoint - parseInt(shareToolWidth)/2
    })
  }

  hideShareTool() {
    this.shareTool.css('display', 'none');
  }

  isSelectable(range) {
    return range &&
    !range.collapsed &&
    range.getClientRects().length &&
    $(range.startContainer).parents(this.selectableString).length &&
    $(range.endContainer).parents(this.selectableString).length;
  }

}

export default ArticleShare;
