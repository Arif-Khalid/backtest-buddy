import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Select,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./FormInput.less";
import { FaCalendar } from "react-icons/fa";
import { getStrategies } from "../../utils/api/strategies";
import { GraphDataPoint } from "../../models/graph";
import { StrategyEnum, TimeFrameEnum } from "../../models/trading-models";
import { roundToDecimalPlaces } from "../../utils/common/helper";

interface Props {
  setGraphData: (data: GraphDataPoint[]) => void;
}

export default function FormInput({ setGraphData }: Props) {
  const [strategy, setStrategy] = useState<string>(StrategyEnum.OBV);
  const [symbol, setSymbol] = useState<string>("AAPL");
  const [period, setPeriod] = useState<string>(TimeFrameEnum.DAY);
  const [amount, setAmount] = useState<number>(1000);
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2021-01-01")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2021-01-10"));
  const { toggleColorMode } = useColorMode();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = await getStrategies(
      symbol,
      strategy,
      period,
      amount,
      startDate!,
      endDate!
    );

    const newGraphData = [];
    let return_to_date = 0;
    for (let i = 0; i < data["gains"].length; i++) {
      return_to_date = roundToDecimalPlaces(
        return_to_date + data["gains"][i],
        2
      );

      // Can push symbol directly here even though setState might be called before query completes because react does not mutate state, meaning that the symbol will be the same as when the query was made and the new symbol object created by setState will not be used
      newGraphData.push({
        timestamp: new Date(data["timestamps"][i]),
        open: data["open"][i],
        close: data["close"][i],
        signal: data["directions"][i],
        gain: data["gains"][i],
        return_to_date,
        bot_action: data["bot_actions"][i],
        symbol,
      });
    }

    setGraphData(newGraphData);
  }
  return (
    <form className="form-input" onSubmit={handleSubmit}>
      <Button onClick={() => toggleColorMode()}>Toggle Color Mode</Button>
      <div className="form-input-row">
        <FormControl>
          <FormLabel>Symbol</FormLabel>
          <Select
            placeholder="Select symbol"
            value={symbol}
            onChange={(event) => {
              setSymbol(event.target.value);
            }}
          >
            <option value="AAPL">AAPL</option>
            <option value="TSLA">TSLA</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Strategy</FormLabel>
          <Select
            placeholder="Select strategy"
            value={strategy}
            onChange={(event) => {
              setStrategy(event.target.value);
            }}
          >
            {Object.values(StrategyEnum).map((strategy) => (
              <option key={strategy} value={strategy}>
                {strategy}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="form-input-row">
        <FormControl>
          <FormLabel>Period</FormLabel>
          <Select
            placeholder="Select period"
            value={period}
            onChange={(event) => {
              setPeriod(event.target.value);
            }}
          >
            {Object.values(TimeFrameEnum).map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Trade Amount in USD</FormLabel>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </FormControl>
      </div>
      <div className="form-input-row">
        <FormControl>
          <FormLabel
            htmlFor="form-input-date-picker"
            className="date-picker-label"
          >
            Date Range <Icon color="secondary" as={FaCalendar}></Icon>
          </FormLabel>
          <div className="date-picker-container">
            <DatePicker
              id="form-input-date-picker"
              className="date-picker"
              selected={startDate}
              startDate={startDate || undefined}
              endDate={endDate || undefined}
              onChange={(dates) => {
                const [start, end] = dates as (Date | null)[];
                setStartDate(start);
                setEndDate(end);
              }}
              selectsRange
              withPortal
            />
          </div>
          <Text
            color="default"
            style={{ pointerEvents: "none" }}
          >{`${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}`}</Text>
        </FormControl>
      </div>
      <Button
        type="submit"
        aria-label="submit"
        aria-describedby="submit the form"
        colorScheme="teal"
      >
        Submit
      </Button>
    </form>
  );
}
