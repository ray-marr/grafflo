import * as React from "react";
import { Tooltip } from "@mui/material";
import styles from "./DataPoint.module.scss";

interface DataPointProps {
  x: number;
  y: number;
  date: Date;
  ratio: number;
  color: string;
}

const DataPoint: React.FC<DataPointProps> = ({ x, y, date, ratio, color }) => {
  return (
    <Tooltip
      title={
        <>
          Date: {date.toISOString().split("T")[0]}
          <br />
          Ratio: {ratio}
        </>
      }
    >
      <circle className={styles.dataPoint} cx={x} cy={y} stroke={color} />
    </Tooltip>
  );
};

export default DataPoint;
