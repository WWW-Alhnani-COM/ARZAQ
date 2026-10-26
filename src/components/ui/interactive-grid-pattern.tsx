/**
 * Interactive Grid Pattern — adapted from Magic UI (https://magicui.design/docs/components/interactive-grid-pattern)
 * Copyright (c) Magic UI
 * Licensed under the MIT License. Full text: https://github.com/magicuidesign/magicui/blob/main/LICENSE.md
 */
"use client"

import React, { useState } from "react"

/**
 * InteractiveGridPattern renders a responsive SVG grid with hoverable squares.
 */
interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  squares?: [number, number]
  className?: string
  squaresClassName?: string
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className = "",
  squaresClassName = "",
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null)

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      aria-hidden="true"
      className={[
        "pointer-events-auto absolute inset-0 h-full w-full border border-gray-400/30",
        className,
      ].filter(Boolean).join(" ")}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width
        const y = Math.floor(index / horizontal) * height
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={[
              "stroke-gray-400/30 transition-all duration-100 ease-in-out",
              hoveredSquare === index ? "fill-gray-300/30" : "fill-transparent",
              squaresClassName,
            ].filter(Boolean).join(" ")}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        )
      })}
    </svg>
  )
}

export default InteractiveGridPattern
