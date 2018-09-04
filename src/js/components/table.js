import 'owl.carousel';
import {ACTIVE} from '../constants';

$('[data-table-row]').each((i, row) => {
  row = $(row);
  const control = row.find('[data-table-edit]');
  const submit = row.find('[data-table-submit]');

  control.on('click', e => {
    e.preventDefault();
    row.toggleClass(ACTIVE);
  });

  let flag = true;

  submit.on('click', e => {
    e.preventDefault();
    if (!flag) return;
    flag = false;
    $('[data-loader]').addClass(ACTIVE);
    setTimeout(() => {
      $('[data-loader]').removeClass(ACTIVE);
      flag = true;
    }, 4000);
  });
});

let initialized = false;
const slider = $('[data-table-slider]');
const caption = $('[data-table-caption]');
const OWL = 'owl-carousel';
const prev = '<svg viewBox="0 0 80.5 137.1"><path d="M26.8 68.5l51.6-51.6c2.7-2.7 2.7-7.2 0-9.9l-5-5c-2.7-2.7-7.2-2.7-9.9 0L2.1 63.6c-2.7 2.7-2.7 7.2 0 9.9L63.6 135c2.7 2.7 7.2 2.7 9.9 0l5-5c2.7-2.7 2.7-7.2 0-9.9L26.8 68.5z"/></svg>';
const next = '<svg viewBox="0 0 80.5 137.1"><path d="M2.1 120.1c-2.7 2.7-2.7 7.2 0 9.9l5 5c2.7 2.7 7.2 2.7 9.9 0l61.5-61.5c2.7-2.7 2.7-7.2 0-9.9L17.1 2C14.4-.7 9.9-.7 7.2 2l-5 5c-2.7 2.7-2.7 7.2 0 9.9l51.6 51.6-51.7 51.6z"/></svg>';

const updateCaption = e => {
  const rows = $('[data-table-row]');
  const total = Math.max(
    ...rows
      .map((i, row) => +$(row).data('table-row') )
      .toArray()
  );
  const current = rows
    .filter((i, row) => $(row).closest('.active').length)
    .data('table-row') || 1;

  caption.text(`${current}/${total}`);
};

const options = {
  items: 1,
  loop: true,
  dots: false,
  nav: true,
  touchDrag: false,
  mouseDrag: false,
  navContainerClass: 'table__nav',
  navClass: ['table__prev', 'table__next'],
  navText: [prev, next],
  onTranslated: updateCaption,
  onInitialized: updateCaption
};

$(window).on('load resize', () => {

  const mediaWidth = window.matchMedia('(max-width: 620px)').matches;
  
  if (mediaWidth && !initialized) {
    initialized = true;
    slider
    	.addClass(OWL)
    	.owlCarousel(options);
  } else if (!mediaWidth && initialized) {
    initialized = false;
    slider
    	.removeClass(OWL)
    	.trigger('destroy.owl.carousel');
  }

});
