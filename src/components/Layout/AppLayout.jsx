/* eslint-disable react/prop-types */
import {
  AppShell,
  Flex,
  Group,
  Container,
  Burger,
  Select,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Logo from "../Logo";
import Navbar from "../Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import appStrings from "../../utils/strings";
import useProjectsState from "../../context/project";


export default function AppLayout({
  children,
  navItems = [],
  navPreItems = [],
  navPostItems = [],
}) {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();
  const projects = useProjectsState((state) => state.projects);
  const projectId = location.pathname.split("/")[1];
  const isDashboard = location.pathname.includes("dashboard");
  const navigate = useNavigate();

  function handleNavigateToProject(value) {
    navigate(`/${value}`);
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Flex h="100%" align="center" justify="space-between" px="xl">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Logo size={35} />
            {!isDashboard ? (
              <Select
                w="13rem"
                allowDeselect={false}
                variant="light"
                value={projectId}
                data={[
                  {
                    group: appStrings.language.yourProject.title,
                    items: projects.map((item) => ({
                      value: item.id,
                      label: item.name,
                    })),
                  },
                ]}
                onChange={(value) => handleNavigateToProject(value)}
              />
            ) : null}
          </Group>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar
          preItems={navPreItems}
          items={navItems}
          postItems={navPostItems}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <Container
          style={{
            maxWidth: "1400px",
            width: "100%",
          }}
        >
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
