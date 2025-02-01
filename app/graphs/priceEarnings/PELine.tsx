import * as d3 from "d3";
import { Data } from "./PEGraph";
import DataPoint from "./DataPoint/DataPoint";

interface PELineProps {
  data: Data[];
  color: string;
  label: string;
  x: d3.ScaleTime<number, number, never>;
  y: d3.ScaleLinear<number, number, never>;
  dy?: number; //shift text
}

const PELine: React.FC<PELineProps> = ({
  data,
  color,
  label,
  x,
  y,
  dy = 0,
}) => {
  const line = d3
    .line<Data>()
    .x((d) => x(d.date))
    .y((d) => y(d.ratio))
    .curve(d3.curveCatmullRom);

  return (
    <g>
      <path
        d={line(data) || undefined}
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
      <text x={710} y={y(data[0].ratio)} dy={dy} textAnchor="end" fill={color}>
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
