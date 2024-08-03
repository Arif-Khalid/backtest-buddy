import { Container, Heading } from "@chakra-ui/react";

export default function Header() {
  return (
    <Container textAlign="center" padding={4}>
      <Heading fontSize="4xl" fontWeight="bold">
        BacktestBuddy
      </Heading>
      <Heading fontSize="larger">
        The one stop solution for all your backtesting needs!
      </Heading>
    </Container>
  );
}
