(function ($, Drupal) {
  Drupal.behaviors.customCKEditorConfig = {
    attach: function (context, settings) {
      if (typeof CKEDITOR !== "undefined") {
        CKEDITOR.config.bodyClass = 'article__body';
        console.log('here');
      }
    }
  }
})(jQuery, Drupal);
