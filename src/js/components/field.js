import { ACTIVE } from '../constants';

$('.js-field').each((i, field) => {
  field = $(field);
  const input = field.find('.js-field-input');
  input.on({
    focus() {
      field.addClass(ACTIVE);
    },
    blur() {
      if (!input.val().length) field.removeClass(ACTIVE);
    }
  });
});
