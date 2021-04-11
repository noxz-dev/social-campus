import { reactive } from 'vue';

const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

const getBreakpoint = (width: number) => {
  if (width >= screens['2xl']) return '2xl';
  if (width >= screens.xl) return 'xl';
  if (width >= screens.lg) return 'lg';
  if (width >= screens.md) return 'md';
  if (width >= screens.sm) return 'sm';
  return 'sm';
};

const debounce = function (func: () => void, wait: number) {
  let timeout: any;
  return () => {
    const later = () => {
      timeout = null;
    };
    const callNow = !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func();
  };
};

const breakpoints = reactive({
  w: window.innerWidth,
  h: window.innerHeight,
  is: getBreakpoint(window.innerWidth),
});

window.addEventListener(
  'resize',
  debounce(() => {
    // console.log(getBreakpoint(window.innerWidth))

    breakpoints.w = window.innerWidth;
    breakpoints.h = window.innerHeight;
    breakpoints.is = getBreakpoint(window.innerWidth);
  }, 0),
  false
);

export default breakpoints;
