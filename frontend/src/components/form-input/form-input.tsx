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
import { useContext, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./form-input.less";
import { FaCalendar } from "react-icons/fa";
import { StrategyEnum, TimeFrameEnum } from "../../models/trading-models";
import { getGraphData } from "../../utils/common/graph-utils";
import { GraphContext } from "../../utils/context/graph-context";
import AdditionalInformation from "../additional-information/additional-information";

export default function FormInput() {
  const [strategy, setStrategy] = useState<string>(StrategyEnum.OBV);
  const [symbol, setSymbol] = useState<string>("AAPL");
  const [period, setPeriod] = useState<string>(TimeFrameEnum.DAY);
  const [amount, setAmount] = useState<number>(1000);
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2021-01-01")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2021-01-10"));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toggleColorMode } = useColorMode();
  const { setGraphData } = useContext(GraphContext);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const newGraphData = await getGraphData(
      symbol,
      strategy,
      period,
      amount,
      startDate!,
      endDate!
    );

    setGraphData(newGraphData);
    setIsLoading(false);
  }

  return (
    <form className="form-input" onSubmit={handleSubmit}>
      <Button onClick={() => toggleColorMode()}>Toggle Color Mode</Button>
      <div className="form-input-row">
        <FormControl>
          <FormLabel>
            Symbol
            <AdditionalInformation>Test</AdditionalInformation>
          </FormLabel>
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
          <FormLabel>
            Strategy
            <AdditionalInformation>Test</AdditionalInformation>
          </FormLabel>
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
          <FormLabel>
            Period
            <AdditionalInformation>Test</AdditionalInformation>
          </FormLabel>
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
          <FormLabel>
            Trade Amount in USD
            <AdditionalInformation>Test</AdditionalInformation>
          </FormLabel>
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
            <AdditionalInformation>Test</AdditionalInformation>
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
        isLoading={isLoading}
        loadingText="Submitting"
      >
        Submit
      </Button>
    </form>
  );
}
