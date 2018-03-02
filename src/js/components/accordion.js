import {ACTIVE} from '../constants';


$('[data-accordion-item]').each((i, accordion) => {
  accordion = $(accordion);
  const control = accordion.find('[data-accordion-control]');
  const content = accordion.find('[data-accordion-content]');

  control.on('click', e => {
    e.preventDefault();
    control.toggleClass(ACTIVE);
    content
    	.stop(true, true, true)
    	.slideToggle(400);
  });
});
