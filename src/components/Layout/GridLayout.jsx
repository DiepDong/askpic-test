import { Flex, SimpleGrid, Title } from "@mantine/core";

export default function GridLayout({ title, children }) {
  return (
    <Flex direction="column" gap="md">
      {title ? <Title order={4}>{title}</Title> : null}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
        {children}
      </SimpleGrid>
    </Flex>
  );
}
