class ToggleNav {
  constructor(el) {
    this.toggleNav = $(el);
    this.init();
  }

  init() {
    this.toggleNav.on('click', this.switchTabs.bind(this));
    $('.toggle-navigation__item').first().css({
      display: 'block'
    });
  }

  switchTabs(evt) {
    let $currentLink = $(evt.target);
    let $currentFilterItem = $currentLink.text();

    $('.js-toggle-nav li button').not($currentLink).removeClass('toggle-navigation__button--active');
    $currentLink.addClass('toggle-navigation__button--active');

    $('.toggle-navigation__item').removeClass('toggle-navigation__item--active');
    $(`.toggle-navigation__item[data-toggle='${$currentFilterItem}']`).addClass('toggle-navigation__item--active');

    $(`.toggle-navigation__item[data-toggle='${$currentFilterItem}']`).addClass('toggle-navigation__item--active');

    if ($(`.js-toggle-fade[data-toggle-unactive='${$currentFilterItem}']`).length) {
      $(`.js-toggle-fade[data-toggle-unactive='${$currentFilterItem}']`).addClass('toggle-item-fade--active');
    } else {
      $('.js-toggle-fade').removeClass('toggle-item-fade--active');
    }

    this.animateItems();
  }

  animateItems() {
    $('.toggle-navigation__item').each(function(index, el) {
      if($(this).hasClass('toggle-navigation__item--active')) {
        $(this).fadeIn('fast');
      } else {
        $(this).fadeOut('fast');
      }
    });
  }
}

export default ToggleNav;
