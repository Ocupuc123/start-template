import { Fancybox } from '@fancyapps/ui';

export const initFancybox = () => {
  Fancybox.bind('[data-fancybox]');

  const fancyboxLinks = document.querySelectorAll('a[data-fancybox][href*="vkvideo.ru"]');

  if (fancyboxLinks.length > 0) {
    fancyboxLinks.forEach((link) => {
      const originalHref = link.getAttribute('href');

      if (originalHref.includes('vkvideo.ru/video-') && originalHref.match(/video-\d+_\d+/)) {
        const ids = originalHref.match(/video-(\d+)_(\d+)/);
        const oid = ids[1];
        const vid = ids[2];

        const newHref = `https://vkvideo.ru/video_ext.php?oid=-${oid}&id=${vid}`;

        link.setAttribute('href', newHref);
      }
    });
  }
};
