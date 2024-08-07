import * as XLSX from "xlsx-js-style";
import { GraphData } from "../../models/graph";
export function exportGraphDataToExcel(graphData: GraphData) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(graphData.dataPoints);
  XLSX.utils.book_append_sheet(
    wb,
    ws,
    `${graphData.symbol}_${graphData.strategy}`
  );
  XLSX.writeFile(wb, "backtest-buddy.xlsx");
}
