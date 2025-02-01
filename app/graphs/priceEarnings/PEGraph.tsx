"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { appleData, googleData, microsoftData, PEData } from "./data";
import styles from "./Graph.module.scss";
import PELine from "./PELine";

export interface Data {
  date: Date;
  ratio: number;
}

// TODO:
// - add labels
// - caption + heading
// - add more companies

const PEGraph = () => {
  const gx = useRef(null);
  const gy = useRef(null);

  const formatData = (data: PEData): Data[] => {
    return data.map((d): Data => {
      return {
        date: d3.timeParse("%Y-%m-%d")(d.date)!,
        ratio: +d.ratio,
      };
    });
  };

  // set the dimensions and margins of the graph
  const margin = { top: 40, right: 30, bottom: 70, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  const formattedAppleData = formatData(appleData);
  const formattedGoogleData = formatData(googleData);
  const formattedMicrosoftData = formatData(microsoftData);
  // Used to calculate domain ranges
  const formattedAllData = [
    ...formattedAppleData,
    ...formattedGoogleData,
    ...formattedMicrosoftData,
  ];

  const x = d3
    .scaleTime()
    .range([margin.left, width - margin.right])
    .domain(
      d3.extent(formattedAllData, (d) => new Date(d.date)) as [Date, Date]
    )
    .nice();

  const y = d3
    .scaleLinear()
    .range([height - margin.bottom, margin.top])
    .domain([0, d3.max(formattedAllData, (d) => d.ratio) as number])
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

  return (
    <svg width={width} height={height} className={styles.bg}>
      <g ref={gx} transform={`translate(0,${height - margin.bottom})`} />
      <g ref={gy} transform={`translate(${margin.left},0)`} />
      <PELine
        data={formattedGoogleData}
        color="red"
        label="Google"
        x={x}
        y={y}
      />
      <PELine
        data={formattedAppleData}
        color="steelblue"
        label="Apple"
        x={x}
        y={y}
      />
      <PELine
        data={formattedMicrosoftData}
        color="green"
        label="Microsoft"
        x={x}
        y={y}
        dy={10}
      />
    </svg>
  );
};

export default PEGraph;
