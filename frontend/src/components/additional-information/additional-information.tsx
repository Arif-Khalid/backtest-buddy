import { Icon, Box, Tooltip } from "@chakra-ui/react";
import { FaQuestionCircle } from "react-icons/fa";

type Props = {
  children: React.ReactNode;
};
export default function AdditionalInformation({ children }: Props) {
  return (
    <Tooltip label={children} color="tertiary">
      <Box display="inline-block" transform="translateY(-0.5rem)" padding={1}>
        <Icon as={FaQuestionCircle} boxSize={3} color="secondary"></Icon>
      </Box>
    </Tooltip>
  );
}
