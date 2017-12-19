class Search {
  constructor() {
    this.$searchForm    = $('.js-search-page-form');
    this.$searchInput   = $('.js-search-page-input');
    this.$numResults    = $('.js-num-results');
    this.$filterOptions = $('.js-filter-option');
    this.$articles      = $('.js-filterable .tease');
    this.$filterList    = $('.filter-results__list');

    this.init();
  }

  init() {
    let searchTerm = this.parseUrl('term');

    if (searchTerm) {
      this.$searchInput.val(decodeURIComponent(searchTerm));
    }
    this.$searchForm.submit( this.searchRedirect.bind(this) );
    this.$searchInput.click( this.clearSearch.bind(this) );

    let numArticles = this.$articles.length;
    this.$numResults.text(numArticles);

    this.$filterOptions.click( this.filter.bind(this) );

  }

  clearSearch() {
    this.$searchInput.val('');
  }

  searchRedirect(evt) {
    evt.preventDefault();
    window.location.assign(`/search/?term=${ this.$searchInput.val() }`);
  }

  parseUrl(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results ? results[1] : 0;
  }

  filter(evt) {
    evt.preventDefault();

    let $activeFilter = $(evt.target);
    let filterTerm = $activeFilter.text();

    this.$filterOptions.removeClass('js-active-filter');
    this.$articles.removeClass('js-filtered');

    let notMatchedArticlesArray = this.$articles.filter( (i, article) => {
      let category = $(article).find('.tease__category').text();
      return category !== filterTerm;
    });

    let numArticles = this.$articles.length - notMatchedArticlesArray.length;
    this.$numResults.text(numArticles);

    $activeFilter.addClass('js-active-filter');
    notMatchedArticlesArray.addClass('js-filtered');

    this.addFilterTag( $activeFilter.text() );
  }

  addFilterTag(filterText) {
    let filterTagHTML = `<li class="filter-results__item"><span class="filter-results__label">Filter(s) applied:</span> <span class="filter-results__text">${filterText}</span>&nbsp;<div class="filter-results__clear">×</div></li>`;
    this.$filterList.html(filterTagHTML);

    $('.filter-results__item').click( this.removeFilters.bind(this) );
  }

  removeFilters(evt) {
    this.$filterOptions.removeClass('js-active-filter');
    this.$articles.removeClass('js-filtered');

    this.$numResults.text( this.$articles.length );

    $('.filter-results__item').remove();
  }

};

export default Search;
