import { Flex, Title } from "@mantine/core";

export default function SettingLayout({ title, children }) {
  return (
    <Flex direction="column" gap="md">
      {title ? <Title order={4}>{title}</Title> : null}
      <Flex direction="column" gap="sm">
        {children}
      </Flex>
    </Flex>
  );
}
