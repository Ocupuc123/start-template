import tippy from 'tippy.js';

tippy('.tooltip-toggler', {
  content(reference) {
    const id = reference.getAttribute('data-template');
    const template = document.getElementById(id);
    return template.innerHTML;
  },
  allowHTML: true,
  theme: 'main',
  maxWidth: 500,
  arrow: false,
  placement: 'bottom-start',
});
