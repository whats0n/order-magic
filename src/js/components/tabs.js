import { ACTIVE } from '../constants';

$('.js-tabs').each((i, container) => {
  container = $(container);
  const controls = container.find('.js-tabs-control');
  const contents = container.find('.js-tabs-content');

  controls.each((i, control) => {
    control = $(control);
    const content = contents.filter(`[data-tabs-content="${control.data('tabs-control')}"]`);

    control.click(e => {
      e.preventDefault();
      if (control.hasClass(ACTIVE)) return;
      controls
        .add(contents)
        .removeClass(ACTIVE);
      control
        .add(content)
        .addClass(ACTIVE);
    });
  });
});
