import logo from "../../assets/logo513.png";
import logow from "../../assets/logow512.png";
import { Flex, Title } from "@mantine/core";
import useGlobalState from "../../context/global";

export default function Logo({ size = 40, onTap }) {
  const theme = useGlobalState((state) => state.theme);

  return (
    <Flex
      align="center"
      gap={10}
      onClick={onTap}
      style={{
        cursor: "pointer",
      }}
    >
      <img
        src={theme === "dark" ? logow : logo}
        alt="logo"
        style={{ width: size, height: size }}
      />
      <Title ff="Oswald, sans serif" order={3}>
        Askpic
      </Title>
    </Flex>
  );
}
