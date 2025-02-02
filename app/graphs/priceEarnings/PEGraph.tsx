"use client";
import React, { createContext, useEffect, useRef } from "react";
import * as d3 from "d3";
import { appleData, googleData, microsoftData, PEData } from "./data";
import styles from "./Graph.module.scss";
import PELine from "./PELine";
import { useWindowDimensions } from "@/app/_utils/reactHooks";

export interface Data {
  date: Date;
  ratio: number;
}

export type CompanyOptions = "Apple" | "Google" | "Microsoft" | "";

export type GraphContextType = {
  graphHeight: number;
  graphWidth: number;
  margins: { top: number; right: number; bottom: number; left: number };
  x: d3.ScaleTime<number, number, never>;
  y: d3.ScaleLinear<number, number, never>;
  hoveredCompany: CompanyOptions;
  handleCompanyHover: (company: CompanyOptions) => () => void;
};

export const GraphContext = createContext<GraphContextType | undefined>(
  undefined
);

const GRAPH_MAX_WIDTH = 800;
const MEDIUM_SCREEN_BREAKPOINT = 600;

const PEGraph = () => {
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const { width } = useWindowDimensions();
  const [hoveredCompany, setHoveredCompany] =
    React.useState<CompanyOptions>("");
  const isMediumScreen = width < MEDIUM_SCREEN_BREAKPOINT;

  const handleCompanyHover = (company: CompanyOptions) => () =>
    setHoveredCompany(company);

  const formatData = (data: PEData): Data[] => {
    return data.map((d): Data => {
      return {
        date: d3.timeParse("%Y-%m-%d")(d.date)!,
        ratio: +d.ratio,
      };
    });
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
      <g
        ref={xAxisRef}
        transform={`translate(0,${graphHeight - margins.bottom})`}
      />

      <g transform={`translate(0,${graphHeight - margins.bottom})`}>
        <text className={styles.label} x={graphWidth / 2} y={50}>
          Date
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
      <GraphContext.Provider
        value={{
          graphHeight,
          graphWidth,
          margins: margins,
          x,
          y,
          hoveredCompany,
          handleCompanyHover,
        }}
      >
        <PELine data={formattedGoogleData} color="red" label="Google" />
        <PELine data={formattedAppleData} color="steelblue" label="Apple" />
        <PELine
          data={formattedMicrosoftData}
          color="green"
          label="Microsoft"
          dy={10}
        />
      </GraphContext.Provider>
    </svg>
  );
};

export default PEGraph;
