import {OPEN, ACTIVE, BODY} from '../constants';

const selects = $('[data-select]');

selects.each((i, select) => {
  select = $(select);
  const otherSelects = selects.not(select);
  const value = select.find('[data-select-value]');
  const options = select.find('[data-select-option]');

  value.on('click', e => {
    otherSelects.removeClass(OPEN);
    select.toggleClass(OPEN);
  });
  value.text(options.first().text());

  options.each((i, option) => {
    option = $(option);
    const otherOptions = options.not(option);
    const text = option.text();

    option.on('click', e => {
      select.removeClass(OPEN);
      otherOptions.removeClass(ACTIVE);
      option.addClass(ACTIVE);
      value.text(text);
    });
  });
});

BODY.on('click', e => {
  if ($(e.target).closest(selects).length || !selects.hasClass(OPEN)) return;
  selects.removeClass(OPEN);
});
