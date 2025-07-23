import { Fancybox } from '@fancyapps/ui';

export const initFancybox = () => {
  Fancybox.bind('[data-fancybox]', {
    mainStyle: {
      '--f-html-padding': '0',
    },
  });

  const vkLinks = document.querySelectorAll('a[data-fancybox][href*="vk.com"]');
  const rutubeLinks = document.querySelectorAll('a[data-fancybox][href*="rutube.ru"]');

  if (vkLinks.length > 0) {
    vkLinks.forEach((link) => {
      const originalHref = link.getAttribute('href');
      const ids = originalHref.match(/video-(\d+)_(\d+)/);
      const oid = ids[1];
      const vid = ids[2];
      const newHref = `https://vkvideo.ru/video_ext.php?oid=-${oid}&id=${vid}`;

      link.setAttribute('href', newHref);
      link.setAttribute('data-type', 'iframe');
      link.setAttribute('data-width', '900');
    });
  }

  if (rutubeLinks.length > 0) {
    rutubeLinks.forEach((link) => {
      const id = link.getAttribute('href').match(/video\/([a-zA-Z0-9]+)/)[1];
      const newHref = `https://rutube.ru/play/embed/${id}/`;

      link.setAttribute('href', newHref);
      link.setAttribute('data-type', 'iframe');
      link.setAttribute('data-width', '900');
    });
  }
};
