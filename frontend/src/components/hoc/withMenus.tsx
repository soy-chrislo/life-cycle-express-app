import { type ComponentType, createElement } from "react";
import LateralMenu from "../LateralMenu";
import NavigationBar from "../NavigationBar";
import { DashboardProvider } from "../providers/DashboardProvider";

function withMenus(Component: ComponentType) {
	function WrappedComponent() {
		return (
			<div>
				<NavigationBar />
				<DashboardProvider>
					<div className="flex h-[calc(100vh-3.54rem)]">
						<LateralMenu />
						<Component />
					</div>
				</DashboardProvider>
			</div>
		);
	}
	return createElement(WrappedComponent);
}

export default withMenus;
