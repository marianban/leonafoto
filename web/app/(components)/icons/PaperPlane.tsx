import { SVGProps } from 'react';

export const PaperPlane = (
  props: Omit<SVGProps<SVGSVGElement>, 'children'>,
) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path d="M476.6 3.8c18.7 10.5 28.6 31.7 24.8 52.8l-72 400c-2.8 15.5-13.7 28.2-28.5 33.4s-31.2 2.1-43.2-8l-116.8-96-67.2 76.8c-11.5 13.2-30 18-46.6 12.1S99 454.4 99 437V320L14.3 277.7c-14.9-7.4-24-22.7-23.3-39.3s11.2-31 26.6-37.1l432-192c19.4-8.6 41.3-7 57 4.5zM138.9 301.1l83.2 41.6L401.8 129.8 138.9 301.1zm-7.9 38.3v64.2l53.7-61.3-53.7-26.9z" />
    </svg>
  );
};
