import { throttle } from './helpers.js';

class InfiniteScroll {
  constructor() {
    this.container     = $('.js-infinite-scroll');
    this.scrollTrigger = 0.80;
    this.isLoading     = false;
    this.lastPage      = false;

    this.init();
  }

  init() {
    $(window).on('scroll', throttle.bind(this, this.onScroll));
  }

  onScroll() {
    let scrollTop      = $(window).scrollTop();
    let documentHeight = $(document).height();
    let windowHeight   = $(window).height();

    if ((scrollTop / (documentHeight - windowHeight)) > this.scrollTrigger) {

      if (this.lastPage === false && this.isLoading === false) {
        this.simulateAjaxCall();
      }
    }
  }

  simulateAjaxCall() {
    this.isLoading = true;
    this.container.addClass('js-loading');
    this.container.append('<div class="js-loading-message"><p class="js-loading-message-text">Loading more stories...</p></div>')

    if ($('.inside-penn-article__item').length > 30) {
      this.lastPage = true;
    }
    // to show the loading effect
    setTimeout( this.addMoreElements.bind(this), 1500 );
  }

  addMoreElements() {
    let exampleContent = [
    '<li class="inside-penn-article__item"><article class="inside-penn-article__content"><div class="inside-penn-article__image"><img src="/static/img/inside-penn-images/guttman-zheng.jpg" alt="Ambassador Zhang Qiyue speaking to President Amy Gutmann at a table."></div><p class="inside-penn-article__date">July 28, 2016</p><h2 class="inside-penn-article__head"><a class="inside-penn-article__link" href="https://www.flickr.com/photos/universityofpennsylvania/sets/72157671639608215" target="_blank">Gutmann Welcomes Chinese Dignitaries to Penn</a></h2><p class="inside-penn-article__summary">On July 27, President Amy Gutmann hosted Ambassador Zhang Qiyue, consul general of the People’s Republic of China in New York, and Education Counselor Xu Yongji to the University of Pennsylvania. They discussed the importance of U.S.-China collaboration and especially the critical role education plays in relations between the two countries.</p><p class="inside-penn-article__source">Full story at <a class="inside-penn-article__source-link" href="https://www.flickr.com/photos/universityofpennsylvania/sets/72157671639608215" target="_blank">Penn Flickr</a></p></article></li>',
    '<li class="inside-penn-article__item"><article class="inside-penn-article__content"><p class="inside-penn-article__date">December 20, 2016</p><h2 class="inside-penn-article__head"><a class="inside-penn-article__link" href="http://www.annenbergpublicpolicycenter.org/journalist-andrew-rosenthal-joins-appc-as-professional-in-residence/" target="_blank">Andrew Rosenthal Joins APPC as Professional in Residence</a></h2><p class="inside-penn-article__summary">Andrew Rosenthal, an op-ed columnist and former editor and correspondent for The New York Times, has joined the Annenberg Public Policy Center for the 2017 spring semester as a professional in residence. He’ll be writing a memoir about his life in journalism, from the pre-internet era to today.</p><p class="inside-penn-article__source">Full story at <a class="inside-penn-article__source-link" href="http://www.annenbergpublicpolicycenter.org/journalist-andrew-rosenthal-joins-appc-as-professional-in-residence/" target="_blank">Annenberg Policy Center →</a></p></li>',
    '<li class="inside-penn-article__item"><article class="inside-penn-article__content"><div class="inside-penn-article__image"><img src="http://sportslabs-webproxy.imgix.net/http%3A%2F%2Fstatic.silverchalice.co%2Fpenn-prod%2F2017%2F03%2F05%2F1488750795601-reeham_and_marie.jpg?fit=clip&amp;h=1065&amp;w=1600&amp;s=7e1b33bbfa33f31e556e69329fd9f8c1" alt=""></div><p class="inside-penn-article__date">March 6, 2017</p><h2 class="inside-penn-article__head"><a class="inside-penn-article__link" href="http://www.pennathletics.com/news/salah-and-stephan-earn-all-america-honors-for-women-s-squash-03-05-2017" target="_blank">Salah and Stephan Earn All-America Honors for Women\'s Squash</a></h2><p class="inside-penn-article__summary">Salah, who is a first-team All-America for a second-straight season, rattled off three victories before falling in the championship match. The sophomore began her run on Friday with a 3-0 win over Stanford’s Casey Wong. She followed with sweeps over Jenny Scherl of Yale and Kayley Leonard of Harvard on Saturday. Stephan posted a pair of victories before also dropping a matchup to Kennedy in the semifinals. Stephan had to comeback from two sets down to defeat Trinity’s Salma Alam Eldin in the first round before tallying a 3-0 win over the Bantams’ Raneem Sharaf.</p><p class="inside-penn-article__source">Full story at <a class="inside-penn-article__source-link" href="http://www.pennathletics.com/news/salah-and-stephan-earn-all-america-honors-for-women-s-squash-03-05-2017" target="_blank">Penn Athletics →</a></p></article></li>',
    '<li class="inside-penn-article__item"><article class="inside-penn-article__content"><p class="inside-penn-article__date">February 13, 2017</p><h2 class="inside-penn-article__head"><a class="inside-penn-article__link" href="http://www.pennathletics.com/news/hatler-runs-sub-four-minute-mile-men-s-dmr-wins-at-millrose-games-02-12-2017" target="_blank">Hatler Runs Sub-Four-Minute Mile, Men\'s DMR Wins at Millrose Games</a></h2><p class="inside-penn-article__summary">At the Millrose Games in New York, senior Chris Hatler became just the second Quaker ever to run a sub-four minute mile. The DMR team of Elias Graca, Calvary Rogers, Jeff Wiseman and Ross Wilson took home first place.</p><p class="inside-penn-article__source">Full story at <a class="inside-penn-article__source-link" href="http://www.pennathletics.com/news/hatler-runs-sub-four-minute-mile-men-s-dmr-wins-at-millrose-games-02-12-2017" target="_blank">Penn Athletics →</a></p></article></li>',
    '<li class="inside-penn-article__item"><article class="inside-penn-article__content"><p class="inside-penn-article__date">December 20, 2016</p><h2 class="inside-penn-article__head"><a class="inside-penn-article__link" href="http://www.annenbergpublicpolicycenter.org/journalist-andrew-rosenthal-joins-appc-as-professional-in-residence/" target="_blank">Andrew Rosenthal Joins APPC as Professional in Residence</a></h2><p class="inside-penn-article__summary">Andrew Rosenthal, an op-ed columnist and former editor and correspondent for The New York Times, has joined the Annenberg Public Policy Center for the 2017 spring semester as a professional in residence. He’ll be writing a memoir about his life in journalism, from the pre-internet era to today.</p><p class="inside-penn-article__source">Full story at <a class="inside-penn-article__source-link" href="http://www.annenbergpublicpolicycenter.org/journalist-andrew-rosenthal-joins-appc-as-professional-in-residence/" target="_blank">Annenberg Policy Center →</a></p></article></li>'
    ]

    this.container.append(exampleContent);

    this.container.removeClass('js-loading');
    $('.js-loading-message').remove();
    this.isLoading = false;
  }

}

export default InfiniteScroll;
