import Slider from './modules/slider';
import Header from './modules/header';
import Search from './modules/search';
import ArticleNav from './modules/article-nav';
import ToggleNav from './modules/toggle-nav';
import InfiniteScroll from './modules/infinite-scroll';
import Video from './modules/video';
import Newsletter from './modules/newsletter';
import ArticleShare from './modules/article-share';
import DatePicker from './modules/datepicker';
import ToggleDropdown from './modules/toggle-dropdown';
import InsidePennScroll from './modules/inside-penn-scroll';
import ArticleGallery from './modules/article-gallery';
import ModernizrDetect from './modules/modernizr-detect';

// Responsive image support
window.lazySizesConfig = window.lazySizesConfig || {};
// lazysizes loads all elements after the window onload event
window.lazySizesConfig.preloadAfterLoad = true;

/**
 * Create and initialize global site instance when document is ready.
 */
(function ($) {
$( document ).ready(function() {
  new ModernizrDetect();
  new Header();

  if ( location.pathname.indexOf('/search/') >= 0 ) {
    new Search();
  }
  if ( location.pathname.indexOf('/article/') >= 0 ) {
    new ArticleShare('.article__body > *:not(".article__popular-stories, .article__reading-list")');
    new ArticleGallery('.img-container');
  }
  if ( location.pathname.indexOf('/inside-penn/') >= 0 ) {
    new InsidePennScroll();
  }
  if ( $('.js-filter-toggle').length ) {
    new ToggleDropdown('.js-filter-toggle');
  }
  if ( $('.slider').length ) {
    new Slider();
  }
  if ( $('.article-nav').length ) {
    new ArticleNav();
  }
  if( $('.js-toggle-nav') ) {
    new ToggleNav('.js-toggle-nav');
  }
  if ( $('.js-infinite-scroll').length ) {
    new InfiniteScroll();
  }
  if ( $('.video-container').length ) {
    new Video();
  }
  if ( $('.newsletter-callout').length ) {
    new Newsletter();
  }
  if ( $('.datepicker').length ) {
    new DatePicker();
  }
});
}(jQuery));
