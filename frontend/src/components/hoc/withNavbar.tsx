import type { ComponentType } from "react";
import NavigationBar from "../NavigationBar";

const withNavigationBar = (Component: ComponentType) => {
	return () => {
		return (
			<div className="relative">
				<NavigationBar />
				<Component />
			</div>
		);
	};
};

export default withNavigationBar;
