import { Outlet, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/AppLayout";
import {
  IconHome,
  IconHomeFilled,
  IconSettings,
  IconSettingsFilled,
} from "@tabler/icons-react";

export default function DashboardPageLayout() {
  const navigate = useNavigate();
  const navbarItems = [
    {
      label: "Home",
      icon: <IconHome size="1rem" />,
      activeIcon: <IconHomeFilled size="1rem" />,
      action: () => navigate("/dashboard"),
    },
  ];

  const navbarSettings = [
    {
      label: "Settings",
      icon: <IconSettings size="1rem" />,
      activeIcon: <IconSettingsFilled size="1rem" />,
      action: () => navigate("/dashboard/setting"),
    },
  ];

  return (
    <Layout navItems={navbarItems} navPostItems={navbarSettings}>
      <Outlet />
    </Layout>
  );
}
