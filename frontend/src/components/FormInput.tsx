import { Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./FormInput.less";

export default function FormInput() {
  const [strategy, setStrategy] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2021-01-01")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2021-01-10"));
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="form-row">
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
      <div className="form-row">
        <FormControl>
          <FormLabel htmlFor="form-start-date">Start Date</FormLabel>
          <DatePicker
            id="form-start-date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="form-end-date">End Date</FormLabel>
          <DatePicker
            id="form-end-date"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </FormControl>
        <Button
          type="submit"
          aria-label="submit"
          aria-describedby="submit the form"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
