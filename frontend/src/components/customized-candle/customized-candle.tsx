import { Rectangle } from "recharts";
import { RechartsCustomizedProps } from "../../models/graph";

// Necessary to receive unknown type props since type handling for custom components in Recharts is not well documented.
export default function CustomizedCandle(props: unknown) {
  const [openSeries, closedSeries] = (props as RechartsCustomizedProps)
    .formattedGraphicalItems!;
  return openSeries.props.points.map((openSeriesPoint, index) => {
    const closedSeriesPoint = closedSeries.props.points[index];
    const yDifference = openSeriesPoint.y - closedSeriesPoint.y;

    return (
      <Rectangle
        key={openSeriesPoint.payload.timestamp.toLocaleString()}
        width={5}
        height={yDifference}
        x={openSeriesPoint.x - 2.5}
        y={closedSeriesPoint.y}
        fill={yDifference > 0 ? "green" : "red"}
      />
    );
  });
}
