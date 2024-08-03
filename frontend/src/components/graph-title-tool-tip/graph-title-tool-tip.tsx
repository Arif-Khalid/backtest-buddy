import { Container, Text } from "@chakra-ui/react";
import { StrategyEnum } from "../../models/trading-models";
import { getEnumExplanation } from "../../utils/common/graph-utils";

interface Props {
  strategy: StrategyEnum;
  symbol: string;
}
export default function GraphTitleToolTip({ strategy, symbol }: Props) {
  return (
    <Container fontSize={"0.7rem"}>
      <Text color={"tertiary"} margin={1}>
        {strategy}: {getEnumExplanation(strategy)}
      </Text>
      <Text color={"tertiary"} margin={1}>
        {symbol}: {getEnumExplanation(symbol)}
      </Text>
      <Text color={"tertiary"} margin={1}>
        Days and times where NYSE were closed are omitted
      </Text>
    </Container>
  );
}
