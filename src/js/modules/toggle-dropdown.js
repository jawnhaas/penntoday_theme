class ToggleDropdown {
  constructor(el) {
    this.$toggleClick = $(el);
    this.init();
  }

  init() {
    this.$toggleClick.click( this.toggleFilter.bind(this) );
  }

  toggleFilter(evt) {
    let $activeItem = $(evt.target).parent();
    $activeItem.toggleClass('filter-list--in-view');

    let $activeContent = $activeItem.next();

    if ($activeItem.hasClass('filter-list--in-view')) {
      $activeContent.slideDown('fast');
    } else {
      $activeContent.slideUp('fast');
    }
  }
}

export default ToggleDropdown;
