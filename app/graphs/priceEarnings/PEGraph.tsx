"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { appleData } from "./data";

interface Data {
  date: Date;
  ratio: number;
}

// TODO:
// - add labels
// - improve styling (curved transition + colours)
// - caption + heading
// - function for adding data
// - add more companies

const PEGraph = () => {
  const gx = useRef(null);
  const gy = useRef(null);

  // set the dimensions and margins of the graph
  const margin = { top: 40, right: 30, bottom: 70, left: 60 },
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const data: Data[] = appleData.map((data): Data => {
    return {
      date: d3.timeParse("%Y-%m-%d")(data.date)!,
      ratio: +data.ratio,
    };
  });

  const x = d3
    .scaleTime()
    .range([margin.left, width - margin.right])
    .domain(d3.extent(data, (d) => new Date(d.date)) as [Date, Date])
    .nice();

  const y = d3
    .scaleLinear()
    .range([height - margin.bottom, margin.top])
    .domain([0, d3.max(data, (d) => d.ratio) as number])
    .nice();

  useEffect(() => {
    if (gx.current) {
      d3.select<SVGGElement, unknown>(gx.current).call(d3.axisBottom(x));
    }
  }, [gx, x]);

  useEffect(() => {
    if (gy.current) {
      d3.select<SVGGElement, unknown>(gy.current).call(d3.axisLeft(y));
    }
  }, [gy, y]);

  const line = d3
    .line<Data>()
    .x((d) => x(d.date))
    .y((d) => y(d.ratio));

  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - margin.bottom})`} />
      <g ref={gy} transform={`translate(${margin.left},0)`} />
      <path
        d={line(data) || undefined}
        fill="none"
        stroke="steelblue"
        strokeWidth="1.5"
      />
      <text
        x={width - margin.right}
        y={y(data[data.length - 1].ratio)}
        dy="-5.5em"
        textAnchor="end"
        fill="steelblue"
      >
        Apple
      </text>
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(d.date)} cy={y(d.ratio)} r="2.5" />
        ))}
      </g>
    </svg>
  );
};

export default PEGraph;
