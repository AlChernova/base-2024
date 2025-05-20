  import {computePosition, flip, shift, offset, autoUpdate} from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.7.0/+esm';
  /* import {computePosition, flip, shift, offset, autoUpdate} from '@floating-ui/dom'; */

  const swiper = new Swiper('#id-slider', {
  // Optional parameters
//   direction: 'vertical',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    type: "fraction", // если нужен вид "3 / 10"
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  /* scrollbar: {
    el: '.swiper-scrollbar',
  }, */
});

const button = document.querySelector('#button');
const tooltip = document.querySelector('#tooltip');
 
function update() { 
  computePosition(button, tooltip, {
    placement: 'bottom',
    middleware: [offset(8), flip(), shift({padding: 5})],
  }).then(({x, y, placement}) => {
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  });
}
function showTooltip() {
  tooltip.style.display = 'block';
  update();
}
 
function hideTooltip() {
  tooltip.style.display = '';
}
document.body.append(tooltip);
const cleanup = autoUpdate(
  button,
  tooltip,
  update,
);

/* [
  ['mouseenter', showTooltip],
  ['mouseleave', hideTooltip],
  ['focus', showTooltip],
  ['blur', hideTooltip],
].forEach(([event, listener]) => {
  button.addEventListener(event, listener);
}); */

button.addEventListener('click', () => {
   let expanded = button.getAttribute('aria-expanded') === 'true' || false;
  if (expanded) {
      button.setAttribute('aria-expanded', 'false');
    hideTooltip();
  } else {
   button.setAttribute('aria-expanded', 'true');
    showTooltip();
  }
});