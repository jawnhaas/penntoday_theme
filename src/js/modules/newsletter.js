class Newsletter {
  constructor(){
    this.$newsletterForm = $('#newsletter-form');
    this.$emailField     = $('.newsletter-form__email');
    this.$submitButton   = $('.newsletter-form__submit');

    this.init();
  }

  init() {
    this.$emailField.on('input', this.inputOnChange.bind(this));
    this.$emailField.on('click', this.clearInput.bind(this));
    this.$newsletterForm.on('submit', this.newsletterOnSubmit.bind(this));
  }

  //  Submission
  //----------------------------------------------------------------------------

  newsletterOnSubmit(evt) {
    evt.preventDefault();

    if (this.validateEmail()) {
      //before send so you can't submit more than once
      this.onBeforeSend();
      // send email
      this.onSuccess();
    } else {
      this.$newsletterForm.addClass('js-has-error');
      this.onError('Please input a valid email');
    }
  }

  //  Validation
  //----------------------------------------------------------------------------

  validateEmail() {
    return Boolean(this.$emailField.val().match(/[^@]+@[^@]+\.[a-z]/));
  }

  clearInput() {
    this.$emailField.val('');
  }

  inputOnChange(evt) {
    this.$newsletterForm.removeClass('js-has-error js-success');
    if (this.$submitButton.val() !== 'subscribe') this.$submitButton.val('subscribe');

    if (this.validateEmail()) {
      this.$submitButton.addClass('js-active');
    } else {
      this.$submitButton.removeClass('js-active');
    }
  }

  //  Submission Handler
  //----------------------------------------------------------------------------
  onBeforeSend() {
    this.$submitButton.attr('disabled', true);
  }

  onError(txt) {
    this.$submitButton.attr('disabled', false).val('Whoops! Something doesn’t look quite right');;
    this.$newsletterForm.addClass('js-has-error');
  }

  onSuccess(res) {
    this.$submitButton.attr('disabled', false).val('subscribed!');
    this.$newsletterForm.addClass('js-success');
  }

}

export default Newsletter;
