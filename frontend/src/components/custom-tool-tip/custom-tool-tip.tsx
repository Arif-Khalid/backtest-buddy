import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { GraphDataPoint } from "../../models/graph";
import {
  Card,
  CardHeader,
  Stat,
  StatGroup,
  StatNumber,
  StatLabel,
  StatHelpText,
  StatArrow,
  CardBody,
  Text,
  Tag,
} from "@chakra-ui/react";
import { roundToDecimalPlaces } from "../../utils/common/helper";

export default function CustomToolTip({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) {
  if (!active || !payload || !payload.length) {
    return null;
  }
  const {
    timestamp,
    open,
    close,
    signal,
    gain,
    return_to_date,
    bot_action,
    symbol,
  } = payload[0].payload as GraphDataPoint;

  return (
    <Card>
      <CardHeader
        display={"flex"}
        columnGap={"1rem"}
        justifyContent={"space-between"}
      >
        <StatGroup>
          <Stat>
            <StatLabel>{symbol}</StatLabel>
            <StatNumber>{roundToDecimalPlaces(close, 2)} USD</StatNumber>
            <StatHelpText>
              <StatArrow type={close - open >= 0 ? "increase" : "decrease"} />
              {roundToDecimalPlaces((close - open) / open, 2)}%
            </StatHelpText>
          </Stat>
        </StatGroup>
        <StatGroup>
          <Stat>
            <StatLabel>{"Returns To Date"}</StatLabel>
            <StatNumber>{return_to_date} USD</StatNumber>
            <StatHelpText>
              <StatArrow type={gain >= 0 ? "increase" : "decrease"} />
              {gain} USD
            </StatHelpText>
          </Stat>
        </StatGroup>
      </CardHeader>
      <CardBody display="flex" flexDirection="column" rowGap={"0.5rem"}>
        <Text>
          Date: {timestamp.toLocaleDateString()}{" "}
          {timestamp.toLocaleTimeString()}
        </Text>
        <Tag size="md" variant={signal} width={"fit-content"}>
          Signal: {signal}
        </Tag>
        <Tag size="md" variant={bot_action} width={"fit-content"}>
          Bot Action: {bot_action}
        </Tag>
      </CardBody>
    </Card>
  );
}
