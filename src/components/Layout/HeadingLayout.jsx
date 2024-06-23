import { Flex } from "@mantine/core";

export default function HeadingLayout({ children }) {
  return (
    <Flex
      align="flex-start"
      justify="space-between"
      style={{
        padding: "2rem 0 0 0",
      }}
    >
      {children}
    </Flex>
  );
}
