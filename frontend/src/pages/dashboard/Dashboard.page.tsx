import { useDashboardPage } from "@/components/providers/DashboardProvider";
import { Suspense, lazy } from "react";

const pageComponents = {
	panel: lazy(() => import("@/pages/dashboard/sub-pages/Panel.page")),
	users: lazy(() => import("@/pages/dashboard/sub-pages/Users.page")),
	properties: lazy(() => import("./sub-pages/Properties.page")),
	services: lazy(() => import("./sub-pages/Services.page")),
	tools: lazy(() => import("./sub-pages/Tools.page")),
};

export default function DashboardPage() {
	const { dashboardPage } = useDashboardPage();
	const PageComponent = pageComponents[dashboardPage];
	return (
		<Suspense fallback={null}>{PageComponent && <PageComponent />}</Suspense>
	);
}
