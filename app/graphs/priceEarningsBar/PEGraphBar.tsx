"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { appleData, googleData, microsoftData, PEData } from "./data";
import styles from "./Graph.module.scss";
import { useWindowDimensions } from "@/app/_utils/reactHooks";

export interface Data {
  date: Date;
  ratio: number;
}

export type CompanyOptions = "Apple" | "Google" | "Microsoft";

type GroupedData = {
  year: number;
  data: {
    Apple: Data;
    Google: Data;
    Microsoft: Data;
  };
  startPosition: number;
}[];

const GRAPH_MAX_WIDTH = 800;
const MEDIUM_SCREEN_BREAKPOINT = 600;

const PEGraphBar = () => {
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const { width } = useWindowDimensions();
  const isMediumScreen = width < MEDIUM_SCREEN_BREAKPOINT;

  const formatData = (data: PEData): Data[] => {
    return data
      .map((d): Data => {
        return {
          date: d3.timeParse("%Y-%m-%d")(d.date)!,
          ratio: +d.ratio,
        };
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  // set the dimensions and margins of the graph
  const margins = isMediumScreen
    ? { top: 10, right: 0, bottom: 60, left: 60 }
    : { top: 40, right: 60, bottom: 70, left: 60 };

  const graphWidth =
    Math.min(width, GRAPH_MAX_WIDTH) - margins.left - margins.right;
  const graphHeight = (graphWidth * 6) / 8 - margins.top - margins.bottom;

  const formattedAppleData = formatData(appleData);
  const formattedGoogleData = formatData(googleData);
  const formattedMicrosoftData = formatData(microsoftData);
  // Used to calculate domain ranges
  const allData = [
    ...formattedAppleData,
    ...formattedGoogleData,
    ...formattedMicrosoftData,
  ];

  const x = d3
    .scaleTime()
    .range([margins.left, graphWidth - margins.right])
    .domain(d3.extent(allData, (d) => new Date(d.date)) as [Date, Date])
    .nice();

  const y = d3
    .scaleLinear()
    .range([graphHeight - margins.bottom, margins.top])
    .domain([0, d3.max(allData, (d) => d.ratio) as number])
    .nice();

  const barWidth = isMediumScreen ? 4 : 7;
  // Group by year - assumes each companies data is in the same order
  const groupedData: GroupedData = formattedAppleData.map((apple, index) => {
    const startPosition = x(apple.date.setMonth(apple.date.getMonth() - 5)); // align centre of group to year

    return {
      year: apple.date.getFullYear(),
      data: {
        Apple: apple,
        Google: formattedGoogleData[index],
        Microsoft: formattedMicrosoftData[index],
      },
      startPosition,
    };
  });

  useEffect(() => {
    if (xAxisRef.current) {
      d3.select<SVGGElement, unknown>(xAxisRef.current).call(d3.axisBottom(x));
    }
  }, [xAxisRef, x]);

  useEffect(() => {
    if (yAxisRef.current) {
      d3.select<SVGGElement, unknown>(yAxisRef.current).call(d3.axisLeft(y));
    }
  }, [yAxisRef, y]);

  return (
    <svg width={graphWidth} height={graphHeight} className={styles.bg}>
      {groupedData.map((group, i) => (
        <g
          key={i}
          transform={`translate(${group.startPosition}, ${graphHeight})`}
        >
          {[
            ["Apple", "red"] as [CompanyOptions, string],
            ["Google", "steelblue"] as [CompanyOptions, string],
            ["Microsoft", "green"] as [CompanyOptions, string],
          ].map(([company, color], i) => (
            <rect
              key={i}
              x={barWidth * i}
              y={y(group.data[company].ratio) - graphHeight}
              width={barWidth}
              // y(ratio) gives distance from top of graph, so we needs to calculate the height of bar
              height={
                graphHeight - y(group.data[company].ratio) - margins.bottom
              }
              fill={color}
              stroke="black"
            />
          ))}
        </g>
      ))}
      <g
        ref={xAxisRef}
        transform={`translate(0,${graphHeight - margins.bottom})`}
      >
        <text className={styles.label} x={graphWidth / 2} y={50}>
          Year
        </text>
      </g>
      <g ref={yAxisRef} transform={`translate(${margins.left},0)`}>
        <text
          className={styles.label}
          x={-graphHeight / 2 + 50}
          y={-40}
          transform="rotate(-90)"
        >
          PE Ratio
        </text>
      </g>
    </svg>
  );
};

export default PEGraphBar;
