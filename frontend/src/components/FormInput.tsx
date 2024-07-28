import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Select,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./FormInput.less";
import { FaCalendar } from "react-icons/fa";

export default function FormInput() {
  const [strategy, setStrategy] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2021-01-01")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2021-01-10"));
  const { colorMode, toggleColorMode } = useColorMode();
  console.log(colorMode);
  return (
    <form
      className="form-input"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
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
            <option value="MACD">MACD</option>
          </Select>
        </FormControl>
      </div>
      <div className="form-input-row">
        <FormControl>
          <FormLabel
            htmlFor="form-input-date-picker"
            className="date-picker-label"
          >
            Date Range <Icon as={FaCalendar}></Icon>
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
          <Text color="default">{`${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}`}</Text>
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
