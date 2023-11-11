import AOS from 'aos';

AOS.init({
  disable: 'phone', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  duration: 1000, // values from 0 to 3000, with step 50ms
  once: true, // whether animation should happen only once - while scrolling down
  offset: 300,
});

