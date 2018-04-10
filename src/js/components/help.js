import 'slick-carousel';

const getSliderArrow = (className, direction, icon) => `<button class="${className}__arrow ${className}__${direction}">${icon}</button>`;
const prev = '<svg viewBox="0 0 129 129" enable-background="new 0 0 129 129"><path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z"/></svg>';
const next = '<svg viewBox="0 0 129 129" enable-background="new 0 0 129 129"><path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"/></svg>';

$('.js-slider').slick({
  prevArrow: getSliderArrow('v-help', 'prev', prev),
  nextArrow: getSliderArrow('v-help', 'next', next),
  dots: true,
  dotsClass: 'v-help__dots',
  fade: true
});
