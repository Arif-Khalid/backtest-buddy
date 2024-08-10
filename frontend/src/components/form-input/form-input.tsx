import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Select,
  Text,
  useColorMode,
  useToast,
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
import FormattedToolTip from "../formatted-tool-tip/formatted-tool-tip";
import { TERM_EXPLANATIONS } from "../../constants/explanations";
import { FEEDBACK_MESSAGES } from "../../constants/feedback-messages";

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
  const toast = useToast();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newGraphData = await getGraphData(
        symbol,
        strategy,
        period,
        amount,
        startDate!,
        endDate!
      );
      setGraphData(newGraphData);
      toast({
        title: FEEDBACK_MESSAGES.GRAPH_DATA_LOADING_SUCCESS_TITLE,
        description: FEEDBACK_MESSAGES.GRAPH_DATA_LOADING_SUCCESS_DESC,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: FEEDBACK_MESSAGES.GRAPH_DATA_LOADING_ERROR_TITLE,
        description: FEEDBACK_MESSAGES.GRAPH_DATA_LOADING_ERROR_DESC,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="form-input" onSubmit={handleSubmit}>
      <Button onClick={() => toggleColorMode()}>Toggle Color Mode</Button>
      <div className="form-input-row">
        <FormControl>
          <FormLabel>
            Symbol
            <AdditionalInformation>
              <FormattedToolTip
                contents={[
                  { explanation: TERM_EXPLANATIONS.SYMBOL },
                  { title: symbol, explanation: TERM_EXPLANATIONS[symbol] },
                ]}
              />
            </AdditionalInformation>
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
            <AdditionalInformation>
              <FormattedToolTip
                contents={[
                  { explanation: TERM_EXPLANATIONS.STRATEGY },
                  { title: strategy, explanation: TERM_EXPLANATIONS[strategy] },
                ]}
              />
            </AdditionalInformation>
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
            <AdditionalInformation>
              <FormattedToolTip
                contents={[{ explanation: TERM_EXPLANATIONS.PERIOD }]}
              />
            </AdditionalInformation>
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
            <AdditionalInformation>
              <FormattedToolTip
                contents={[{ explanation: TERM_EXPLANATIONS.TRADE_AMOUNT }]}
              />
            </AdditionalInformation>
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
            <AdditionalInformation>
              {" "}
              <FormattedToolTip
                contents={[{ explanation: TERM_EXPLANATIONS.DATE_RANGE }]}
              />
            </AdditionalInformation>
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
