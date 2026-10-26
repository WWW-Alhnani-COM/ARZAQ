/**
 * Interactive Grid Pattern — adapted from Magic UI (https://magicui.design/docs/components/interactive-grid-pattern)
 * Copyright (c) Magic UI
 * Licensed under the MIT License. Full text: https://github.com/magicuidesign/magicui/blob/main/LICENSE.md
 */
import { useState } from "react";

/**
 * Interactive SVG grid. Props: width, height, squares [horizontal, vertical],
 * className and squaresClassName.
 */
export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className = "",
  squaresClassName = "",
  ...props
}) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState(null);

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      aria-hidden="true"
      className={`pointer-events-auto absolute inset-0 h-full w-full border border-gray-400/20 ${className}`}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }, (_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={`stroke-gray-300/30 transition-all duration-100 ease-in-out ${hoveredSquare === index ? "fill-white/20" : "fill-transparent"} ${squaresClassName}`}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        );
      })}
    </svg>
  );
}

export default InteractiveGridPattern;
