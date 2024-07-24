import { Container, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Container textAlign="center" padding={4}>
      <Text fontSize="4xl" fontWeight="bold">
        BacktestBuddy
      </Text>
      <Text fontSize="larger">
        The one stop solution for all your backtesting needs!
      </Text>
    </Container>
  );
}
