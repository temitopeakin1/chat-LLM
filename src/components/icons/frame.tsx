import React from 'react';

interface FrameProps {
  className?: string;
}

const Frame: React.FC<FrameProps> = ({ className }) => {
  return (
    <svg
      width="57"
      height="56"
      viewBox="0 0 57 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <rect
        x="1.25"
        y="0.75"
        width="54.5"
        height="54.5"
        rx="27.25"
        stroke="#086224"
        strokeWidth="1.5"
      />
      <rect
        x="12.5"
        y="12"
        width="32"
        height="32"
        fill="url(#pattern0_51_8375)"
      />
      <defs>
        <pattern
          id="pattern0_51_8375"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_51_8375" transform="scale(0.00666667)" />
        </pattern>
        <image
          id="image0_51_8375"
          width="150"
          height="150"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default Frame;
