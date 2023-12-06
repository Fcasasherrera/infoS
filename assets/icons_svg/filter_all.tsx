import Svg, {Path} from 'react-native-svg';
import React from 'react';

export default function filter_all(props: any) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.77418 0.953841C8.40575 -0.0956173 9.92723 -0.0956154 10.5588 0.953842L12.5008 4.18084C12.5532 4.26785 12.6386 4.3299 12.7375 4.35281L16.4067 5.2026C17.6 5.47896 18.0701 6.92598 17.2672 7.85094L14.7983 10.6951C14.7317 10.7718 14.6991 10.8722 14.7079 10.9734L15.0335 14.7256C15.1394 15.9458 13.9085 16.8401 12.7807 16.3623L9.31278 14.8931C9.21928 14.8535 9.11371 14.8535 9.02021 14.8931L5.55228 16.3623C4.42447 16.8401 3.19357 15.9458 3.29947 14.7256L3.62511 10.9734C3.63389 10.8722 3.60127 10.7718 3.5347 10.6951L1.06577 7.85094C0.262839 6.92598 0.733005 5.47896 1.92626 5.2026L5.59545 4.35281C5.69437 4.3299 5.77978 4.26785 5.83214 4.18084L7.77418 0.953841ZM9.4878 1.59839C9.34205 1.3562 8.99094 1.3562 8.84519 1.59838L6.90315 4.82539C6.67626 5.20241 6.30617 5.47129 5.87749 5.57058L2.2083 6.42037C1.93293 6.48414 1.82443 6.81807 2.00972 7.03152L4.47866 9.87571C4.76712 10.208 4.90848 10.6431 4.87043 11.0815L4.54479 14.8337C4.52035 15.1153 4.80441 15.3216 5.06467 15.2114L8.5326 13.7422C8.93776 13.5705 9.39522 13.5705 9.80039 13.7422L13.2683 15.2114C13.5286 15.3216 13.8126 15.1153 13.7882 14.8337L13.4626 11.0815C13.4245 10.6431 13.5659 10.208 13.8543 9.87571L16.3233 7.03152C16.5086 6.81807 16.4001 6.48414 16.1247 6.42037L12.4555 5.57058C12.0268 5.47129 11.6567 5.20241 11.4298 4.82539L9.4878 1.59839Z"
        fill="#3B82EE"
      />
    </Svg>
  );
}
