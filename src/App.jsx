import { MantineProvider } from "@mantine/core";
import { useRoutes } from "react-router-dom";
import appRoutes from "./routes/routes";
import useGlobalState from "./context/global";
import { Notifications } from "@mantine/notifications";

export default function App() {
  const theme = useGlobalState((state) => state.theme);

  return (
    <MantineProvider defaultColorScheme={theme}>
      {useRoutes(appRoutes)}
      <Notifications />

    </MantineProvider>
  );
}
