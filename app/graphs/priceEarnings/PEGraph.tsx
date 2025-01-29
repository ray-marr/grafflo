"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { DSVRowString } from "d3";

interface Data {
  Date: Date;
  Ratio: number;
}

// TODO:
// - add labels
// - improve styling (curved transition + colours)
// - caption + heading
// - function for adding data
// - add more companies

const PEGraph = () => {
  const graphRef = useRef(null);

  useEffect(() => {
    const parseTime = d3.timeParse("%Y-%m-%d");

    // clear previous render
    d3.select(graphRef.current).select("svg").remove();

    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to ref element
    const svg = d3
      .select(graphRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv<Data>(
      "/data/apple.csv",
      function (data: DSVRowString<string>): Data | null {
        console.log("did we parse? ", !!data);
        if (!data) return null;

        return {
          Date: parseTime(data.date)!,
          Ratio: +data.ratio,
        };
      }
    ).then((data: Data[]) => {
      // Set the ranges
      const x = d3.scaleTime().range([0, width]);
      const y = d3.scaleLinear().range([height, 0]);

      // Define the line
      const valueline = d3
        .line<Data>()
        .x((d) => x(d.Date))
        .y((d) => y(d.Ratio));

      // Scale the range of the data
      x.domain(d3.extent(data, (d) => d.Date) as [Date, Date]);
      y.domain([0, d3.max(data, (d) => d.Ratio) as number]);

      // Add the valueline path
      svg
        .append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

      // Add the X Axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Add the Y Axis
      svg.append("g").call(d3.axisLeft(y));
    });
  }, [graphRef]);

  return <div ref={graphRef}></div>;
};

export default PEGraph;
