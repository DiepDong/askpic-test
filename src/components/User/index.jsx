import { Avatar, Menu, Text, Title } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import useGlobalState from "../../context/global";
import appStrings from "../../utils/strings";

export default function User({ onUserTap, onLogoutTap }) {
  const user = useGlobalState((state) => state.user);

  return (
    <Menu shadow="md" width={250}>
      <Menu.Target>
        <Avatar src={user?.avatar} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={onUserTap}>
          <Title size="sm">{user?.name}</Title>
          <Text size="xs">{user?.email}</Text>
        </Menu.Item>
        <Menu.Item
          leftSection={<IconLogout size="1rem" />}
          color="red"
          onClick={onLogoutTap}
        >
          {appStrings.language.auth.logout}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
