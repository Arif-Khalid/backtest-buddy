import { Container, Text } from "@chakra-ui/react";

interface Props {
  contents: {
    title?: string;
    explanation: string;
  }[];
}
export default function FormattedToolTip({ contents }: Props) {
  return (
    <Container fontSize={"0.7rem"}>
      {contents.map(
        (content) =>
          content.explanation && (
            <Text key={content.explanation} color={"inherit"} margin={1}>
              {content.title && content.title + ": "}
              {content.explanation}
            </Text>
          )
      )}
    </Container>
  );
}
