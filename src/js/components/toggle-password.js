import {ACTIVE} from '../constants';

$('.js-toggle-password').each((i, container) => {
  container = $(container);
  const control = container.find('.js-toggle-password-control');
  const input = container.find('.js-toggle-password-input');
  let active = false;

  control.click(e => {
    e.preventDefault();
    active = !active;
    if (active) {
      control.addClass(ACTIVE);
      input.attr('type', 'text');
    } else {
      control.removeClass(ACTIVE);
      input.attr('type', 'password');
    }
  });
});
