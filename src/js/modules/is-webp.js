import supportsWebP from 'supports-webp';

const isWebp = () => {
  supportsWebP.then((supported) => {
    if (supported) {
      document.documentElement.classList.add('webp');
    } else {
      document.documentElement.classList.add('no-webp');
    }
  });
};

export { isWebp };
