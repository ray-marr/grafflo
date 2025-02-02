import * as d3 from "d3";
import { Data, GraphContext, CompanyOptions } from "./PEGraph";
import DataPoint from "./DataPoint/DataPoint";
import { useContext } from "react";

interface PELineProps {
  data: Data[];
  color: string;
  label: CompanyOptions;
  dy?: number; //shift company label
}

const PELine: React.FC<PELineProps> = ({ data, color, label, dy = 0 }) => {
  const context = useContext(GraphContext);

  const { x, y, graphWidth, hoveredCompany, handleCompanyHover } = context!;
  const line = d3
    .line<Data>()
    .x((d) => x(d.date))
    .y((d) => y(d.ratio))
    .curve(d3.curveCatmullRom);

  return (
    <g
      onMouseEnter={handleCompanyHover(label)}
      onMouseLeave={handleCompanyHover("")}
      opacity={["", label].includes(hoveredCompany) ? 1 : 0.3}
    >
      <path
        d={line(data) || undefined}
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
      <text
        x={graphWidth}
        y={y(data[0].ratio)}
        dy={dy}
        textAnchor="end"
        fill={color}
        cursor="pointer"
      >
        {label}
      </text>
      {data.map((d, i) => (
        <DataPoint
          key={i}
          x={x(d.date)}
          y={y(d.ratio)}
          date={d.date}
          ratio={d.ratio}
          color={color}
        />
      ))}
    </g>
  );
};

export default PELine;
